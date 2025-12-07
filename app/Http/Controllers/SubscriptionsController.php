<?php

namespace App\Http\Controllers;

use App\Models\UserPushSubscription;
use Illuminate\Http\Request;

class SubscriptionsController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'endpoint' => 'required|string',
            'keys.p256dh' => 'required|string',
            'keys.auth' => 'required|string',
        ]);

        UserPushSubscription::updateOrCreate(
            ['endpoint' => $request->endpoint],
            [
                'user_id' => auth()->id(),
                'p256dh' => $request->keys['p256dh'],
                'auth' => $request->keys['auth'],
            ]
        );

        return back();
    }
}