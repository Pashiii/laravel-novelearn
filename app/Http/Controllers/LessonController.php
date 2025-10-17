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
        $playlist->loadCount('lesson'); // adds $playlist->lesson_count
        $lessons = $playlist->lesson()->latest()->paginate(9);
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
            $validated['thumb'] = Storage::disk('s3')->url(
                $request->file('thumb')->store('thumbnails', 's3')
            );
        }

        $validated['playlist_id'] = $playlist->id;
        Lesson::create($validated);
        return redirect()->back()->with('success', 'Lesson created successfully!');
    }

    public function destroy(Playlist $playlist, $id) {
        $lesson = $playlist->lesson()->findOrFail($id);
        if ($lesson->thumb && Storage::disk('s3')->exists($lesson->thumb)) {
            Storage::disk('s3')->delete($lesson->thumb);
        }
    

        $lesson->delete();
        return redirect()->route('lesson.index', ['playlist' => $playlist->id] )->with('message', 'Lesson deleted sucessfully!');
    }

    public function update(Request $request, Playlist $playlist, Lesson $lesson){
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string',
            'thumb' => 'nullable|image|max:2040'
        ]);

        if ($request->hasFile('thumb')) {
            if ($lesson->thumb) {
                if(Storage::disk('s3')->exists($lesson->thumb)){
                    Storage::disk('s3')->delete($lesson->thumb);
                };
            }  
            $validated['thumb'] = Storage::disk('s3')->url(
                $request->file('thumb')->store('thumbnails', 's3')
            );        }else{
            $validated['thumb'] = $lesson->thumb;
        }

        $lesson->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'thumb' => $validated['thumb']
        ]);


    }
}
