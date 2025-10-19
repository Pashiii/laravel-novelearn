<?php

namespace App\Repositories;

use App\Models\Playlist;
use App\Interfaces\PlaylistRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

//use Your Model

/**
 * Class PlaylistRepository.
 */
class PlaylistRepository implements PlaylistRepositoryInterface
{
    public function getAllPlaylistsWithLessonCount() : Collection
    {
        return Playlist::withCount('lesson')->get();
    }
    public function findPlaylistById(int $id) : ?Playlist
    {
        return Playlist::findOrFail($id);
    }
    public function create(array $data, $thumb = null) : Playlist
    {
        if ($data['thumb']) {
            $data['thumb'] = Storage::disk('s3')->url(
                $data['thumb']->store('thumbnails', 's3')
            );
        }
        return Playlist::create($data);
    }
    public function update(Playlist $playlist, array $data, $thumb = null) : bool
    {
        if ($data['thumb']) {
                if ($playlist->thumb) {
                    $path = str_replace(env('AWS_URL') . '/', '', $playlist->thumb);
                    if (Storage::disk('s3')->exists($path)) {
                        Storage::disk('s3')->delete($path);
                    }
                }
                $data['thumb'] = Storage::disk('s3')->url(
                    $data['thumb']->store('thumbnails', 's3')
                );
        }
        return $playlist->update($data);
    }
    public function delete(Playlist $playlist): bool
    {
        if( $playlist->thumb) {
            $path = str_replace(env('AWS_URL') . '/', '', $playlist->thumb);
            if (Storage::disk('s3')->exists($path)) {
                Storage::disk('s3')->delete($path);
            }
        }
        foreach ($playlist->lesson as $lesson){
            if($lesson->thumb){
                $path = str_replace(env('AWS_URL') . '/', '', $playlist->thumb);
                if (Storage::disk('s3')->exists($path)) {
                Storage::disk('s3')->delete($path);
            } 
            }
        }
        return $playlist->delete();
    }
}
