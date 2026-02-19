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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();

            //student FK
            $table->string('student_number');
            $table->foreign('student_number')
                ->references('student_number')
                ->on('students')
                ->cascadeOnDelete();

            $table->foreignId('batch_id')
                ->constrained('batches')
                ->cascadeOnDelete();

            //sub lesson FK
            $table->foreignId('sub_lesson_id')->constrained('sub_lessons')->onDelete('cascade');


            $table->enum('status', ['pending', 'passed', 'failed'])->default('pending');
            $table->string('assessment')->nullable();
            $table->timestamps();

            $table->unique(['sub_lesson_id', 'batch_id', 'student_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
