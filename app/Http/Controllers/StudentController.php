<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request){

        $search = $request->input('search');


        $students = Student::query()
        ->when($search, function($query, $search){
            $query->whereRaw("LOWER(first_name || ' ' || COALESCE(middle_name, '')  || ' ' || last_name) || student_number LIKE ?", ["%{$search}%"]);
        })
        ->select('id', 'image', 'first_name', 'last_name', 'middle_name', 'student_number')
        ->paginate(6)
        ->through(fn ($student) =>[
            'id' => $student->id,
            'image' => $student->image,
            'student_number' => $student->student_number,
            'full_name' => trim("{$student->first_name} " . ($student->middle_name ? substr($student->middle_name, 0, 1) . '. ' : '') . "{$student->last_name}"),
        ]);
        return Inertia::render('Student/Index', [
            'students' => Inertia::defer(function() use($students) {
                sleep(1); 
                return $students;
            }),
            'filters' => [
                'search' => $search
            ],
        ]);
    }

    public function create(){
        $batches = Batch::where('status', 1)->get();
        $students = Student::all();
        return Inertia::render('Student/Create', [
            'batches' => $batches,
            'students' => $students
        ]);
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

            'education' => 'required|array|min:1',
            'education.*' => 'string|max:100',
            'employment' => 'required|string|in:employed,unemployed',
            'guardian_name' => 'required|string|max:100',
            'guardian_address' => 'required|string|max:100',
            'batch_number' => 'required|string|exists:batches,batch_number',
            'course_id' => 'required|string|exists:playlists,course_id',
            'course_title' => 'required|string|max:100',
            'student_number' => 'required|string|max:100|unique:students,student_number',
            'image' => 'nullable|file|image|max:3072',
        ]);

        //set name for address
        $barangay = \App\Models\Barangay::with('city.province.region')->find($validated['barangay']);

        //fullname
        $validated['name'] = $validated['first_name'] . (!empty($validated['middle_name'])
        ? Str::substr($validated['middle_name'], 0, 1) . '. '
        : '') . Str::substr($validated['middle_name'], 0, 1) . '. ' . 
        $validated['last_name'];

        //set json education
        $validated['education'] = json_encode($validated['education']);

        //for image profile
        if($request->hasFile('image')){
            if($request->file('image')){
                $validated['image'] = $request->file('image')->store('profile', 's3');
            }
        }

        //create user first
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('123456'),
            'role' => 'student'
        ]);

        //create address
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

        //create student with user_id and address_id
        Student::create([
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
            'education' => $validated['education'],
            'employment' => $validated['employment'],
            'guardian_name' => $validated['guardian_name'],
            'guardian_address' => $validated['guardian_address'],
            'student_number' => $validated['student_number'],
            'address_id' => $address->id,
        ]);

        Enrollment::create([
            'batch_number' => $validated['batch_number'],
            'course_id' => $validated['course_id'],
            'course_title' => $validated['course_title'],
            'student_number' => $validated['student_number'],
        ]);

        return redirect()->route('student.index')->with('message', 'Student created successfully!');
    }

    public function show(Student $student){
        $student->load('address');

        return Inertia::render('Student/View', [
            'student' => Inertia::defer(function() use($student) {
                sleep(1); 
                return $student;
            }),        ]);
    }

    public function edit(Student $student){
        $student->load('address');

        return Inertia::render('Student/Update', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, Student $student){
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

            'education' => 'required|array|min:1',
            'education.*' => 'string|max:100',
            'employment' => 'required|string|in:employed,unemployed',
            'guardian_name' => 'required|string|max:100',
            'guardian_address' => 'required|string|max:100',

            'date_of_birth' => 'required|string|max:100',
            'birth_region' => 'required|string|max:100',
            'birth_province' => 'required|string|max:100',
            'birth_city' => 'required|string|max:100',
            'image' => 'nullable|file|image|max:3072',          
        ]);

        //set name for address
        $barangay = \App\Models\Barangay::with('city.province.region')->find($validated['barangay']);

        //fullname
        $validated['name'] = $validated['first_name'] . (!empty($validated['middle_name'])
        ? Str::substr($validated['middle_name'], 0, 1) . '. '
        : '') . Str::substr($validated['middle_name'], 0, 1) . '. ' . 
        $validated['last_name'];

        //set json education
        $validated['education'] = json_encode($validated['education']);

        if($request->hasFile('image')){
            if(Storage::disk('s3')->exists($request->file('image'))){
                Storage::disk('s3')->delete($request->file('image'));
            }
            $validated['image'] = $request->file('image')->store('profile', 's3');
        }
        else{
            $validated['image'] = $student->image;
        }

        $address = $student->address();
        $student->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'middle_name' => $validated['middle_name'],
            'date_of_birth' => $validated['date_of_birth'],
            'contact_number' => $validated['contact_number'],
            'civil_status' => $validated['civil_status'],
            'sex' => $validated['sex'],
            'nationality' => $validated['nationality'],
            'education' => $validated['education'],
            'employment' => $validated['employment'],
            'guardian_name' => $validated['guardian_name'],
            'guardian_address' => $validated['guardian_address'],
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

        return redirect()->route('student.show',  $student->id)->with('message', 'update account successfully!');

    }

    public function destroy(Student $student){
        if($student->image){
            if(Storage::disk('s3')->exists($student->image)){
                Storage::disk('s3')->delete($student->image);
            }
        }
        $user = $student->user();

        $user->delete();        
        $student->delete();
        return redirect()->route("student.index")->with('success' , "Delete Student Successfully!");

    }
}
