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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->string('student_number');
            $table->string('course_id');
            $table->string('batch_number');
            $table->string('course_title');
            $table->timestamps();

            $table->foreign('batch_number')->references('batch_number')->on('batches')->onDelete('cascade');
            $table->foreign('course_id')->references('course_id')->on('playlists')->onDelete('cascade');
            $table->foreign('student_number')->references('student_number')->on('students')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
