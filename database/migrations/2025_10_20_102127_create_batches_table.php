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
        Schema::create('batches', function (Blueprint $table) {
            $table->id();
            $table->string('course_id');
            $table->string('batch_number')->unique();
            $table->foreignId('tutor_id')->constrained('tutors');
            $table->string('course_title');
            $table->json('schedule');
            $table->time('start_time');
            $table->time('end_time');
            $table->boolean('status')->default(true);
            $table->timestamps();

            $table->foreign('course_id')->references('course_id')->on('playlists')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batches');
    }
};
