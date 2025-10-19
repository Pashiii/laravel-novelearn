<?php

namespace App\Repositories;

use App\Interfaces\LessonRepositoryInterface;
use App\Models\Lesson;
use App\Models\Playlist;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
//use Your Model

/**
 * Class LessonRepository.
 */
class LessonRepository implements LessonRepositoryInterface
{
    public function getLessonByPlaylist(Playlist $playlist) : LengthAwarePaginator
    {
        return $playlist->lesson()->latest()->paginate(9);
    }

    public function storeLesson(Playlist $playlist, array $data): Lesson
    {
        if (isset($data['thumb']) && $data['thumb']->isValid()) {
            $data['thumb'] = Storage::disk('s3')->url(
                $data['thumb']->store('thumbnails', 's3')
            );
        }

        $data['playlist_id'] = $playlist->id;

        return Lesson::create($data);
    }

    public function updateLesson(Lesson $lesson, array $data): bool
    {
        if (isset($data['thumb']) && $data['thumb']->isValid()) {
            if($lesson->thumb && Storage::disk('s3')->exists($lesson->thumb)){
                Storage::disk('s3')->delete($lesson->thumb);
            }
   
            $data['thumb'] = Storage::disk('s3')->url(
                $data['thumb']->store('thumbnails', 's3')
            );
        }else {
            $data['thumb'] = $lesson->thumb;
        }

        return $lesson->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'thumb' => $data['thumb'],
        ]);
    }

    public function deleteLesson(Playlist $playlist, $id): bool{
        $lesson = $playlist->lesson()->findOrFail($id);
        if($lesson->thumb && Storage::disk('s3')->exists($lesson->thumb)){
            Storage::disk('s3')->delete($lesson->thumb);
        }

        return $lesson->delete();
    }

}
