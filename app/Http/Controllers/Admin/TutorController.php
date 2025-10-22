<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TutorController extends Controller
{
    public function index(Request $request){
        $search = $request->input('search');


        $teachers = Tutor::query()
        ->when($search, function($query, $search){
            $query->whereRaw("LOWER(first_name || ' ' || middle_name || ' ' || last_name) LIKE ?", ["%{$search}%"]);
        })
        ->select('id', 'image', 'first_name', 'last_name', 'middle_name')
        ->paginate(6)
        ->through(fn ($tutor) =>[
            'id' => $tutor->id,
            'image' => $tutor->image,
            'full_name' => trim("{$tutor->first_name} " . ($tutor->middle_name ? substr($tutor->middle_name, 0, 1) . '. ' : '') . "{$tutor->last_name}"),
        ]);
        
        return Inertia::render('Teacher/Index', [
            'teachers' => $teachers,
            'filters' => [
                'search' => $search
            ],
        ]);
    }

    public function create() {
        return Inertia::render('Teacher/Create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'last_name' => 'required|string|max:100',

            'region' => 'required|string|exists:regions,code',
            'province' => 'required|string|exists:provinces,code',
            'city' => 'required|string|exists:cities,code',
            'barangay' => 'required|string|exists:barangays,code',
            'street' => 'nullable|string|max:100',
            'district' => 'nullable|string|max:100',

            'email' => 'required|string|lowercase|email|max:100|unique:'.User::class,
            'contact_number' => 'required|string|max:13',
            'nationality' => 'required|string|',
            'sex' => 'required|in:male,female',
            'civil_status' => 'required|string',
            'civil_status.*' => 'in:single,married,widowed,divorced,anulled',
            'date_of_birth' => 'required|string|max:100',
            'birth_region' => 'required|string|max:100',
            'birth_province' => 'required|string|max:100',
            'birth_city' => 'required|string|max:100',
            'image' => 'nullable|file|image|max:3072',
        ]);

        $validated['name'] = $validated['first_name'] . (!empty($validated['middle_name'])
        ? Str::lower(Str::substr($validated['middle_name'], 0, 1)) . '. '
        : '') .Str::lower(Str::substr($validated['middle_name'], 0, 1)) . '. ' . 
        $validated['last_name'];


        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('123456'),
            'role' => 'teacher'
        ]);


        $address = Address::create([
            'region' => $validated['region'],
            'province' => $validated['province'],
            'city' => $validated['city'],
            'barangay' => $validated['barangay'],
            'street' => $validated['street'],
            'district' => $validated['district'],
            'birth_city' => $validated['birth_city'],
            'birth_province' => $validated['birth_province'],
            'birth_region' => $validated['birth_region'],
        ]);

        Tutor::create([
            'user_id' => $user->id,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'middle_name' => $validated['middle_name'],
            'date_of_birth' => $validated['date_of_birth'],
            'contact_number' => $validated['contact_number'],
            'email' => $validated['email'],
            'civil_status' => $validated['civil_status'],
            'image' => $validated['image'],
            'address_id' => $address->id,
        ]);

        return redirect()->route('teacher.index')->with('message', "Teacher added successfully!");
    }
}
