<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Define permissions with descriptive names for easy searching
        $permissions = [
            // Role Management
            'manage role',
            'create role',
            'edit role',
            'delete role',

            // Staff Management
            'manage staff',
            'create staff',
            'edit staff',
            'delete staff',

            // Party Management
            'manage party',
            'create party',
            'edit party',
            'view party',
            'delete party',

            // Product Management (example)
            // 'create product',
            // 'edit product',

            // Order Management (example)
            // 'manage order',
            // 'create order',
            // 'view order',
            // 'edit order',
            // 'delete order',
            // 'export order',

            // Report Management (example)
            // 'view report',
            // 'export report',
        ];

        // Create all permissions
        $allPermissions = [];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
            $allPermissions[] = $permission;
        }

        // Create Owner role with all permissions (system role)
        $ownerRole = Role::firstOrCreate(
            ['name' => 'owner'],
            ['created_by' => null] // System role, not user-specific
        );
        // Always sync all permissions to owner role
        $ownerRole->syncPermissions($allPermissions);
    }
}
