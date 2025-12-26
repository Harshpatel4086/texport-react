<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MachineController extends Controller
{
    public function index(Request $request)
    {
        // Check manage permission for worker machines
        if (!auth()->user()->hasPermission('manage worker machines')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = Machine::where('user_id', createdBy());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('number', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $sortField = $request->get('sort', 'number');
        $sortDirection = $request->get('direction', 'asc');

        $allowedSorts = ['number', 'description', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            if ($sortField === 'number') {
                $query->orderByRaw('CAST(number AS UNSIGNED) ' . $sortDirection);
            } else {
                $query->orderBy($sortField, $sortDirection);
            }
        }

        $perPage = $request->get('per_page', 10);
        $machines = $query->paginate($perPage)->withQueryString();

        $filters = $request->only(['search', 'sort', 'direction', 'per_page']);
        if (empty($filters)) {
            $filters = [
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'number',
                'search' => ''
            ];
        } else {
            $filters = array_merge([
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'number',
                'search' => ''
            ], array_filter($filters));
        }

        return Inertia::render('Machine/Index', [
            'machines' => $machines,
            'filters' => $filters,
        ]);
    }

    public function store(Request $request)
    {
        // Check create permission for worker machines
        if (!auth()->user()->hasPermission('create worker machines')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'number' => 'required|string|max:255|unique:machines,number,NULL,id,user_id,' . createdBy(),
            'description' => 'nullable|string',
        ]);

        Machine::create([
            'user_id' => createdBy(),
            'number' => $request->number,
            'description' => $request->description,
        ]);

        return back()->with('success', 'Machine created successfully.');
    }

    public function update(Request $request, Machine $machine)
    {
        // if ($machine->user_id != createdBy()) {
        //     abort(403);
        // }

        // Check edit permission for worker machines
        if (!auth()->user()->hasPermission('edit worker machines')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'number' => 'required|string|max:255|unique:machines,number,' . $machine->id . ',id,user_id,' . createdBy(),
            'description' => 'nullable|string',
        ]);

        $machine->update([
            'number' => $request->number,
            'description' => $request->description,
        ]);

        return back()->with('success', 'Machine updated successfully.');
    }

    public function destroy(Machine $machine)
    {
        // if ($machine->user_id !== createdBy()) {
        //     abort(403);
        // }

        // Check delete permission for worker machines
        if (!auth()->user()->hasPermission('delete worker machines')) {
            return back()->with('error', 'Permission denied!');
        }

        $machine->delete();
        return back()->with('success', 'Machine deleted successfully.');
    }
}
