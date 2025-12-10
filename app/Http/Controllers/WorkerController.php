<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkerController extends Controller
{
    public function index(Request $request)
    {
        // Check manage permission for workers
        if (!auth()->user()->hasPermission('manage workers')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = Worker::where('user_id', createdBy());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $sortField = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');

        $allowedSorts = ['name', 'phone', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $workers = $query->paginate($perPage)->withQueryString();

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

        return Inertia::render('Worker/Index', [
            'workers' => $workers,
            'filters' => $filters,
        ]);
    }

    public function store(Request $request)
    {
        // Check create permission for workers
        if (!auth()->user()->hasPermission('create workers')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $worker = Worker::create([
            'user_id' => createdBy(),
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        // // Send push notification
        // $notificationService = new NotificationService();
        // $notificationService->sendToUser(
        //     createdBy(),
        //     'New Worker Added',
        //     'A new worker has been added to your account.'
        // );

        return back()->with('success', 'Worker created successfully.');
    }

    public function update(Request $request, Worker $worker)
    {
        if ($worker->user_id != createdBy()) {
            abort(403);
        }

        // Check edit permission for workers
        if (!auth()->user()->hasPermission('edit workers')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $worker->update([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        return back()->with('success', 'Worker updated successfully.');
    }

    public function destroy(Worker $worker)
    {
        if ($worker->user_id !== createdBy()) {
            // abort(403);
            return back()->with('error', 'You are not authorized to delete this worker.');
        }

        // Check delete permission for workers
        if (!auth()->user()->hasPermission('delete workers')) {
            return back()->with('error', 'Permission denied!');
        }

        // Delete related data first
        $worker->machineAssignments()->delete();
        $worker->productionEntries()->delete();

        $worker->delete();
        return back()->with('success', 'Worker deleted successfully.');
    }
}
