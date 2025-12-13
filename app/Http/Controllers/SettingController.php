<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $workerRate = Setting::getValue('worker_per_meter_rate', createdBy());
        $lotMeterSize = Setting::getValue('lot_meter_size', createdBy());

        return Inertia::render('Setting/Index', [
            'workerRate' => $workerRate,
            'lotMeterSize' => $lotMeterSize,
        ]);
    }

    public function updateWorkerRate(Request $request)
    {
        $request->validate([
            'rate' => 'required|numeric|min:0',
        ]);

        Setting::setValue('worker_per_meter_rate', $request->rate, createdBy());

        return back()->with('success', 'Worker rate updated successfully.');
    }

    public function updateLotMeterSize(Request $request)
    {
        $request->validate([
            'lot_meter_size' => 'required|numeric|min:1',
        ]);

        Setting::setValue('lot_meter_size', $request->lot_meter_size, createdBy());

        return back()->with('success', 'Lot meter size updated successfully.');
    }
}