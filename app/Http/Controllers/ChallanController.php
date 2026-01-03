<?php

namespace App\Http\Controllers;

use App\Models\Challan;
use App\Models\ChallanItem;
use App\Models\Party;
use App\Models\Quality;
use App\Models\Setting;
use App\Services\StockService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChallanController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermission('manage challan')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = Challan::with(['party', 'invoice'])
            ->where('created_by', createdBy());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('party', function ($partyQuery) use ($search) {
                    $partyQuery->where('party_name', 'like', "%{$search}%");
                });
            });
        }

        $sortField = $request->get('sort', 'created_at');
        $sortDirection = $request->get('direction', 'desc');

        $allowedSorts = ['challan_number', 'total_meter', 'total_lots', 'date', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $challans = $query->paginate($perPage)->withQueryString();

        // Add formatted challan number to each challan
        $challans->getCollection()->transform(function ($challan) {
            $challan->formatted_challan_number = $challan->formatted_challan_number;
            $challan->encrypted_id = $challan->encrypted_id;
            return $challan;
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

        return Inertia::render('Challan/Index', [
            'challans' => $challans,
            'filters' => $filters
        ]);
    }

    public function create()
    {
        if (!auth()->user()->hasPermission('create challan')) {
            return redirect()->route('challans.index')->with('error', 'Permission denied!');
        }

        $parties = Party::where('created_by', createdBy())
            ->orderBy('party_name')
            ->get(['id', 'party_name', 'gst_number', 'address', 'business_name', 'business_location']);

        $qualities = Quality::where('user_id', createdBy())
            ->where('status', true)
            ->orderBy('quality_name')
            ->get(['id', 'quality_name']);

        $availableStock = StockService::getTotalAvailableStock();

        return Inertia::render('Challan/Create', [
            'parties' => $parties,
            'qualities' => $qualities,
            'availableStock' => $availableStock
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermission('create challan')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'party_id' => 'required|exists:parties,id',
            'quality_id' => 'required|exists:qualities,id',
            'date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.sr_number' => 'required|integer|min:1',
            'items.*.meter' => 'required|numeric|min:0',
            'items.*.group_number' => 'required|integer|min:1',
            'total_meter' => 'required|numeric|min:0',
            'total_lots' => 'required|integer|min:1',
        ]);

        // Validate stock availability
        try {
            StockService::validateStockForChallan($request->total_meter);
        } catch (\Exception $e) {
            return back()->withErrors(['stock' => $e->getMessage()]);
        }

        DB::beginTransaction();
        try {
            $challan = Challan::create([
                'challan_number' => Challan::generateChallanNumber(),
                'party_id' => $request->party_id,
                'quality_id' => $request->quality_id,
                'total_meter' => $request->total_meter,
                'total_lots' => $request->total_lots,
                'date' => $request->date,
                'created_by' => createdBy(),
            ]);

            foreach ($request->items as $item) {
                ChallanItem::create([
                    'challan_id' => $challan->id,
                    'sr_number' => $item['sr_number'],
                    'meter' => $item['meter'],
                    'group_number' => $item['group_number'],
                ]);
            }

            DB::commit();
            return redirect()->route('challans.index')->with('success', 'Challan created successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Failed to create challan: ' . $e->getMessage()]);
        }
    }

    public function show(Challan $challan)
    {
        if ($challan->created_by != createdBy()) {
            abort(403);
        }

        $challan->load(['party', 'quality', 'items', 'invoice']);
        $challan->formatted_challan_number = $challan->formatted_challan_number;

        return Inertia::render('Challan/Show', [
            'challan' => $challan
        ]);
    }

    public function edit(Challan $challan)
    {
        if ($challan->created_by != createdBy()) {
            abort(403);
        }

        if (!auth()->user()->hasPermission('edit challan')) {
            return redirect()->route('challans.index')->with('error', 'Permission denied!');
        }

        $parties = Party::where('created_by', createdBy())
            ->orderBy('party_name')
            ->get(['id', 'party_name', 'gst_number', 'address', 'business_name', 'business_location']);

        $qualities = Quality::where('user_id', createdBy())
            ->where('status', true)
            ->orderBy('quality_name')
            ->get(['id', 'quality_name']);

        $challan->load('items');
        $availableStock = StockService::getTotalAvailableStock();

        return Inertia::render('Challan/Edit', [
            'challan' => $challan,
            'parties' => $parties,
            'qualities' => $qualities,
            'availableStock' => $availableStock
        ]);
    }

    public function update(Request $request, Challan $challan)
    {
        if ($challan->created_by != createdBy()) {
            abort(403);
        }

        if (!auth()->user()->hasPermission('edit challan')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'party_id' => 'required|exists:parties,id',
            'quality_id' => 'required|exists:qualities,id',
            'date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.sr_number' => 'required|integer|min:1',
            'items.*.meter' => 'required|numeric|min:0',
            'items.*.group_number' => 'required|integer|min:1',
            'total_meter' => 'required|numeric|min:0',
            'total_lots' => 'required|integer|min:1',
        ]);

        // Validate stock availability (excluding current challan)
        try {
            StockService::validateStockForChallan($request->total_meter, null, $challan->id);
        } catch (\Exception $e) {
            return back()->withErrors(['stock' => $e->getMessage()]);
        }

        DB::beginTransaction();
        try {
            $challan->update([
                'party_id' => $request->party_id,
                'quality_id' => $request->quality_id,
                'total_meter' => $request->total_meter,
                'total_lots' => $request->total_lots,
                'date' => $request->date,
            ]);

            // Delete existing items and create new ones
            $challan->items()->delete();

            foreach ($request->items as $item) {
                ChallanItem::create([
                    'challan_id' => $challan->id,
                    'sr_number' => $item['sr_number'],
                    'meter' => $item['meter'],
                    'group_number' => $item['group_number'],
                ]);
            }

            DB::commit();
            return redirect()->route('challans.index')->with('success', 'Challan updated successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Failed to update challan: ' . $e->getMessage()]);
        }
    }

    public function destroy(Challan $challan)
    {
        if ($challan->created_by !== createdBy()) {
            abort(403);
        }

        if (!auth()->user()->hasPermission('delete challan')) {
            return back()->with('error', 'Permission denied!');
        }

        $challan->delete();
        return back()->with('success', 'Challan deleted successfully.');
    }

    public function publicView($encryptedId)
    {
        try {
            $challanId = \Illuminate\Support\Facades\Crypt::decryptString($encryptedId);
            $challan = Challan::with(['party', 'quality', 'items', 'creator'])->findOrFail($challanId);
            $challan->formatted_challan_number = $challan->formatted_challan_number;

            // Get business details from settings
            $businessDetails = [
                'name' => Setting::getValue('business_name', $challan->created_by),
                'address' => Setting::getValue('business_address', $challan->created_by),
                'phone' => Setting::getValue('business_phone', $challan->created_by),
                'gst' => Setting::getValue('business_gst', $challan->created_by),
                'link' => Config('app.url',"https://www.textile.texportapp.in/"),
            ];

            return Inertia::render('Challan/PublicView', [
                'challan' => $challan,
                'businessDetails' => $businessDetails
            ]);
        } catch (\Exception $e) {
            abort(404, 'Challan not found');
        }
    }

    public function checkStock(Request $request)
    {
        $requestedMeters = $request->get('meters', 0);
        $excludeChallanId = $request->get('exclude_challan_id');

        $availableStock = StockService::getTotalAvailableStock();
        $isAvailable = StockService::isStockAvailable($requestedMeters, null, $excludeChallanId);

        return response()->json([
            'available_stock' => $availableStock,
            'is_available' => $isAvailable,
            'requested_meters' => $requestedMeters
        ]);
    }
}
