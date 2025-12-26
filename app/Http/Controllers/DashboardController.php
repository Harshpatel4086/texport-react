<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Setting;
use App\Models\Worker;
use App\Models\Machine;
use App\Models\StaffDetail;
use App\Models\WorkerDailyProductionEntry;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('roles.permissions');
        $userId = createdBy();

        // Get stock data for dashboard
        $stockResult = Stock::calculateAllStock($userId);
        $stockData = $stockResult['stocks'] ?? [];

        // Get stock summary
        $totalMeters = Stock::getTotalAvailableMeters($userId);
        $stockChartData = [];

        foreach ($stockData as $date => $stock) {
            $stockChartData[] = [
                'date' => $date,
                'meters' => $stock['total_meters']
            ];
        }

        // Get recent activities
        $activities = $this->getRecentActivities($userId);

        // Get production chart data (last 7 days)
        $productionChart = $this->getProductionChartData($userId);

        return Inertia::render('Dashboard', [
            'userRoles' => $user->roles,
            'vapidPublicKey' => config('app.vapid_public_key'),
            'stockData' => array_slice($stockData, 0, 5, true), // Last 5 days
            'stockSummary' => [
                'totalMeters' => $totalMeters,
                'chartData' => array_reverse(array_slice($stockChartData, 0, 7))
            ],
            'activities' => $activities,
            'productionChart' => $productionChart
        ]);
    }

    private function getRecentActivities($userId)
    {
        $activities = [];

        // Staff activities
        $staffs = StaffDetail::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();
        foreach ($staffs as $staff) {
            $activities[] = [
                'type' => 'staff_added',
                'title' => 'New Staff Added',
                'description' => "Staff '{$staff->name}' was added",
                'time' => $staff->created_at
            ];
        }

        // Worker activities
        $workers = Worker::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();
        foreach ($workers as $worker) {
            $activities[] = [
                'type' => 'worker_added',
                'title' => 'New Worker Added',
                'description' => "Worker '{$worker->name}' was added",
                'time' => $worker->created_at
            ];
        }

        // Machine activities
        $machines = Machine::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();
        foreach ($machines as $machine) {
            $activities[] = [
                'type' => 'machine_added',
                'title' => 'New Machine Added',
                'description' => "Machine '{$machine->name}' was added",
                'time' => $machine->created_at
            ];
        }

        // Production activities
        $productions = WorkerDailyProductionEntry::where('user_id', $userId)
            ->with('worker')
            ->latest()
            ->take(10)
            ->get();
        foreach ($productions as $production) {
            $activities[] = [
                'type' => 'production_added',
                'title' => 'Production Entry Added',
                'description' => "Production entry for {$production->worker->name}: {$production->meters}m",
                'time' => $production->created_at
            ];
        }

        // Sort by time and take latest 10
        usort($activities, function($a, $b) {
            return $b['time'] <=> $a['time'];
        });

        return array_slice($activities, 0, 10);
    }

    private function getProductionChartData($userId)
    {
        $last7Days = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $meters = WorkerDailyProductionEntry::where('user_id', $userId)
                ->where('date', $date)
                ->sum('meters');

            $last7Days[] = [
                'date' => Carbon::parse($date)->format('M d'),
                'meters' => $meters
            ];
        }

        return $last7Days;
    }
}
