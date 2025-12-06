<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use App\Models\WorkerMachineAssignment;
use App\Models\WorkerDailyProductionEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkerProductionController extends Controller
{
    public function index()
    {
        $workers = Worker::where('user_id', createdBy())->get();

        return Inertia::render('WorkerProduction/Index', [
            'workers' => $workers,
        ]);
    }

    public function getMachines(Request $request)
    {
        $request->validate([
            'worker_id' => 'required|exists:workers,id',
            'shift_id' => 'required|in:day,night',
        ]);

        $assignments = WorkerMachineAssignment::where('user_id', createdBy())
            ->where('worker_id', $request->worker_id)
            ->where('shift_id', $request->shift_id)
            ->with('machine')
            ->get();

        return response()->json($assignments->pluck('machine'));
    }

    public function getExisting(Request $request)
    {
        $request->validate([
            'worker_id' => 'required|exists:workers,id',
            'shift_id' => 'required|in:day,night',
            'date' => 'required|date',
        ]);

        $entries = WorkerDailyProductionEntry::where('user_id', createdBy())
            ->where('worker_id', $request->worker_id)
            ->where('shift_id', $request->shift_id)
            ->where('date', $request->date)
            ->get();

        return response()->json($entries);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'worker_id' => 'required|exists:workers,id',
            'shift_id' => 'required|in:day,night',
            'entries' => 'required|array',
            'entries.*.machine_id' => 'required|exists:machines,id',
            'entries.*.meters' => 'required|numeric|min:0',
        ]);

        $worker = Worker::where('id', $request->worker_id)
            ->where('user_id', createdBy())
            ->firstOrFail();

        foreach ($request->entries as $entry) {
            WorkerDailyProductionEntry::updateOrCreate(
                [
                    'user_id' => createdBy(),
                    'date' => $request->date,
                    'worker_id' => $request->worker_id,
                    'machine_id' => $entry['machine_id'],
                    'shift_id' => $request->shift_id,
                ],
                [
                    'meters' => $entry['meters'],
                ]
            );
        }

        return back()->with('success', 'Production entries saved successfully.');
    }
}