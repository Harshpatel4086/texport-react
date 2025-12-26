<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\StaffSalary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffSalaryController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermission('manage staff salary')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = StaffSalary::where('created_by', createdBy())
            ->with(['staff', 'creator']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('staff', function($sq) use ($search) {
                    $sq->where('name', 'like', "%{$search}%");
                })
                ->orWhere('salary_date', 'like', "%{$search}%")
                ->orWhere('total_salary', 'like', "%{$search}%");
            });
        }

        $sortField = $request->get('sort', 'salary_date');
        $sortDirection = $request->get('direction', 'desc');

        $allowedSorts = ['salary_date', 'total_salary', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $salaries = $query->paginate($perPage)->withQueryString();

        $filters = $request->only(['search', 'sort', 'direction', 'per_page']);
        if (empty($filters)) {
            $filters = [
                'per_page' => 10,
                'page' => 1,
                'direction' => 'desc',
                'sort' => 'salary_date',
                'search' => ''
            ];
        } else {
            $filters = array_merge([
                'per_page' => 10,
                'page' => 1,
                'direction' => 'desc',
                'sort' => 'salary_date',
                'search' => ''
            ], array_filter($filters));
        }

        $staffList = User::staff()
            ->where('created_by', createdBy())
            ->with('staffDetail')
            ->get()
            ->map(function ($staff) {
                return [
                    'id' => $staff->id,
                    'name' => $staff->name,
                    'salary_amount' => $staff->staffDetail?->salary_amount ?? 0,
                    'salary_type' => $staff->staffDetail?->salary_type ?? 'monthly',
                ];
            });

        return Inertia::render('StaffSalary/Index', [
            'salaries' => $salaries,
            'filters' => $filters,
            'staffList' => $staffList
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermission('create staff salary')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'staff_id' => 'required|exists:users,id',
            'staff_salary' => 'required|numeric|min:0',
            'salary_type' => 'required|in:monthly,per_meter',
            'meter' => 'nullable|numeric|min:0',
            'working_days' => 'nullable|integer|min:1|max:31',
            'salary_date' => 'required|date',
        ]);

        $totalSalary = $request->salary_type === 'per_meter'
            ? $request->staff_salary * ($request->meter ?? 0)
            : $request->staff_salary * ($request->working_days ?? 0);

        StaffSalary::create([
            'staff_id' => $request->staff_id,
            'staff_salary' => $request->staff_salary,
            'salary_type' => $request->salary_type,
            'meter' => $request->salary_type === 'per_meter' ? $request->meter : null,
            'working_days' => $request->salary_type === 'monthly' ? $request->working_days : null,
            'total_salary' => $totalSalary,
            'salary_date' => $request->salary_date,
            'created_by' => createdBy(),
        ]);

        return back()->with('success', 'Staff salary record created successfully.');
    }

    public function update(Request $request, StaffSalary $staffSalary)
    {
        // if ($staffSalary->created_by !== createdBy()) {
        //     abort(403);
        // }

        if (!auth()->user()->hasPermission('edit staff salary')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'staff_id' => 'required|exists:users,id',
            'staff_salary' => 'required|numeric|min:0',
            'salary_type' => 'required|in:monthly,per_meter',
            'meter' => 'nullable|numeric|min:0',
            'working_days' => 'nullable|integer|min:1|max:31',
            'salary_date' => 'required|date',
        ]);

        $totalSalary = $request->salary_type === 'per_meter'
            ? $request->staff_salary * ($request->meter ?? 0)
            : $request->staff_salary * ($request->working_days ?? 0);

        $staffSalary->update([
            'staff_id' => $request->staff_id,
            'staff_salary' => $request->staff_salary,
            'salary_type' => $request->salary_type,
            'meter' => $request->salary_type === 'per_meter' ? $request->meter : null,
            'working_days' => $request->salary_type === 'monthly' ? $request->working_days : null,
            'total_salary' => $totalSalary,
            'salary_date' => $request->salary_date,
        ]);

        return back()->with('success', 'Staff salary record updated successfully.');
    }

    public function destroy(StaffSalary $staffSalary)
    {
        // if ($staffSalary->created_by !== createdBy()) {
        //     abort(403);
        // }

        if (!auth()->user()->hasPermission('delete staff salary')) {
            return back()->with('error', 'Permission denied!');
        }

        $staffSalary->delete();
        return back()->with('success', 'Staff salary record deleted successfully.');
    }
}
