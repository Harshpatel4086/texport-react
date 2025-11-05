<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StaffManagementController extends Controller
{
    public function index(Request $request)
    {
        // Check manage permission for staff
        if (!auth()->user()->hasPermission('manage staff')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = User::staff()->where('created_by', createdBy());

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
        $staff = $query->with('roles')->paginate($perPage)->withQueryString();

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
        // Check create permission for staff
        if (!auth()->user()->hasPermission('create staff')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Verify the role belongs to the current user
        $role = Role::where('name', $request->role)
                                ->where('created_by', auth()->id())
                                ->first();

        if (!$role) {
            return back()->withErrors(['role' => 'Invalid role selected.']);
        }

        $staff = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
            'created_by' => auth()->id(),
            'is_staff' => true,
        ]);

        // Assign the role to the staff member
        $staff->addRole($role);

        return back()->with('success', 'Staff member created successfully....');
    }

    public function update(Request $request, User $staff)
    {
        if ($staff->created_by != auth()->id() || !$staff->is_staff) {
            abort(403);
        }

        // Check edit permission for staff
        if (!auth()->user()->hasPermission('edit staff')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $staff->id,
            'role' => 'required|string|max:255',
            'password' => 'nullable|string|min:8',
        ]);

        // Verify the role belongs to the current user
        $role = Role::where('name', $request->role)
                                ->where('created_by', auth()->id())
                                ->first();

        if (!$role) {
            return back()->withErrors(['role' => 'Invalid role selected.']);
        }

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $staff->update($updateData);

        // Remove all existing roles and assign the new role
        $staff->removeRoles();
        $staff->addRole($role);

        return back()->with('success', 'Staff updated successfully.');
    }

    public function destroy(User $staff)
    {
        if ($staff->created_by !== auth()->id() || !$staff->is_staff) {
            abort(403);
        }

        // Check delete permission for staff
        if (!auth()->user()->hasPermission('delete staff')) {
            return back()->with('error', 'Permission denied!');
        }

        $staff->delete();
        return back()->with('success', 'Staff deleted successfully.');
    }
}
