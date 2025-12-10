<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use App\Models\Machine;
use App\Models\WorkerMachineAssignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkerMachineAssignmentController extends Controller
{
    public function index()
    {
        // Check manage permission for worker machine assign
        if (!auth()->user()->hasPermission('manage worker machine assign')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $workers = Worker::where('user_id', createdBy())
            ->with(['machineAssignments.machine'])
            ->get();

        $machines = Machine::where('user_id', createdBy())->get();

        return Inertia::render('WorkerMachineAssignment/Index', [
            'workers' => $workers,
            'machines' => $machines,
        ]);
    }

    public function store(Request $request)
    {
        // Check assign permission for worker machine assign
        if (!auth()->user()->hasPermission('assign worker machine assign')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'worker_id' => 'required|exists:workers,id',
            'machine_ids' => 'required|array',
            'machine_ids.*' => 'exists:machines,id',
            'shift_id' => 'required|in:day,night',
        ]);

        $worker = Worker::where('id', $request->worker_id)
            ->where('user_id', createdBy())
            ->firstOrFail();

        // Remove existing assignments for this worker and shift
        WorkerMachineAssignment::where('user_id', createdBy())
            ->where('worker_id', $request->worker_id)
            ->where('shift_id', $request->shift_id)
            ->delete();

        // Create new assignments
        foreach ($request->machine_ids as $machineId) {
            $machine = Machine::where('id', $machineId)
                ->where('user_id', createdBy())
                ->firstOrFail();

            WorkerMachineAssignment::create([
                'user_id' => createdBy(),
                'worker_id' => $request->worker_id,
                'machine_id' => $machineId,
                'shift_id' => $request->shift_id,
            ]);
        }

        return back()->with('success', 'Machine assignments updated successfully.');
    }
}
