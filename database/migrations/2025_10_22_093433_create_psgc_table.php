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
    // regions
    Schema::create('regions', function (Blueprint $table) {
        $table->string('code')->primary();
        $table->string('name');
        $table->string('short_name')->nullable();
        $table->timestamps();
    });

    // provinces
    Schema::create('provinces', function (Blueprint $table) {
        $table->string('code')->primary();
        $table->string('name');
        $table->string('region_code');
        $table->timestamps();
    });

    // cities
    Schema::create('cities', function (Blueprint $table) {
        $table->string('code')->primary();
        $table->string('name');
        $table->string('region_code');
        $table->string('province_code')->nullable();
        $table->boolean('is_city')->default(true);
        $table->string('city_class')->nullable();
        $table->timestamps();
    });

    // barangays
    Schema::create('barangays', function (Blueprint $table) {
        $table->string('code')->primary();
        $table->string('name');
        $table->string('city_code');
        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regions');
        Schema::dropIfExists('provinces');
        Schema::dropIfExists('cities');
        Schema::dropIfExists('barangays');
    }
};
