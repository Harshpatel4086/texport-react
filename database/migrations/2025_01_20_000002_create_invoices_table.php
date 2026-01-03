<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->integer('invoice_number');
            $table->unsignedBigInteger('challan_id')->unique();
            $table->unsignedBigInteger('party_id');
            $table->unsignedBigInteger('quality_id');
            $table->decimal('total_meter', 10, 2);
            $table->decimal('price', 10, 2)->default(0);
            $table->decimal('base_amount', 10, 2);
            $table->decimal('cgst_percentage', 5, 2)->nullable();
            $table->decimal('sgst_percentage', 5, 2)->nullable();
            $table->decimal('igst_percentage', 5, 2)->nullable();
            $table->decimal('cgst_amount', 10, 2)->default(0);
            $table->decimal('sgst_amount', 10, 2)->default(0);
            $table->decimal('igst_amount', 10, 2)->default(0);
            $table->decimal('total_tax', 10, 2)->default(0);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('round_off', 10, 2)->default(0);
            $table->decimal('final_amount', 10, 2);
            $table->date('date');
            $table->unsignedBigInteger('created_by');
            $table->timestamps();
            
            $table->foreign('challan_id')->references('id')->on('challans')->onDelete('cascade');
            $table->foreign('party_id')->references('id')->on('parties')->onDelete('cascade');
            $table->foreign('quality_id')->references('id')->on('qualities')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};