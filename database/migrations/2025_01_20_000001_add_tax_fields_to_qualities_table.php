<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('qualities', function (Blueprint $table) {
            $table->decimal('cgst_percentage', 5, 2)->nullable()->after('status');
            $table->decimal('sgst_percentage', 5, 2)->nullable()->after('cgst_percentage');
            $table->decimal('igst_percentage', 5, 2)->nullable()->after('sgst_percentage');
        });
    }

    public function down(): void
    {
        Schema::table('qualities', function (Blueprint $table) {
            $table->dropColumn(['cgst_percentage', 'sgst_percentage', 'igst_percentage']);
        });
    }
};