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

            // Staff Salary Management
            'manage staff salary',
            'create staff salary',
            'edit staff salary',
            'delete staff salary',

            // Party Management
            'manage party',
            'create party',
            'edit party',
            'view party',
            'delete party',

            // Attendance Management
            'manage attendance',
            'create attendance',
            'edit attendance',
            'view attendance',
            'delete attendance',

            // Workers Management
            'manage workers',
            'create workers',
            'edit workers',
            'delete workers',
            'view workers',

            // Worker Machines Management
            'manage worker machines',
            'create worker machines',
            'edit worker machines',
            'delete worker machines',
            'view worker machines',

            // Worker Machine Assignment
            'manage worker machine assign',
            'assign worker machine assign',

            // Worker Daily Production
            'manage worker daily production',
            'entry worker daily production',

            // Worker Salary Management
            'manage worker salary',
            'calculate worker salary',

            // Worker Payslip Management
            'generate worker payslip',
            'view worker payslip',
            'download worker payslip',

            // Stock Management - For this permission also give the daily production entry Permission
            'manage stock management',
            'view stock management',
            'refresh stock management',

            // Taka Management
            'manage taka',
            'create taka',
            'edit taka',
            'delete taka',

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

        // delete existing permissions and roles to avoid duplicates
        // Permission::whereIn('name', $permissions)->delete();

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
