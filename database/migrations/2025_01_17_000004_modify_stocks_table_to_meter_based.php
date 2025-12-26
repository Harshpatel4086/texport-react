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
        // First, drop the foreign key constraint
        Schema::table('stocks', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        
        // Then drop the existing unique constraint
        Schema::table('stocks', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'date', 'lot_number']);
        });
        
        // Drop the lot-related columns
        Schema::table('stocks', function (Blueprint $table) {
            $table->dropColumn(['lot_number', 'meters_per_lot', 'total_lots']);
        });
        
        // Add the new unique constraint and recreate foreign key
        Schema::table('stocks', function (Blueprint $table) {
            $table->unique(['user_id', 'date']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the foreign key and new unique constraint
        Schema::table('stocks', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropUnique(['user_id', 'date']);
        });
        
        // Add back the lot-related columns
        Schema::table('stocks', function (Blueprint $table) {
            $table->integer('lot_number')->default(1);
            $table->decimal('meters_per_lot', 10, 2)->default(0);
            $table->integer('total_lots')->default(0);
        });
        
        // Restore the original unique constraint and foreign key
        Schema::table('stocks', function (Blueprint $table) {
            $table->unique(['user_id', 'date', 'lot_number']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};