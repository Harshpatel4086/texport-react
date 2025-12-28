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
        $businessName = Setting::getValue('business_name', createdBy());
        $businessAddress = Setting::getValue('business_address', createdBy());
        $businessPhone = Setting::getValue('business_phone', createdBy());
        $businessGst = Setting::getValue('business_gst', createdBy());

        return Inertia::render('Setting/Index', [
            'workerRate' => $workerRate,
            'businessDetails' => [
                'name' => $businessName,
                'address' => $businessAddress,
                'phone' => $businessPhone,
                'gst' => $businessGst,
            ]
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

    public function updateBusinessDetails(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'phone' => 'nullable|string|max:20',
            'gst' => 'nullable|string|max:50',
        ]);

        Setting::setValue('business_name', $request->name, createdBy());
        Setting::setValue('business_address', $request->address, createdBy());
        Setting::setValue('business_phone', $request->phone, createdBy());
        Setting::setValue('business_gst', $request->gst, createdBy());

        return back()->with('success', 'Business details updated successfully.');
    }
}