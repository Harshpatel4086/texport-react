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

        User::factory()->firstOrCreate([
            'name' => 'Test User',
            'email' => 'owner@example.com',
            'is_staff' => false,
        ]);
    }
}
