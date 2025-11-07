<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\PartyManagementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\StaffManagementController;
use App\Http\Controllers\StaffSalaryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index'])->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Staff routes
    Route::resource('staff', StaffManagementController::class);
    
    // Staff Salary routes
    Route::resource('staff-salaries', StaffSalaryController::class);

    // Attendance routes
    Route::get('attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    Route::post('attendance', [AttendanceController::class, 'store'])->name('attendance.store');
    Route::get('attendance/history/{staff}', [AttendanceController::class, 'history'])->name('attendance.history');

    // Role routes
    Route::resource('roles', RoleManagementController::class);

    // Party routes
    Route::resource('parties', PartyManagementController::class);
});

require __DIR__.'/auth.php';
