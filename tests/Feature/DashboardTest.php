<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('authenticated admin can visit the dashboard', function () {
    // 1. Arrange: Create a user with the 'admin' role
    $admin = User::factory()->create([
        'role' => 'admin', // Ensure your 'users' table has a 'role' column
        'email_verified_at' => now(), // Required because of your 'verified' middleware
    ]);

    // 2. Act & Assert
    $this->actingAs($admin)
         ->get(route('dashboard'))
         ->assertOk();
});