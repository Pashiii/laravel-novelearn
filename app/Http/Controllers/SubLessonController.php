<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SubLessonController extends Controller
{
    public function index(Lesson $lesson){
        $lesson->load(['playlist', 'sublesson']); 

        return Inertia::render('Lesson/Index', [
            'lesson' => $lesson,
            'sublessons' =>  $lesson->sublesson,
            'playlist' => $lesson->playlist,
        ]);
    }

    public function store(Request $request, Lesson $lesson){

        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'instruction' => 'nullable|string',
            'type' => 'nullable|string',
            'files' => 'nullable|array',
            'thumb' => 'nullable|file|image|max:3072',
            'url' => 'nullable|string',
        ]);

        $uploaded = [];
        if($request->hasFile('files')){
            foreach ($request->file('files') as $file){
                $path = $file->store('sub_lessons', 's3');
                $uploaded[] = Storage::disk('s3')->url($path);
            };
        }

        $finalFiles = array_merge($uploaded, $request->input('files', []));
        $lesson->sublesson()->create([
            'title' => $validated['title'],
            'instruction' => $validated['instruction'] ?? '',
            'files' => json_encode($finalFiles),
            'type' => $validated['type'],
        ]);

        return redirect()->route('sub_lesson.index', ['lesson' => $lesson->id])->with('success', 'Sub lesson created!');

    }
}
