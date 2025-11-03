<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PermissionSeeder::class);
        
        // User::factory(10)->create();

        User::factory()->create([
            'business_name' => 'Test Business',
            'owner_name' => 'Test User',
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'business_location' => 'Test Location',
        ]);
    }
}
