<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Playlist\StorePlaylistRequest;
use App\Http\Requests\Playlist\UpdatePlaylistRequest;
use App\Interfaces\PlaylistRepositoryInterface;
use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlaylistController extends Controller
{
    public function __construct(
        protected PlaylistRepositoryInterface $playlistRepository
    ) {}

    public function index()
    {
        $user = Auth::user();
        $playlists = $this->playlistRepository->getAllPlaylistsWithLessonCount();

        return Inertia::render('Playlist/Index', compact('playlists'));
    }

    public function show($id)
    {
        $playlist = $this->playlistRepository->findPlaylistById($id);

        return Inertia::render('Playlist/ViewPlaylist', compact('playlist'));
    }

    public function store(StorePlaylistRequest $request)
    {
        $this->playlistRepository->create($request->validated());

        return redirect()->route('playlist.index')
            ->with('message', 'Course created successfully!');
    }

    public function destroy($id)
    {
        $playlist = $this->playlistRepository->findPlaylistById($id);
        $this->playlistRepository->delete($playlist);
        return redirect()->route('playlist.index')->with('message', 'Playlist deleted sucessfully!');
    }

    public function update(UpdatePlaylistRequest $request, Playlist $playlist)
    {   
        
        $this->playlistRepository->update($playlist, $request->validated());
    }
}
