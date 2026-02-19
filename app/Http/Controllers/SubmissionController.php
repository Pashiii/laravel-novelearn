<?php

namespace App\Http\Controllers;

use App\Models\SubLesson;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
    public function index(Request $request){

    }

    public function store(Request $request){
        $user = Auth::user();
        $request->validate([
            'sub_lesson_id' => 'required|exists:sub_lessons,id',
            'files.*' => 'required|file|max:10240',
            'assessment' => 'required|in:activity,exam',
            'status' => 'required|in:pending,failed,passed',
            'batch_id' => 'required|exists:batches,id'
        ]);
        $studentNumber = $user->student->student_number;

        $submission = Submission::updateOrCreate(
            [
                'student_number' => $studentNumber,
                'sub_lesson_id' => $request->sub_lesson_id,
                'batch_id' => $request->batch_id,
            ],
            [
                'status' => $request->status,
                'assessment' => $request->assessment,
            ]
        );

        if($request->hasFile('files')){
            foreach ($request->file('files') as $file){
                $path = $file->store('submission_files', 's3');
                $submission->files()->create([
                    'file_path' => $path,
                    'file_name' => $file->getClientOriginalName(),
                ]);
            }
        }
    }

    public function update(Request $request, Submission $submission){
        $validated = $request->validate([
            'status' => 'required|in:failed,passed',
        ]);

        $submission->update($validated);

    }


}
