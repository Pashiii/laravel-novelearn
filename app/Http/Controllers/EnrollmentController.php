<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function index(){
        $students = Student::all();
        $batches = Batch::where('status', 1)->get();
        return Inertia::render('Enrollment/Index', [
            'students' => $students,
            'batches' => $batches,
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'student_number' => 'required|string|exists:students,student_number',
            'batch_number' => 'required|string|exists:batches,batch_number',
            'course_id' => 'required|string|exists:playlists,course_id',
            'course_title' => 'required|string',
        ]);

 

        $exists = Enrollment::where('student_number', $validated['student_number'])
        ->where('course_id', $validated['course_id'])
        ->where('batch_number', operator: $validated['batch_number'])
        ->exists();

    if ($exists) {
        return response()->json([
            'message' => 'Student already enrolled in this course/batch'
        ], 422);
    }
    Enrollment::create($validated);

    return redirect()->route('enrollment.index')->with('message', 'Enrollment successful');
    }
}
