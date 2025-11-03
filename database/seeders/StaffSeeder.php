<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Staff;
use Faker\Factory as Faker;

class StaffSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 50; $i++) {
            Staff::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'role' => $faker->randomElement(['Manager', 'Supervisor', 'Designer', 'Accountant']),
                'password' => bcrypt('password'),
                'created_by' => 1,
            ]);
        }
    }
}
