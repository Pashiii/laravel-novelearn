<?php

namespace App\Interfaces;

use App\Models\Lesson;
use App\Models\Playlist;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface LessonRepositoryInterface
{
    public function getLessonByPlaylist(Playlist $playlist) : LengthAwarePaginator;
    public function storeLesson(Playlist $playlist, array $data) : Lesson;
    public function updateLesson(Lesson $lesson, array $data) : bool;
    public function deleteLesson(Playlist $playlist, $id) : bool;
}
