<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class PlaylistController extends Controller
{
    public function index(){
        $playlists = Playlist::withCount('lesson')->get();
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
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'thumb' => 'nullable|file|image|max:3072',
            'hours' => 'required|numeric',
        ]);
    
        if ($request->hasFile('thumb')) {
            $file = $request->file('thumb');
        
            if ($file->isValid()) {
                $validated['thumb'] = Storage::disk('s3')->url(
                    $request->file('thumb')->store('thumbnails', 's3')
                );
            } else {
                return back()->withErrors(['thumb' => 'Uploaded file is invalid']);
            }
        }
        Playlist::create($validated);
    
        return redirect()->route('playlist.index')
            ->with('message', 'Course created successfully!');
    }
    
    public function destroy($id){
        $playlist = Playlist::findOrFail($id);
        if ($playlist->thumb) {
            $path = str_replace(env('AWS_URL') . '/', '', $playlist->thumb);
            if (Storage::disk('s3')->exists($path)) {
                Storage::disk('s3')->delete($path);
            }
        }
        foreach ($playlist->lesson as $lesson) {
            if ($lesson->thumb) {
                $path = str_replace(env('AWS_URL') . '/', '', $lesson->thumb);
                if (Storage::disk('s3')->exists($path)) {
                    Storage::disk('s3')->delete($path);
                }
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
            if ($playlist->thumb) {
                if(Storage::disk('s3')->exists($playlist->thumb)){
                    Storage::disk('s3')->delete($playlist->thumb);
                };
            }  
            $validated['thumb'] = Storage::disk('s3')->url(
                $request->file('thumb')->store('thumbnails', 's3')
            );        
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
