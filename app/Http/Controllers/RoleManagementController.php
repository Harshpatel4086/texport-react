<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RoleManagementController extends Controller
{
    public function index(Request $request)
    {
        // Check manage permission for roles
        if (!auth()->user()->hasPermission('manage role')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = Role::where('created_by', auth()->id())->with('permissions');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        $sortField = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');

        $allowedSorts = ['name', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $roles = $query->paginate($perPage)->withQueryString();

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

        return Inertia::render('Role/Index', [
            'roles' => $roles,
            'filters' => $filters,
            'permissions' => Permission::all()
        ]);
    }

    public function store(Request $request)
    {
        // Check create permission for roles
        if (!auth()->user()->hasPermission('create role')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles')->where(function ($query) {
                    return $query->where('created_by', auth()->id());
                })
            ],
            'permissions' => 'array'
        ]);

        $role = Role::create([
            'name' => $request->name,
            'created_by' => auth()->id()
        ]);
        $role->syncPermissions($request->permissions ?? []);

        return back()->with('success', 'Role created successfully.');
    }

    public function update(Request $request, Role $role)
    {
        if ($role->created_by !== auth()->id()) {
            abort(403);
        }

        // Check edit permission for roles
        if (!auth()->user()->hasPermission('edit role')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles')->where(function ($query) {
                    return $query->where('created_by', auth()->id());
                })->ignore($role->id)
            ],
            'permissions' => 'array'
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions ?? []);

        return back()->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        if ($role->created_by !== auth()->id()) {
            abort(403);
        }

        // Check delete permission for roles
        if (!auth()->user()->hasPermission('delete role')) {
            return back()->with('error', 'Permission denied!');
        }

        $role->delete();
        return back()->with('success', 'Role deleted successfully.');
    }
}
