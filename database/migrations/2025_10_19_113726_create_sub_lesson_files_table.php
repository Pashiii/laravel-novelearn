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
        Schema::create('sub_lesson_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sub_lesson_id')->constrained('sub_lessons')->onDelete('cascade');
            $table->string('file_path');
            $table->string('file_name')->nullable();
            $table->string('file_type')->nullable();
            $table->timestamps();
        });

        Schema::table('sub_lessons', function (Blueprint $table) {
            $table->dropColumn('files');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sub_lessons', function (Blueprint $table) {
            $table->string('files')->nullable();
        });
        
        Schema::dropIfExists('sub_lesson_files');
    }
};
