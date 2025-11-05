<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            // Drop the existing unique constraint on name
            $table->dropUnique(['name']);
            
            // Add composite unique constraint on name and created_by
            $table->unique(['name', 'created_by'], 'roles_name_created_by_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            // Drop the composite unique constraint
            $table->dropUnique('roles_name_created_by_unique');
            
            // Add back the original unique constraint on name
            $table->unique('name');
        });
    }
};