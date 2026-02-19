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
        Schema::create('web_contents', function (Blueprint $table) {
            $table->id();

            $table->text('home_description')->nullable();
    
            $table->string('image1')->nullable();
            $table->string('image2')->nullable();
            $table->string('contact_image')->nullable();
    
            $table->text('services')->nullable();
            $table->text('services2')->nullable();
    
            $table->string('address')->nullable();
            $table->string('admin_name')->nullable();
            $table->string('admin_number')->nullable();
    
            $table->string('skill1')->nullable();
            $table->string('skill2')->nullable();
            $table->string('skill3')->nullable();
            $table->string('skill4')->nullable();
    
            $table->string('map_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('web_contents');
    }
};
