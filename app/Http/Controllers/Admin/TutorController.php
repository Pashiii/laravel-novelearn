<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TutorController extends Controller
{
    public function index(Request $request){
        $search = $request->input('search');


        $teachers = Tutor::query()
        ->when($search, function($query, $search){
            $query->whereRaw("LOWER(first_name || ' ' || COALESCE(middle_name, '')  || ' ' || last_name) LIKE ?", ["%{$search}%"]);
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
    public function show(Tutor $tutor){
        $tutor->load('address');

        return Inertia::render('Teacher/ViewTutor', [
            'teacher' => $tutor,
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
            'nationality' => 'required|string|max:100',
            'sex' => 'required|in:male,female',
            'civil_status' => 'required|string',
            'civil_status.*' => 'in:single,married,widowed,divorced,anulled',
            'date_of_birth' => 'required|string|max:100',
            'birth_region' => 'required|string|max:100',
            'birth_province' => 'required|string|max:100',
            'birth_city' => 'required|string|max:100',
            'image' => 'nullable|file|image|max:3072',
        ]);

        $barangay = \App\Models\Barangay::with('city.province.region')->find($validated['barangay']);


        $validated['name'] = $validated['first_name'] . (!empty($validated['middle_name'])
        ? Str::substr($validated['middle_name'], 0, 1) . '. '
        : '') . Str::substr($validated['middle_name'], 0, 1) . '. ' . 
        $validated['last_name'];

        if($request->hasFile('image')){
            if($request->file('image')){
                $validated['image'] = $request->file('image')->store('profile', 's3');
            }
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('123456'),
            'role' => 'teacher'
        ]);


        $address = Address::create([
            'region' => $barangay->city->province->region->name ?? '',
            'province' => $barangay->city->province->name ?? '',
            'city' => $barangay->city->name ?? '',
            'barangay' => $barangay->name ?? '',
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
            'sex' => $validated['sex'],
            'nationality' => $validated['nationality'],
            'image' => $validated['image'],
            'address_id' => $address->id,
        ]);

        return redirect()->route('teacher.index')->with('message', "Teacher added successfully!");
    }

    public function edit(Tutor $tutor){
        $tutor->load('address');

        return Inertia::render('Teacher/UpdateTutor', [
            'teacher' => $tutor,
        ]);
    }

    public function update(Request $request, Tutor $tutor){
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'last_name' => 'required|string|max:100',

            'region' => 'required|string',
            'province' => 'required|string',
            'city' => 'required|string',
            'barangay' => 'required|string',
            'street' => 'nullable|string|max:100',
            'district' => 'nullable|string|max:100',

            // 'email' => 'required|string|lowercase|email|max:100|unique:'.User::class,
            'contact_number' => 'required|string|max:13',
            'nationality' => 'required|string|max:100',
            'sex' => 'required|in:male,female',
            'civil_status' => 'required|string',
            'civil_status.*' => 'in:single,married,widowed,divorced,anulled',
            'date_of_birth' => 'required|string|max:100',
            'birth_region' => 'required|string|max:100',
            'birth_province' => 'required|string|max:100',
            'birth_city' => 'required|string|max:100',
            'image' => 'nullable|file|image|max:3072',
        ]);
        $barangay = \App\Models\Barangay::with('city.province.region')->find($validated['barangay']);


        $validated['name'] = $validated['first_name'] . (!empty($validated['middle_name'])
        ? Str::substr($validated['middle_name'], 0, 1) . '. '
        : '') . Str::substr($validated['middle_name'], 0, 1) . '. ' . 
        $validated['last_name'];

        if($request->hasFile('image')){
            if(Storage::disk('s3')->exists($request->file('image'))){
                Storage::disk('s3')->delete($request->file('image'));
            }
            $validated['image'] = $request->file('image')->store('profile', 's3');
        }
        else{
            $validated['image'] = $tutor->image;
        }

        $address = $tutor->address();
        $tutor->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'middle_name' => $validated['middle_name'],
            'date_of_birth' => $validated['date_of_birth'],
            'contact_number' => $validated['contact_number'],
            'civil_status' => $validated['civil_status'],
            'sex' => $validated['sex'],
            'nationality' => $validated['nationality'],
            'image' => $validated['image'],
        ]);
  
        $address->update([
            'region' => $barangay->city->province->region->name ?? $validated['region'],
            'province' => $barangay->city->province->name ?? $validated['province'],
            'city' => $barangay->city->name ?? $validated['city'],
            'barangay' => $barangay->name ?? $validated['barangay'],
            'street' => $validated['street'],
            'district' => $validated['district'],
            'birth_city' => $validated['birth_city'],
            'birth_province' => $validated['birth_province'],
            'birth_region' => $validated['birth_region'],
        ]);
        
        return redirect()->route('teacher.show',  $tutor->id)->with('message', 'update account successfully!');
    }

    public function destroy(Tutor $tutor){
        if($tutor->image){
            if(Storage::disk('s3')->exists($tutor->image)){
                Storage::disk('s3')->delete($tutor->image);
            }
        }
        $user = $tutor->user();

        $user->delete();        
        $tutor->delete();
        return redirect()->route("teacher.index")->with('success' , "Delete Tutor Successfully!");

    }

}
