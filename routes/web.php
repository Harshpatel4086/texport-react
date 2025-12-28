<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ChallanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\PartyManagementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StaffManagementController;
use App\Http\Controllers\StaffSalaryController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SubscriptionsController;
use App\Http\Controllers\WorkerController;
use App\Http\Controllers\WorkerMachineAssignmentController;
use App\Http\Controllers\WorkerProductionController;
use App\Http\Controllers\WorkerSalaryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index'])->name('home');

// Static pages
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/pricing', function () {
    return Inertia::render('Pricing');
})->name('pricing');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Language routes (public access)
Route::get('/api/languages', [LanguageController::class, 'getLanguages'])->name('languages');
Route::get('/api/translations/{locale}', [LanguageController::class, 'getTranslations'])->name('translations');

// Public Challan View (no auth required)
Route::get('/challan/{encryptedId}', [ChallanController::class, 'publicView'])->name('challans.public');

Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    file_put_contents(storage_path('logs/laravel.log'), '');
    return redirect()->back()->with('success', 'Cache and logs cleared successfully!');
});

Route::get('/send/notification/{title}/{message}', function($title, $message) {
    $userId = null;
    app(\App\Services\NotificationService::class)->sendToUser($userId, $title, $message);
    return redirect()->back()->with('success', 'Notification sent successfully!');
})->middleware('auth');

Route::get('/email/verification-status', function() {
    return response()->json([
        'verified' => auth()->check() && auth()->user()->hasVerifiedEmail()
    ]);
})->middleware('auth');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Push notification subscriptions
    Route::post('/subscriptions', [SubscriptionsController::class, 'store'])->name('subscriptions.store');

    // Staff routes
    Route::resource('staff', StaffManagementController::class);

    // Staff Salary routes
    // Route::resource('staff-salaries', StaffSalaryController::class);

    // Attendance routes
    // Route::get('attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    // Route::post('attendance', [AttendanceController::class, 'store'])->name('attendance.store');
    // Route::get('attendance/history/{staff}', [AttendanceController::class, 'history'])->name('attendance.history');

    // Role routes
    Route::resource('roles', RoleManagementController::class);

    // Party routes
    Route::resource('parties', PartyManagementController::class);

    // Challan routes
    Route::resource('challans', ChallanController::class);
    Route::post('challans/check-stock', [ChallanController::class, 'checkStock'])->name('challans.check-stock');



    // Worker Salary routes
    Route::get('worker-salary', [WorkerSalaryController::class, 'index'])->name('worker-salary.index');
    Route::post('worker-salary/calculate', [WorkerSalaryController::class, 'calculate'])->name('worker-salary.calculate');
    Route::post('worker-salary/generate-payslip', [WorkerSalaryController::class, 'generatePayslip'])->name('worker-salary.generate-payslip');
    Route::get('worker-salary/payslips', [WorkerSalaryController::class, 'payslips'])->name('worker-salary.payslips');
    Route::get('worker-salary/payslip/{id}', [WorkerSalaryController::class, 'viewPayslip'])->name('worker-salary.payslip.view');
    Route::get('worker-salary/report/{worker}', [WorkerSalaryController::class, 'report'])->name('worker-salary.report');

    // Worker routes
    Route::resource('workers', WorkerController::class);

    // Machine routes (for worker module)
    Route::resource('machines', MachineController::class);

    // Worker Machine Assignment routes
    Route::get('worker-machine-assignments', [WorkerMachineAssignmentController::class, 'index'])->name('worker-machine-assignments.index');
    Route::post('worker-machine-assignments', [WorkerMachineAssignmentController::class, 'store'])->name('worker-machine-assignments.store');

    // Worker Production routes
    Route::get('worker-production', [WorkerProductionController::class, 'index'])->name('worker-production.index');
    Route::get('worker-production/machines', [WorkerProductionController::class, 'getMachines'])->name('worker-production.machines');
    Route::get('worker-production/existing', [WorkerProductionController::class, 'getExisting'])->name('worker-production.existing');
    Route::post('worker-production', [WorkerProductionController::class, 'store'])->name('worker-production.store');

    // Worker Salary routes
    Route::get('worker-salary', [WorkerSalaryController::class, 'index'])->name('worker-salary.index');
    Route::post('worker-salary/calculate', [WorkerSalaryController::class, 'calculate'])->name('worker-salary.calculate');
    Route::post('worker-salary/generate-payslip', [WorkerSalaryController::class, 'generatePayslip'])->name('worker-salary.generate-payslip');
    Route::get('worker-salary/payslips', [WorkerSalaryController::class, 'payslips'])->name('worker-salary.payslips');
    Route::get('worker-salary/payslip/{id}', [WorkerSalaryController::class, 'viewPayslip'])->name('worker-salary.payslip.view');
    Route::get('worker-salary/report/{worker}', [WorkerSalaryController::class, 'report'])->name('worker-salary.report');

    // Settings routes
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('settings/worker-rate', [SettingController::class, 'updateWorkerRate'])->name('settings.worker-rate');
    Route::post('settings/business-details', [SettingController::class, 'updateBusinessDetails'])->name('settings.business-details');

    // Stock Management routes
    Route::get('stock', [StockController::class, 'index'])->name('stock.index');
    Route::post('stock/refresh', [StockController::class, 'refreshStock'])->name('stock.refresh');


});

require __DIR__.'/auth.php';
