<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index()
    {
        return Inertia::render('LandingPage', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
}