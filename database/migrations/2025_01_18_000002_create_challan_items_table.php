<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('challan_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('challan_id');
            $table->integer('sr_number');
            $table->decimal('meter', 8, 2);
            $table->integer('group_number');
            $table->timestamps();
            
            $table->foreign('challan_id')->references('id')->on('challans')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('challan_items');
    }
};