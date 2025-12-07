<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payslips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('worker_id')->constrained('workers');
            $table->foreignId('user_id')->constrained();
            $table->date('date_from');
            $table->date('date_to');
            $table->string('shift_id')->nullable();
            $table->decimal('total_meters', 10, 2);
            $table->decimal('rate', 10, 2);
            $table->decimal('total_salary', 10, 2);
            $table->json('calculation_data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payslips');
    }
};
