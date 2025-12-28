<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('challans', function (Blueprint $table) {
            $table->id();
            $table->integer('challan_number');
            $table->unsignedBigInteger('party_id');
            $table->decimal('total_meter', 10, 2);
            $table->integer('total_lots');
            $table->date('date');
            $table->unsignedBigInteger('created_by');
            $table->timestamps();
            
            $table->foreign('party_id')->references('id')->on('parties')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('challans');
    }
};