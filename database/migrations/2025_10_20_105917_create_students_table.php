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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('student_number')->unique();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->date('date_of_birth');
            $table->string('age')->nullable(); 
            $table->string('contact_number')->nullable();
            $table->string('employment')->nullable();
            $table->string('sex')->nullable();
            $table->json('education')->nullable();
            $table->string('email')->unique();
            $table->string('nationality')->nullable();
            $table->string('civil_status');
            $table->string('image')->nullable();
            $table->string('guardian_name');
            $table->string('guardian_address');
            $table->foreignId('address_id')->nullable()->constrained('addresses')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
