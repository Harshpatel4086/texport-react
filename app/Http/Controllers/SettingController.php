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

        return Inertia::render('Setting/Index', [
            'workerRate' => $workerRate,
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
}