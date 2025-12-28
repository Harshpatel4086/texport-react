<?php

namespace App\Services;

use App\Models\Stock;
use App\Models\Challan;
use Illuminate\Support\Facades\DB;

class StockService
{
    /**
     * Get total available stock meters for a user
     * This is the main helper function for stock calculations
     */
    public static function getTotalAvailableStock($userId = null)
    {
        $userId = $userId ?? createdBy();
        
        // Get total production stock
        $totalProduced = Stock::where('user_id', $userId)->sum('total_meters');
        
        // Get total issued stock (from challans)
        $totalIssued = Challan::where('created_by', $userId)->sum('total_meter');
        
        // Available stock = Produced - Issued
        $availableStock = $totalProduced - $totalIssued;
        
        return max(0, $availableStock); // Never return negative stock
    }

    /**
     * Check if requested meters are available in stock
     */
    public static function isStockAvailable($requestedMeters, $userId = null, $excludeChallanId = null)
    {
        $userId = $userId ?? createdBy();
        $availableStock = self::getTotalAvailableStock($userId);
        
        // If editing existing challan, add back its meters to available stock
        if ($excludeChallanId) {
            $existingChallan = Challan::find($excludeChallanId);
            if ($existingChallan && $existingChallan->created_by == $userId) {
                $availableStock += $existingChallan->total_meter;
            }
        }
        
        return $requestedMeters <= $availableStock;
    }

    /**
     * Deduct stock when challan is created/updated
     * This is handled automatically by the getTotalAvailableStock calculation
     * No need for separate deduction as challans are counted in the calculation
     */
    public static function validateStockForChallan($requestedMeters, $userId = null, $excludeChallanId = null)
    {
        if (!self::isStockAvailable($requestedMeters, $userId, $excludeChallanId)) {
            $availableStock = self::getTotalAvailableStock($userId);
            throw new \Exception("Insufficient stock. Available: {$availableStock}m, Requested: {$requestedMeters}m");
        }
        
        return true;
    }
}