<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\SubLessonRepositoryInterface;
use App\Models\Batch;
use App\Models\Lesson;
use App\Models\Playlist;
use App\Models\SubLesson;
use App\Models\Submission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SubLessonController extends Controller
{
    use AuthorizesRequests; 

    protected $subLessonRepository;
    public function __construct(SubLessonRepositoryInterface $subLessonRepository){
        $this->subLessonRepository = $subLessonRepository;
    }
    public function index(Playlist $playlist, Lesson $lesson, $batchId = null){
        $this->authorize('view', $lesson);
        $lesson->load('playlist'); 
        $sublessons = $this->subLessonRepository->getSubLessonByLesson($lesson);
        return Inertia::render('Lesson/Index', [
            'lesson' => $lesson,
            'batchId' => $batchId,
            'sublessons' => Inertia::defer(function () use ( $sublessons) {
                sleep(1);
                return $sublessons;
            }),
            'playlist' => $lesson->playlist,
        ]);
    }

    public function show(Playlist $playlist, Lesson $lesson, SubLesson $subLesson, $batchId = null){
        $user = Auth::user();
        $role = $user->role;
        $subLesson = $this->subLessonRepository->findSubLessonById($lesson,$subLesson->id,);
        
        if($role === 'student' && !$batchId){
            return redirect()->route('playlist.index');
        }

        $this->authorize('view', $subLesson);


        $submission = null;
        $submissions = [];
        if ($role === 'student') {
            $studentNumber = $user->student->student_number;
    
            $submission = Submission::with('files')
                ->where('student_number', $studentNumber)
                ->where('sub_lesson_id', $subLesson->id)
                ->where('batch_id', $batchId)
                ->first();
        }

        if (in_array($role, ['teacher'])) {
            $submissions = Submission::with(['files', 'student'])
                ->where('sub_lesson_id', $subLesson->id)
                ->where('batch_id', $batchId)
                ->latest()
                ->get();
        }
    
        return Inertia::render('SubLesson/Index', [
            'subLesson' => $subLesson,
            'submission' => $submission,  // null for non-students
            'playlist_id' => $playlist->id,
            'lesson_id' => $lesson->id,
            'submissions' => $submissions,
            'batchId' => $batchId,
            'auth' => [
                'user' => $user,
            ],
        ]);;
    }

    public function store(Request $request, Playlist $playlist,Lesson $lesson){

        $this->authorize('create', SubLesson::class);

        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'instruction' => 'nullable|string',
            'type' => 'nullable|string',
            'files' => 'nullable|array',
            'thumb' => 'nullable|file|image|max:3072',
            'url' => 'nullable|string',
        ]);
        $this->subLessonRepository->storeSubLesson($lesson, $validated);

        return redirect()->route('sub_lesson.index', ['playlist' => $playlist->id ,'lesson' => $lesson->id])->with('success', 'Sub lesson created!');

    }
    public function update(Request $request, Playlist $playlist, Lesson $lesson ,SubLesson $subLesson){
        $this->authorize('update', $subLesson);
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

    public function destroy(Playlist $playlist, Lesson $lesson, $id){
        $this->authorize('delete');
        $this->subLessonRepository->deleteSubLesson($lesson, $id);
        return redirect()->route("sub_lesson.index", ['playlist' => $playlist->id,'lesson' => $lesson->id])->with('success' , "Delete Sub Lesson Successfully!");
    }
}
