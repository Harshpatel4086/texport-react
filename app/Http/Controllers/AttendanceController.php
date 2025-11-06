<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermission('manage attendance')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = User::staff()->where('created_by', auth()->id());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('role', 'like', "%{$search}%");
            });
        }

        $staff = $query->with(['attendances' => function($query) {
                $query->where('date', '>=', Carbon::now()->subDays(9))
                      ->orderBy('date', 'desc');
            }])
            ->orderBy('name')
            ->get();

        return Inertia::render('Attendance/Index', [
            'staff' => $staff,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermission('create attendance')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'staff_id' => 'required|exists:users,id',
            'status' => 'required|in:present,absent',
            'date' => 'nullable|date',
        ]);

        $staff = User::find($request->staff_id);
        if (!$staff || $staff->created_by !== auth()->id() || !$staff->is_staff) {
            return back()->with('error', 'Invalid staff member!');
        }

        $date = $request->date ? Carbon::parse($request->date) : Carbon::today();

        Attendance::updateOrCreate(
            [
                'staff_id' => $request->staff_id,
                'date' => $date,
            ],
            [
                'status' => $request->status,
                'created_by' => auth()->id(),
            ]
        );

        return back()->with('success', 'Attendance marked successfully!');
    }

    public function history(Request $request, User $staff)
    {
        if (!auth()->user()->hasPermission('manage attendance')) {
            return response()->json(['error' => 'Permission denied!'], 403);
        }

        if ($staff->created_by !== auth()->id() || !$staff->is_staff) {
            return response()->json(['error' => 'Invalid staff member!'], 403);
        }

        $fromDate = $request->get('from_date', Carbon::now()->subDays(30)->format('Y-m-d'));
        $toDate = $request->get('to_date', Carbon::now()->format('Y-m-d'));

        $attendances = $staff->attendances()
            ->whereBetween('date', [$fromDate, $toDate])
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'staff' => $staff,
            'attendances' => $attendances,
            'from_date' => $fromDate,
            'to_date' => $toDate,
        ]);
    }
}