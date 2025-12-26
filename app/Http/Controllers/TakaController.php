<?php

namespace App\Http\Controllers;

use App\Models\Taka;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TakaController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermission('manage taka')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = Taka::where('user_id', createdBy());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('taka_number', 'like', "%{$search}%")
                  ->orWhere('meter', 'like', "%{$search}%");
            });
        }

        $sortField = $request->get('sort', 'taka_number');
        $sortDirection = $request->get('direction', 'asc');

        $allowedSorts = ['taka_number', 'meter', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $takas = $query->paginate($perPage)->withQueryString();

        $filters = $request->only(['search', 'sort', 'direction', 'per_page']);
        if (empty($filters)) {
            $filters = [
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'taka_number',
                'search' => ''
            ];
        } else {
            $filters = array_merge([
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'taka_number',
                'search' => ''
            ], array_filter($filters));
        }

        return Inertia::render('Taka/Index', [
            'takas' => $takas,
            'filters' => $filters
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermission('create taka')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'taka_number' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    $exists = Taka::where('user_id', createdBy())
                        ->where('taka_number', $value)
                        ->exists();
                    if ($exists) {
                        $fail('The taka number has already been taken.');
                    }
                }
            ],
            'meter' => 'required|numeric|min:0',
        ]);

        Taka::create([
            'user_id' => createdBy(),
            'taka_number' => $request->taka_number,
            'meter' => $request->meter,
        ]);

        return back()->with('success', 'Taka created successfully.');
    }

    public function update(Request $request, Taka $taka)
    {
        if (!auth()->user()->hasPermission('edit taka')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'taka_number' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) use ($taka) {
                    $exists = Taka::where('user_id', createdBy())
                        ->where('taka_number', $value)
                        ->where('id', '!=', $taka->id)
                        ->exists();
                    if ($exists) {
                        $fail('The taka number has already been taken.');
                    }
                }
            ],
            'meter' => 'required|numeric|min:0',
        ]);

        $taka->update([
            'taka_number' => $request->taka_number,
            'meter' => $request->meter,
        ]);

        return back()->with('success', 'Taka updated successfully.');
    }

    public function destroy(Taka $taka)
    {
        if (!auth()->user()->hasPermission('delete taka')) {
            return back()->with('error', 'Permission denied!');
        }

        $taka->delete();
        return back()->with('success', 'Taka deleted successfully.');
    }
}
