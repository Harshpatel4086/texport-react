<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('roles.permissions');
        return Inertia::render('Dashboard', [
            'userRoles' => $user->roles,
            'vapidPublicKey' => config('app.vapid_public_key')
        ]);
    }
}