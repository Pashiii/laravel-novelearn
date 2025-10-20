<?php

namespace App\Http\Controllers;

use App\Interfaces\SubLessonRepositoryInterface;
use App\Models\Lesson;
use App\Models\SubLesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SubLessonController extends Controller
{

    protected $subLessonRepository;
    public function __construct(SubLessonRepositoryInterface $subLessonRepository){
        $this->subLessonRepository = $subLessonRepository;
    }
    public function index(Lesson $lesson){
        $lesson->load('playlist'); 
        $sublessons = $this->subLessonRepository->getSubLessonByLesson($lesson);
        return Inertia::render('Lesson/Index', [
            'lesson' => $lesson,
            'sublessons' =>  $sublessons,
            'playlist' => $lesson->playlist,
        ]);
    }

    public function store(Request $request, Lesson $lesson){

        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'instruction' => 'nullable|string',
            'type' => 'nullable|string',
            'files' => 'nullable|array',
            'thumb' => 'nullable|file|image|max:3072',
            'url' => 'nullable|string',
        ]);
        $this->subLessonRepository->storeSubLesson($lesson, $validated);

        return redirect()->route('sub_lesson.index', ['lesson' => $lesson->id])->with('success', 'Sub lesson created!');

    }
    public function update(Request $request, Lesson $lesson ,SubLesson $subLesson){
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'instruction' => 'nullable|string',
            'type' => 'nullable|string',
            'files' => 'nullable|array',
            'thumb' => 'nullable|file|image|max:3072',
            'url' => 'nullable|string',
            'deleted_files' => 'nullable|array', 
            'deleted_files.*' => 'integer|exists:sub_lesson_files,id', 
        ]);

        $this->subLessonRepository->updateSubLesson($subLesson,$validated);
    }

    public function destroy(Lesson $lesson, $id){
        $this->subLessonRepository->deleteSubLesson($lesson, $id);
        return redirect()->route("sub_lesson.index", $lesson->id)->with('success' , "Delete Sub Lesson Successfully!");
    }
}
