<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class PlaylistController extends Controller
{
    public function index(){
        $playlists = Playlist::all();
        return Inertia::render('Playlist/Index', compact('playlists'));
    }

    public function show($id){
        $playlist = Playlist::findOrFail($id);
        return Inertia::render("Playlist/ViewPlaylist", compact('playlist'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|string|max:100',
            'tutor_id' => 'required|string|max:100',
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'thumb' => 'nullable|file|image|max:3072',
            'hours' => 'required|numeric',
        ]);
    
        if ($request->hasFile('thumb')) {
            $validated['thumb'] = $request->file('thumb')->store('thumbnails', 'public');
        }
    
        Playlist::create($validated);
    
        return redirect()->route('playlist.index')
            ->with('message', 'Course created successfully!');
    }
    
    public function destroy($id){
        $playlist = Playlist::findOrFail($id);
        if ($playlist->thumb && Storage::disk('public')->exists($playlist->thumb)) {
            Storage::disk('public')->delete($playlist->thumb);
        }
        foreach ($playlist->lesson as $lesson) {
            if ($lesson->thumb && Storage::disk('public')->exists($lesson->thumb)) {
                Storage::disk('public')->delete($lesson->thumb);
            }
        }
    
        $playlist->delete();
        return redirect()->route('playlist.index')->with('message', 'Playlist deleted sucessfully!');
    }

    public function update(Request $request, Playlist $playlist){
       $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'hours' => 'required|numeric',
        ]);
        if ($request->hasFile('thumb')) {
            if ($playlist->thumb && Storage::disk('public')->exists($playlist->thumb)) {
                Storage::disk('public')->delete($playlist->thumb);
            }
    
            $validated['thumb'] = $request->file('thumb')->store('thumbnails', 'public');
        } else {
            $validated['thumb'] = $playlist->thumb;
        }
    
        $playlist->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'thumb' => $validated['thumb'],
            'hours' => $validated['hours'],
        ]);  


    }

}
