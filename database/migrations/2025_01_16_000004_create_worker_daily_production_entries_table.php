<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('worker_daily_production_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('date');
            $table->foreignId('worker_id')->constrained('workers')->onDelete('cascade');
            $table->foreignId('machine_id')->constrained('machines')->onDelete('cascade');
            $table->enum('shift_id', ['day', 'night']);
            $table->decimal('meters', 10, 2);
            $table->timestamps();
            
            $table->unique(['user_id', 'date', 'worker_id', 'machine_id', 'shift_id'], 'worker_production_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('worker_daily_production_entries');
    }
};