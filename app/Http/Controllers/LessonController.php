<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index(Playlist $playlist){
        $lessons = $playlist->lesson()->latest()->get();
        return Inertia::render('Playlist/ViewPlaylist', [
            'playlist' => $playlist,
            'lessons' =>  $lessons,
        ]);
    }

    public function store(Request $request, Playlist $playlist){
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string',
            'thumb' => 'nullable|image|max:2040'
        ]);
        if ($request->hasFile('thumb')) {
            $validated['thumb'] = $request->file('thumb')->store('lessons', 'public');
        }

        $validated['playlist_id'] = $playlist->id;
        Lesson::create($validated);
        return redirect()->back()->with('success', 'Lesson created successfully!');
    }

    public function update(Request $request, Playlist $playlist, Lesson $lesson){
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string',
            'thumb' => 'nullable|image|max:2040'
        ]);

        if ($request->hasFile('thumb')) {
            if($lesson->thumb && Storage::disk('public')->exists($lesson->thumb)){
                Storage::disk('public')->delete($lesson->thumb);
            }
            $validated['thumb'] = $request->file('thumb')->store('lessons', 'public');
        }else{
            $validated['thumb'] = $lesson->thumb;
        }

        $lesson->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'thumb' => $validated['thumb']
        ]);


    }
}
