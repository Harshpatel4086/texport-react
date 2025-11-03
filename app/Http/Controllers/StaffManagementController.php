<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StaffManagementController extends Controller
{
    public function index(Request $request)
    {
        $query = Staff::where('created_by', auth()->id());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('role', 'like', "%{$search}%");
            });
        }

        $sortField = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');

        $allowedSorts = ['name', 'email', 'role', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $staff = $query->paginate($perPage)->withQueryString();

        // Set default filters when none provided
        $filters = $request->only(['search', 'sort', 'direction', 'per_page']);
        if (empty($filters)) {
            $filters = [
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'name',
                'search' => ''
            ];
        } else {
            $filters = array_merge([
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'name',
                'search' => ''
            ], array_filter($filters));
        }

        return Inertia::render('Staff/Index', [
            'staff' => $staff,
            'filters' => $filters,
            'userRoles' => \App\Models\Role::where('created_by', auth()->id())->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:staff',
            'role' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        Staff::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
            'created_by' => auth()->id(),
        ]);

        return back()->with('success', 'Staff member created successfully.');
    }

    public function update(Request $request, Staff $staff)
    {
        if ($staff->created_by !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:staff,email,' . $staff->id,
            'role' => 'required|string|max:255',
            'password' => 'nullable|string|min:8',
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $staff->update($updateData);

        return back()->with('success', 'Staff updated successfully.');
    }

    public function destroy(Staff $staff)
    {
        if ($staff->created_by !== auth()->id()) {
            abort(403);
        }

        $staff->delete();
        return back()->with('success', 'Staff deleted successfully.');
    }
}
