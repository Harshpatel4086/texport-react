<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use App\Models\WorkerDailyProductionEntry;
use App\Models\Setting;
use App\Models\Payslip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WorkerSalaryController extends Controller
{
    public function index()
    {
        // Check manage permission for worker salary
        if (!auth()->user()->hasPermission('manage worker salary')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $workers = Worker::where('user_id', createdBy())->get();

        return Inertia::render('WorkerSalary/Index', [
            'workers' => $workers,
        ]);
    }

    public function calculate(Request $request)
    {
        // Check calculate permission for worker salary
        if (!auth()->user()->hasPermission('calculate worker salary')) {
            return response()->json(['error' => 'Permission denied!'], 403);
        }

        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'worker_id' => 'nullable|exists:workers,id',
            'shift_id' => 'nullable|in:day,night',
        ]);

        // Get worker_per_meter_rate from settings for current user
        $rate = Setting::getValue('worker_per_meter_rate', createdBy());
        
        if (!$rate) {
            return response()->json([
                'error' => 'Please set the rate price in setting'
            ], 422);
        }

        $query = WorkerDailyProductionEntry::where('user_id', createdBy())
            ->whereBetween('date', [$request->date_from, $request->date_to])
            ->with(['worker', 'machine']);

        if ($request->worker_id) {
            $query->where('worker_id', $request->worker_id);
        }

        if ($request->shift_id) {
            $query->where('shift_id', $request->shift_id);
        }

        $entries = $query->get();

        $workerSalaries = $entries->groupBy('worker_id')->map(function ($workerEntries) use ($rate) {
            $worker = $workerEntries->first()->worker;
            $totalMeters = $workerEntries->sum('meters');
            $totalSalary = $totalMeters * $rate;

            return [
                'worker' => $worker,
                'total_meters' => $totalMeters,
                'rate' => $rate,
                'total_salary' => $totalSalary,
            ];
        })->values();

        return response()->json([
            'salaries' => $workerSalaries,
            'rate' => $rate,
        ]);
    }

    public function report(Request $request, $encryptedWorkerId)
    {
        $workerId = base64_decode($encryptedWorkerId);
        $worker = Worker::where('id', $workerId)
            ->where('user_id', createdBy())
            ->firstOrFail();

        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'shift_id' => 'nullable|in:day,night',
        ]);

        $rate = Setting::getValue('worker_per_meter_rate', createdBy());

        $query = WorkerDailyProductionEntry::where('user_id', createdBy())
            ->where('worker_id', $worker->id)
            ->whereBetween('date', [$request->date_from, $request->date_to])
            ->with('machine');

        if ($request->shift_id) {
            $query->where('shift_id', $request->shift_id);
        }

        $entries = $query->orderBy('date')->orderBy('shift_id')->get();
        $totalMeters = $entries->sum('meters');
        $totalSalary = $totalMeters * $rate;

        return Inertia::render('WorkerSalary/Report', [
            'worker' => $worker,
            'entries' => $entries,
            'totalMeters' => $totalMeters,
            'rate' => $rate,
            'totalSalary' => $totalSalary,
            'dateFrom' => $request->date_from,
            'dateTo' => $request->date_to,
            'shift' => $request->shift_id,
        ]);
    }

    public function generatePayslip(Request $request)
    {
        // Check generate payslip permission for worker payslip
        if (!auth()->user()->hasPermission('generate worker payslip')) {
            return response()->json(['error' => 'Permission denied!'], 403);
        }

        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'worker_id' => 'required|exists:workers,id',
            'shift_id' => 'nullable|in:day,night',
        ]);

        $rate = Setting::getValue('worker_per_meter_rate', createdBy());
        
        if (!$rate) {
            return response()->json([
                'error' => 'Please set the rate price in setting'
            ], 422);
        }

        $query = WorkerDailyProductionEntry::where('user_id', createdBy())
            ->where('worker_id', $request->worker_id)
            ->whereBetween('date', [$request->date_from, $request->date_to])
            ->with('machine');

        if ($request->shift_id) {
            $query->where('shift_id', $request->shift_id);
        }

        $entries = $query->get();
        $totalMeters = $entries->sum('meters');
        $totalSalary = $totalMeters * $rate;

        $payslip = Payslip::create([
            'worker_id' => $request->worker_id,
            'user_id' => createdBy(),
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
            'shift_id' => $request->shift_id,
            'total_meters' => $totalMeters,
            'rate' => $rate,
            'total_salary' => $totalSalary,
            'calculation_data' => $entries->toArray()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payslip generated successfully!',
            'payslip_id' => $payslip->id
        ]);
    }

    public function payslips()
    {
        // Check view payslips permission for worker payslip
        if (!auth()->user()->hasPermission('view worker payslip')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $payslips = Payslip::where('user_id', createdBy())
            ->with('worker')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('WorkerSalary/Payslips', [
            'payslips' => $payslips
        ]);
    }

    public function viewPayslip($id)
    {
        // Check view payslips permission for worker payslip
        if (!auth()->user()->hasPermission('view worker payslip')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $payslip = Payslip::where('user_id', createdBy())
            ->with('worker')
            ->findOrFail($id);

        return Inertia::render('WorkerSalary/PayslipView', [
            'payslip' => $payslip
        ]);
    }
}
