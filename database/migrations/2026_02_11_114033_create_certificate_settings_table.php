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
        Schema::create('certificate_settings', function (Blueprint $table) {
            $table->id();
            $table->date('event_date')->nullable();
            $table->string('venue')->nullable();
            $table->string('admin_name')->nullable();
            $table->string('mayor_name')->nullable();
            $table->string('background_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificate_settings');
    }
};
