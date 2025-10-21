<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        // Create 5 sample tutors
        for ($i = 1; $i <= 5; $i++) {


            $firstName = $faker->firstName();
            $middleName = $faker->firstName();
            $lastName = $faker->lastName();
            // 1️⃣ Create a User for the tutor
            $user = User::create([
                'name' => "$firstName " .strtoupper($middleName[0]) .". $lastName ",
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('123456'), // default password
                'role' => 'teacher',
            ]);

            // 2️⃣ Optional: create an address
            $address = Address::create([
                'street' => $faker->streetAddress(),
                'city' => $faker->city(),
                'province' => $faker->state(),
                'district' => $faker->postcode(),
            ]);

            // 3️⃣ Create the tutor
            Tutor::create([
                'user_id' => $user->id,
                'first_name' => $firstName,
                'middle_name' => $middleName,
                'last_name' => $lastName,
                'date_of_birth' => $faker->date('Y-m-d', '1990-01-01'),
                'age' => $faker->numberBetween(25, 60),
                'contact_number' => $faker->phoneNumber(),
                'email' => $user->email,
                'civil_status' => $faker->randomElement(['Single', 'Married', 'Divorced', 'Widowed']),
                'image' => null,
                'address_id' => $address->id,
            ]);
        }
    }
}
