<?php

namespace App\Repositories;

use App\Interfaces\SubLessonRepositoryInterface;
use App\Models\Lesson;
use App\Models\SubLesson;
use App\Models\SubLessonFiles;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use JasonGuru\LaravelMakeRepository\Repository\BaseRepository;
//use Your Model

/**
 * Class SubLessonRepository.
 */
class SubLessonRepository implements SubLessonRepositoryInterface
{
    public function getSubLessonByLesson(Lesson $lesson): LengthAwarePaginator
    {
        return $lesson->sublesson()->latest()->with('files')->paginate(9);
    }

    public function storeSubLesson(Lesson $lesson, array $data): SubLesson{

        $subLesson = $lesson->sublesson()->create([
            'title' => $data['title'],
            'instruction' => $data['instruction'] ?? '',
            'type' => $data['type'],
        ]);
        if(isset($data['files']) && is_array($data['files'])){
            foreach ($data['files'] as $file){
                if($file instanceof UploadedFile){
                    $path = $file->store('sub_lessons', 's3');
                    $subLesson->files()->create([
                        'file_path' => $path,
                        'file_name' => $file->getClientOriginalName(),
                    ]);
                }
            };
        }
        return $subLesson;
    }

    public function updateSubLesson(SubLesson $subLesson, array $data): bool{
        $subLesson->update([
            'title' => $data['title'] ?? $subLesson->title,
            'instruction' => $data['instruction'] ?? $subLesson->instruction,
            'type' => $data['type'] ?? $subLesson->type,
        ]);
        if (!empty($data['deleted_files'])) {
            foreach ($data['deleted_files'] as $fileId) {
                $file = SubLessonFiles::find($fileId);
                if ($file) {
                    Storage::disk('s3')->delete($file->file_path);
                    $file->delete();
                }
            }
        }
        if(isset($data['files']) && is_array($data['files'])){
            foreach ($data['files'] as $file){
                if($file instanceof UploadedFile){
                    $path = $file->store('sub_lessons', 's3');
                    $subLesson->files()->create([
                        'file_path' => $path,
                        'file_name' => $file->getClientOriginalName(),
                    ]);
                }
            };
        }
        return true;
    }

    public function deleteSubLesson(Lesson $lesson, $id): bool{
        $subLesson = $lesson->sublesson()->findOrFail($id);
        foreach($subLesson->files as $file){
            if(Storage::disk('s3')->exists($file->file_path)){
                Storage::disk('s3')->delete($file->file_path);
            }
            $file->delete();
        }
        return $subLesson->delete();
    }
}
