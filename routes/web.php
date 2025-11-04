<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\StaffManagementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'auth' => [
            'user' => auth()->user()
        ]
    ]);
})->name('home');

Route::get('/dashboard', function () {
    $user = auth()->user()->load('roles.permissions');
    return Inertia::render('Dashboard', [
        'userRoles' => $user->roles
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Staff routes
    Route::resource('staff', StaffManagementController::class);

    // Role routes
    Route::resource('roles', RoleManagementController::class);
});

require __DIR__.'/auth.php';
