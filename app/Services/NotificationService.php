<?php

namespace App\Services;

use App\Models\UserPushSubscription;
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

class NotificationService
{
    public function sendToUser($userId, $title, $message)
    {
        \Log::info("Attempting to send notification: {$title} - {$message} to user {$userId}");

        try {
            if ($userId === null) {
                $subscriptions = UserPushSubscription::all();
            } else {
                $subscriptions = UserPushSubscription::where('user_id', $userId)->get();
            }

            if ($subscriptions->isEmpty()) {
                return;
            }

            $auth = [
                'VAPID' => [
                    'subject' => config('app.url'),
                    'publicKey' => config('app.vapid_public_key'),
                    'privateKey' => config('app.vapid_private_key'),
                ]
            ];

            $webPush = new WebPush($auth);

            $payload = json_encode([
                'title' => $title,
                'message' => $message,
            ]);

            foreach ($subscriptions as $subscription) {
                $pushSubscription = Subscription::create([
                    'endpoint' => $subscription->endpoint,
                    'keys' => [
                        'p256dh' => $subscription->p256dh,
                        'auth' => $subscription->auth,
                    ]
                ]);

                $webPush->queueNotification($pushSubscription, $payload);
            }

            foreach ($webPush->flush() as $report) {
                if (!$report->isSuccess()) {
                    $endpoint = $report->getRequest()->getUri()->__toString();
                    UserPushSubscription::where('endpoint', $endpoint)->delete();
                }
            }
        } catch (\Exception $e) {
            \Log::error('Push notification failed: ' . $e->getMessage());
        }
    }
}
