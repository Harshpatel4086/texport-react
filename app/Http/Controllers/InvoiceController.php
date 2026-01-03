<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Challan;
use App\Models\Party;
use App\Models\Quality;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermission('manage invoice')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = Invoice::with(['challan', 'party', 'quality'])
            ->where('created_by', createdBy());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('party', function ($partyQuery) use ($search) {
                    $partyQuery->where('party_name', 'like', "%{$search}%");
                })->orWhere('invoice_number', 'like', "%{$search}%");
            });
        }

        $sortField = $request->get('sort', 'created_at');
        $sortDirection = $request->get('direction', 'desc');

        $allowedSorts = ['invoice_number', 'total_meter', 'final_amount', 'date', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $invoices = $query->paginate($perPage)->withQueryString();

        $invoices->getCollection()->transform(function ($invoice) {
            $invoice->formatted_invoice_number = $invoice->formatted_invoice_number;
            $invoice->encrypted_id = $invoice->encrypted_id;
            return $invoice;
        });

        $filters = $request->only(['search', 'sort', 'direction', 'per_page']);
        if (empty($filters)) {
            $filters = [
                'per_page' => 10,
                'page' => 1,
                'direction' => 'desc',
                'sort' => 'created_at',
                'search' => ''
            ];
        } else {
            $filters = array_merge([
                'per_page' => 10,
                'page' => 1,
                'direction' => 'desc',
                'sort' => 'created_at',
                'search' => ''
            ], array_filter($filters));
        }

        return Inertia::render('Invoice/Index', [
            'invoices' => $invoices,
            'filters' => $filters
        ]);
    }

    public function create(Request $request)
    {
        if (!auth()->user()->hasPermission('create invoice')) {
            return redirect()->route('invoices.index')->with('error', 'Permission denied!');
        }

        $challanId = $request->get('challan_id');
        if (!$challanId) {
            return redirect()->route('challans.index')->with('error', 'Please select a challan to create invoice.');
        }

        $challan = Challan::with(['party', 'quality', 'invoice'])
            ->where('id', $challanId)
            ->where('created_by', createdBy())
            ->firstOrFail();

        if ($challan->invoice) {
            return redirect()->route('invoices.show', $challan->invoice->id)
                ->with('error', 'Invoice already exists for this challan.');
        }

        // Add formatted challan number
        $challan->formatted_challan_number = $challan->formatted_challan_number;

        return Inertia::render('Invoice/Create', [
            'challan' => $challan
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermission('create invoice')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'challan_id' => 'required|exists:challans,id',
            'price' => 'required|numeric|min:0',
            'date' => 'required|date',
        ]);

        $challan = Challan::with(['party', 'quality'])
            ->where('id', $request->challan_id)
            ->where('created_by', createdBy())
            ->firstOrFail();

        // Check if invoice already exists
        if (Invoice::where('challan_id', $challan->id)->exists()) {
            return back()->withErrors(['challan_id' => 'Invoice already exists for this challan.']);
        }

        DB::beginTransaction();
        try {
            $baseAmount = $challan->total_meter * $request->price;
            
            $taxes = Invoice::calculateTaxes(
                $baseAmount,
                $challan->quality->cgst_percentage ?? 0,
                $challan->quality->sgst_percentage ?? 0,
                $challan->quality->igst_percentage ?? 0
            );

            $invoice = Invoice::create([
                'invoice_number' => $challan->challan_number, // Same as challan number
                'challan_id' => $challan->id,
                'party_id' => $challan->party_id,
                'quality_id' => $challan->quality_id,
                'total_meter' => $challan->total_meter,
                'price' => $request->price,
                'base_amount' => $baseAmount,
                'cgst_percentage' => $challan->quality->cgst_percentage,
                'sgst_percentage' => $challan->quality->sgst_percentage,
                'igst_percentage' => $challan->quality->igst_percentage,
                'cgst_amount' => $taxes['cgst_amount'],
                'sgst_amount' => $taxes['sgst_amount'],
                'igst_amount' => $taxes['igst_amount'],
                'total_tax' => $taxes['total_tax'],
                'subtotal' => $taxes['subtotal'],
                'round_off' => $taxes['round_off'],
                'final_amount' => $taxes['final_amount'],
                'date' => $request->date,
                'created_by' => createdBy(),
            ]);

            DB::commit();
            return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Failed to create invoice: ' . $e->getMessage()]);
        }
    }

    public function show(Invoice $invoice)
    {
        if ($invoice->created_by != createdBy()) {
            abort(403);
        }

        $invoice->load(['challan', 'party', 'quality']);
        $invoice->formatted_invoice_number = $invoice->formatted_invoice_number;
        
        if ($invoice->challan) {
            $invoice->challan->formatted_challan_number = $invoice->challan->formatted_challan_number;
        }

        // Get business details
        $businessDetails = [
            'name' => Setting::getValue('business_name', $invoice->created_by),
            'address' => Setting::getValue('business_address', $invoice->created_by),
            'phone' => Setting::getValue('business_phone', $invoice->created_by),
            'gst' => Setting::getValue('business_gst', $invoice->created_by),
        ];

        return Inertia::render('Invoice/Show', [
            'invoice' => $invoice,
            'businessDetails' => $businessDetails
        ]);
    }

    public function destroy(Invoice $invoice)
    {
        if ($invoice->created_by !== createdBy()) {
            abort(403);
        }

        if (!auth()->user()->hasPermission('delete invoice')) {
            return back()->with('error', 'Permission denied!');
        }

        DB::beginTransaction();
        try {
            // Get challan ID before deleting invoice
            $challanId = $invoice->challan_id;

            // Delete invoice first
            $invoice->delete();

            // Delete associated challan if it exists
            if ($challanId) {
                $challan = Challan::find($challanId);
                if ($challan) {
                    $challan->delete();
                }
            }

            DB::commit();
            return back()->with('success', 'Invoice and associated Challan deleted successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Failed to delete: ' . $e->getMessage());
        }
    }

    public function publicView($encryptedId)
    {
        try {
            $invoiceId = \Illuminate\Support\Facades\Crypt::decryptString($encryptedId);
            $invoice = Invoice::with(['challan', 'party', 'quality', 'creator'])->findOrFail($invoiceId);
            $invoice->formatted_invoice_number = $invoice->formatted_invoice_number;

            // Get business details
            $businessDetails = [
                'name' => Setting::getValue('business_name', $invoice->created_by),
                'address' => Setting::getValue('business_address', $invoice->created_by),
                'phone' => Setting::getValue('business_phone', $invoice->created_by),
                'gst' => Setting::getValue('business_gst', $invoice->created_by),
                'link' => config('app.url', "https://www.textile.texportapp.in/"),
            ];

            return Inertia::render('Invoice/PublicView', [
                'invoice' => $invoice,
                'businessDetails' => $businessDetails
            ]);
        } catch (\Exception $e) {
            abort(404, 'Invoice not found');
        }
    }
}