<?php

namespace App\Interfaces;

use App\Models\Lesson;
use App\Models\SubLesson;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface SubLessonRepositoryInterface
{
    public function getSubLessonByLesson(Lesson $lesson): LengthAwarePaginator;
    public function storeSubLesson(Lesson $lesson, array $data): SubLesson;

    public function updateSubLesson(SubLesson $subLesson, array $data): bool;
    
    public function deleteSubLesson(Lesson $lesson, $id): bool;
    
    public function findSubLessonById(Lesson $lesson ,int $id):SubLesson;
}
