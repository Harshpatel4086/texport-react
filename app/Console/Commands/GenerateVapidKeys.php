<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Minishlink\WebPush\VAPID;

class GenerateVapidKeys extends Command
{
    protected $signature = 'webpush:vapid';
    protected $description = 'Generate VAPID keys for web push notifications';

    public function handle()
    {
        $keys = VAPID::createVapidKeys();
        
        $this->info('VAPID keys generated successfully!');
        $this->line('');
        $this->line('Add these to your .env file:');
        $this->line('');
        $this->line('VAPID_PUBLIC_KEY=' . $keys['publicKey']);
        $this->line('VAPID_PRIVATE_KEY=' . $keys['privateKey']);
        
        return 0;
    }
}