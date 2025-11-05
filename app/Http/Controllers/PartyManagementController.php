<?php

namespace App\Http\Controllers;

use App\Models\Party;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartyManagementController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermission('manage party')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = Party::where('created_by', createdBy());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('party_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('gst_number', 'like', "%{$search}%")
                  ->orWhere('business_name', 'like', "%{$search}%");
            });
        }

        $sortField = $request->get('sort', 'party_name');
        $sortDirection = $request->get('direction', 'asc');

        $allowedSorts = ['party_name', 'email', 'business_name', 'created_at', 'party_number'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $parties = $query->paginate($perPage)->withQueryString();

        // Add formatted party number to each party
        $parties->getCollection()->transform(function ($party) {
            $party->formatted_party_number = $party->formatted_party_number;
            return $party ?? '--';
        });

        $filters = $request->only(['search', 'sort', 'direction', 'per_page']);
        if (empty($filters)) {
            $filters = [
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'party_name',
                'search' => ''
            ];
        } else {
            $filters = array_merge([
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'party_name',
                'search' => ''
            ], array_filter($filters));
        }

        return Inertia::render('Party/Index', [
            'parties' => $parties,
            'filters' => $filters
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermission('create party')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'party_name' => 'required|string|max:255',
            'gst_number' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'business_name' => 'required|string|max:255',
            'business_location' => 'required|string|max:255',
        ]);

        Party::create([
            'party_number' => Party::generatePartyNumber(),
            'party_name' => $request->party_name,
            'gst_number' => $request->gst_number,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'address' => $request->address,
            'business_name' => $request->business_name,
            'business_location' => $request->business_location,
            'created_by' => createdBy(),
        ]);

        return back()->with('success', 'Party created successfully.');
    }

    public function update(Request $request, Party $party)
    {
        if ($party->created_by != createdBy()) {
            abort(403);
        }

        if (!auth()->user()->hasPermission('edit party')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'party_name' => 'required|string|max:255',
            'gst_number' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'business_name' => 'required|string|max:255',
            'business_location' => 'required|string|max:255',
        ]);

        $party->update([
            'party_name' => $request->party_name,
            'gst_number' => $request->gst_number,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'address' => $request->address,
            'business_name' => $request->business_name,
            'business_location' => $request->business_location,
        ]);

        return back()->with('success', 'Party updated successfully.');
    }

    public function destroy(Party $party)
    {
        if ($party->created_by !== createdBy()) {
            abort(403);
        }

        if (!auth()->user()->hasPermission('delete party')) {
            return back()->with('error', 'Permission denied!');
        }

        $party->delete();
        return back()->with('success', 'Party deleted successfully.');
    }
}
