<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('challans', function (Blueprint $table) {
            $table->unsignedBigInteger('quality_id')->nullable()->after('party_id');
            $table->foreign('quality_id')->references('id')->on('qualities')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('challans', function (Blueprint $table) {
            $table->dropForeign(['quality_id']);
            $table->dropColumn('quality_id');
        });
    }
};