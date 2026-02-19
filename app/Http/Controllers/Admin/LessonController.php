<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lesson\LessonRequest;
use App\Interfaces\LessonRepositoryInterface;
use App\Models\Lesson;
use App\Models\Playlist;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LessonController extends Controller
{
    use AuthorizesRequests; 

    protected $lessonRepository;
    public function __construct(LessonRepositoryInterface $lessonRepository){
        $this->lessonRepository = $lessonRepository;
    }
    public function index(Playlist $playlist, $batchId = null)
    {
        $this->authorize('view', $playlist);

        $playlist->loadCount('lesson'); 
        $lessons = $this->lessonRepository->getLessonByPlaylist($playlist);

        return Inertia::render('Playlist/ViewPlaylist', [
            'playlist' => $playlist,
            'batchId' => $batchId,
            'lessons' => Inertia::defer(function () use ($lessons) {
                sleep(1); 
                return $lessons;
            }),
        ]);
        
    }

    public function store(LessonRequest $request, Playlist $playlist)
    {

        $this->authorize('create', Lesson::class);
        $this->authorize('view', $playlist);
    
        $this->lessonRepository->storeLesson($playlist, $request->validated());

        return redirect()->back()->with('success', 'Lesson created successfully!');
    }

    public function destroy(Playlist $playlist, Lesson $lesson)
    {   
        $this->authorize('update', $lesson);

        $this->lessonRepository->deleteLesson($playlist, $lesson->id);

        return redirect()->route('lesson.index', ['playlist' => $playlist->id])->with('message', 'Lesson deleted sucessfully!');
    }

    public function update(LessonRequest $request, Playlist $playlist, Lesson $lesson)
    {
        $this->authorize('update', $lesson);
        $this->lessonRepository->updateLesson($lesson, $request->validated());
    }
}
