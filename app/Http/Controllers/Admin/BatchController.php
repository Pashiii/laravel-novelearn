<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Playlist;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchController extends Controller
{
    public function index(){
        $playlists = Playlist::all(['course_id', 'title']);
        $tutors = Tutor::with('user:id,name')->get(columns: ['id', 'user_id']);
        $batches = Batch::get();

        return Inertia::render('Batch/Index', [
            'playlists' => $playlists,
            'tutors' => $tutors,
            'batches' => Inertia::defer(function () use ($batches) {
                sleep(1); 
                return $batches;
            }),
        ]);
    }

    public function show($id) {
        $batch = Batch::with('tutor:id,first_name,last_name, middle_name', 'enrollment.student')->findOrFail($id);
        $enrolled = $batch->enrollment->pluck('student');
        return Inertia::render('Batch/ViewBatch',[
            'batch' => Inertia::defer(function () use ($batch) {
                    sleep(1); 
                    return $batch;
                }),
            'enrolled' => $enrolled,
        ]);
    }

    public function store(Request $request) {

        $validated = $request->validate([
            'course_id' => 'required|exists:playlists,course_id',
            'batch_number' => 'required|string|max:100|unique:batches,batch_number',
            'tutor_id' => 'required|exists:tutors,id',
            'status' => 'required|in:active,deactive',
            'course_title' => 'required|string|max:100',
            'schedule' => 'required|array',
            'schedule.*' => 'in:Monday,Tuesday,Wednesday,Thursday,Friday',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
        ]);

        $validated['schedule'] = json_encode($validated['schedule']);
        $validated['status'] = $validated['status'] === 'active' ? true : false;

        $batch = Batch::create($validated);
        // return redirect()->back()->with('success', 'Batch created successfully!');
    }

    public function update(Request $request, Batch $batch){

        $validated = $request->validate([
            'course_id' => 'required|exists:playlists,course_id',
            'batch_number' => 'required|string|max:100',
            'tutor_id' => 'required|exists:tutors,id',
            'status' => 'required|in:active,deactive',
            'course_title' => 'required|string|max:100',
            'schedule' => 'required|array',
            'schedule.*' => 'in:Monday,Tuesday,Wednesday,Thursday,Friday',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
        ]);
        
        $validated['schedule'] = json_encode($validated['schedule']);
        $validated['status'] = $validated['status'] === 'active' ? true : false;

        $batch->update($validated);
        
    }
}
