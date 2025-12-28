<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'total_meters',
    ];

    protected $casts = [
        'date' => 'date',
        'total_meters' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function updateStockFromProduction($userId, $date)
    {
        // Calculate total meters from all machines for the date
        $totalMeters = WorkerDailyProductionEntry::where('user_id', $userId)
            ->where('date', $date)
            ->sum('meters');

        if ($totalMeters > 0) {
            // Delete existing stock for this date first
            self::where('user_id', $userId)
                ->where('date', $date)
                ->delete();

            // Create new stock entry
            self::create([
                'user_id' => $userId,
                'date' => $date,
                'total_meters' => $totalMeters,
            ]);
        }

        return true;
    }

    public static function getDateWiseStock($userId)
    {
        return self::where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->get()
            ->groupBy(function($item) {
                return $item->date->format('d-m-Y');
            });
    }

    public static function getMachineWiseProduction($userId, $date)
    {
        return WorkerDailyProductionEntry::where('user_id', $userId)
            ->where('date', $date)
            ->with('machine')
            ->selectRaw('machine_id, SUM(meters) as total_meters')
            ->groupBy('machine_id')
            ->get();
    }

    public static function calculateAllStock($userId)
    {
        // Get all production dates for the user
        $productionData = WorkerDailyProductionEntry::where('user_id', $userId)
            ->with('machine')
            ->selectRaw('date, machine_id, SUM(meters) as total_meters')
            ->groupBy('date', 'machine_id')
            ->orderBy('date', 'desc')
            ->get()
            ->groupBy('date');

        $stockData = [];
        
        foreach ($productionData as $date => $machines) {
            $dateTotal = $machines->sum('total_meters');
            
            if ($dateTotal > 0) {
                // Clear existing stock for this date
                self::where('user_id', $userId)
                    ->where('date', $date)
                    ->delete();
                
                // Create new stock entry
                self::create([
                    'user_id' => $userId,
                    'date' => $date,
                    'total_meters' => $dateTotal,
                ]);
            }
            
            $stockData[Carbon::parse($date)->format('d-m-Y')] = [
                'date' => $date,
                'total_meters' => $dateTotal,
                'machines' => $machines->map(function($machine) {
                    return [
                        'machine_id' => $machine->machine_id,
                        'machine_name' => $machine->machine->name ?? "Machine {$machine->machine_id}",
                        'total_meters' => $machine->total_meters
                    ];
                })
            ];
        }
        
        return ['stocks' => $stockData, 'error' => null];
    }

    public static function getTotalAvailableMeters($userId)
    {
        // Use the StockService for consistent calculation
        return \App\Services\StockService::getTotalAvailableStock($userId);
    }
}
