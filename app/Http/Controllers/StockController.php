<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {
        // Check both required permissions
        if (!auth()->user()->hasPermission('manage stock management') || !auth()->user()->hasPermission('entry worker daily production')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied! Stock management requires both stock management and daily production entry permissions.');
        }

        $userId = createdBy();
        $lotMeterSize = Setting::getValue('lot_meter_size', $userId);
        
        // Automatically calculate stock when page opens
        $result = Stock::calculateAllStock($userId);
        
        return Inertia::render('Stock/Index', [
            'stocks' => $result['stocks'] ?? [],
            'lotMeterSize' => $lotMeterSize,
            'error' => $result['error'] ?? null
        ]);
    }

    public function updateLotSize(Request $request)
    {
        // Check permissions
        if (!auth()->user()->hasPermission('manage stock management')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'lot_meter_size' => 'required|numeric|min:1'
        ]);

        Setting::setValue('lot_meter_size', $request->lot_meter_size, createdBy());

        return back()->with('success', 'Lot meter size updated successfully.');
    }

    public function refreshStock()
    {
        // Check permissions
        if (!auth()->user()->hasPermission('refresh stock management')) {
            return back()->with('error', 'Permission denied!');
        }

        $userId = createdBy();
        $lotMeterSize = Setting::getValue('lot_meter_size', $userId);
        
        if (!$lotMeterSize) {
            return back()->with('error', 'Please set lot meter size first.');
        }

        // Update stock for all production dates
        $productionDates = \App\Models\WorkerDailyProductionEntry::where('user_id', $userId)
            ->distinct()
            ->pluck('date');

        foreach ($productionDates as $date) {
            Stock::updateStockFromProduction($userId, $date);
        }

        return back()->with('success', 'Stock refreshed successfully.');
    }
}
