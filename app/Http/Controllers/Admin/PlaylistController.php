<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Playlist\StorePlaylistRequest;
use App\Http\Requests\Playlist\UpdatePlaylistRequest;
use App\Interfaces\PlaylistRepositoryInterface;
use App\Models\Playlist;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PlaylistController extends Controller
{
    use AuthorizesRequests; 
    public function __construct(
        protected PlaylistRepositoryInterface $playlistRepository
    ) {}

    public function index()
    {
        $user = Auth::user();
        $playlists = $this->playlistRepository->getPlaylistsForUser($user);

        return Inertia::render('Playlist/Index', [
            'playlists' => Inertia::defer(function () use ($playlists) {
                sleep(1); 
                return $playlists;
            }),

        ]);
    }

    public function show($id)
    {
        
        $playlist = $this->playlistRepository->findPlaylistById($id);
        return Inertia::render('Playlist/ViewPlaylist', compact('playlist'));
    }

    public function store(StorePlaylistRequest $request)
    {

        //authorize role
        $this->authorize('create', Playlist::class);

        $this->playlistRepository->create($request->validated());
        // return redirect()->route('playlist.index')
        //     ->with('message', 'Course created successfully!');
    }

    public function destroy($id)
    {
        //authorize role
        $playlist = $this->playlistRepository->findPlaylistById($id);
        $this->authorize('delete', $playlist);


        $this->playlistRepository->delete($playlist);
        return redirect()->route('playlist.index')->with('message', 'Playlist deleted sucessfully!');
    }

    public function update(UpdatePlaylistRequest $request, Playlist $playlist)
    {   
        $this->authorize('update', $playlist);
        $this->playlistRepository->update($playlist, $request->validated());
    }
}
