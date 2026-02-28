<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Student;
use App\Models\SubLesson;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgressController extends Controller
{
    public function studentProgress(Request $request){
        $user = $request->user();

        $totalCourses = $user->student->batches()
            ->where('status', 1)
            ->count();

        $activitiesSubmitted = Submission::where('student_number', $user->student->student_number)
            ->where('status', 'pending') 
            ->whereIn('batch_id', function ($q) use ($user) {
                $q->select('id')
                    ->from('batches')
                    ->where('status', 1);
            })
            ->count();

        $totalActivitiesInBatch = Batch::where('status', 1)
            ->whereHas('enrollment', function ($q) use ($user) {
                $q->where('student_number', $user->student->student_number);
            })
            ->get()
            ->sum(function ($batch) {
                return SubLesson::whereIn('type', ['exam', 'activity'])
                    ->whereHas('lesson.playlist', function ($q) use ($batch) {
                        $q->where('course_id', $batch->course_id);
                    })
                    ->count();
            });
        $completedActivities = Submission::where('student_number', $user->student->student_number)
            ->whereIn('batch_id', function ($q) use ($user) {
                $q->select('id')
                    ->from('batches')
                    ->where('status', 1)
                    ->whereIn('batch_number', function ($q2) use ($user){
                        $q2->select('batch_number')
                            ->from('enrollments')
                            ->where('student_number', $user->student->student_number);
                    });
            })
            ->whereIn('sub_lesson_id', function ($q) {
                $q->select('id')
                    ->from('sub_lessons')
                    ->whereIn('type', ['exam', 'activity']);
            })
            ->count();
    
        $unfinishedCount = max(0, $totalActivitiesInBatch - $completedActivities);

        $enrolledBatches = $user->student->batches()
            ->with(['playlist.lesson.sublesson'])
            ->get()
            ->map(function ($batch) use ($user) {
                $contents = $batch->playlist->lesson->flatMap->sublesson;

                $submissions = Submission::where('batch_id', $batch->id)
                    ->where('student_number', $user->student->student_number)
                    ->get();


                    return [
                            'id' => $batch->id,
                            'batch_number' => $batch->batch_number,
                            'course_title' => $batch->course_title,
                            'total_activity' => $contents->where('type', 'activity')->count(),
                            'total_exam' => $contents->where('type', 'exam')->count(),
                            'total_passed' => $submissions->where('status', 'passed')->count(),
                            'total_failed' => $submissions->where('status', 'failed')->count(),
                            'total_submitted' => $submissions->count(),
                        ];

            });

            $batch_number = Batch::select('batch_number')->where('status', 1)        
                ->whereHas('enrollment', function ($q) use ($user) {
                    $q->where('student_number', $user->student->student_number);
                })
                ->pluck('batch_number');

        return Inertia::render('StudentProgress/Index', [
            'stats' => [
                'recent_activity_count' => $activitiesSubmitted,
                'unfinished_count' => $unfinishedCount,
                'total_course_count' => $totalCourses,
            ],
            'coursePerformance' => $enrolledBatches,
            'batch_number' => $batch_number,

        ]);
    }

    public function studentPerformance(Request $request, Student $student){
        //query for batch_number
        $selectedBatch = $request->input('batch_number');
        
        //batch_number based on student enrolled
        $batch_number = Batch::select('batch_number')->where('status', 1)        
            ->whereHas('enrollment', function ($q) use ($student) {
                $q->where('student_number', $student->student_number);
            })
            ->pluck('batch_number');

        if(!$selectedBatch){
            return Inertia::render('Student/Performance', [
                'stats' => [],
                'lessonStats' => [],
                'batch_number' => $batch_number,
                'selected_batch' => null,
                'student_id' => $student->id
            ]);
        }
            $batches = $student->batches()
            ->where('batches.batch_number', $selectedBatch)
            ->with(['playlist.lesson.sublesson'])
            ->get();
        
            $stats = $batches->map(function ($batch) use ($student) {

            $contents = $batch->playlist->lesson->flatMap->sublesson;

            $submissions = Submission::where('batch_id', $batch->id)
                ->where('student_number', $student->student_number)
                ->get();

            return [
                'id' => $batch->id,
                'batch_number' => $batch->batch_number,
                'course_title' => $batch->course_title,
                'total_activity' => $contents->where('type', 'activity')->count(),
                'total_exam' => $contents->where('type', 'exam')->count(),
                'total_passed' => $submissions->where('status', 'passed')->count(),
                'total_failed' => $submissions->where('status', 'failed')->count(),
                'total_submitted' => $submissions->count(),
            ];
        });

        $lessonStats = $batches->flatMap(function ($batch) use ($student) {

            return $batch->playlist->lesson->map(function ($lesson) use ($batch, $student) {

                $sublessonIds = $lesson->sublesson->pluck('id');

                $submissions = Submission::where('batch_id', $batch->id)
                    ->where('student_number', $student->student_number)
                    ->whereIn('sub_lesson_id', $sublessonIds) // ✅ FIXED
                    ->get();

                $total = $sublessonIds->count();
                $passed = $submissions->where('status', 'passed')->count();

                $progress = $total > 0
                    ? ($passed / $total) * 100
                    : 0;

                return [
                    'topic' => $lesson->title ?? 'Lesson ' . $lesson->id,
                    'avg_score' => round($progress, 2),
                ];
            });

        })->values();


        return Inertia::render('Student/Performance', [
                    'stats' => $stats,
                    'lessonStats' => $lessonStats,
                    'batch_number' => $batch_number,
                    'selected_batch' => $selectedBatch,
                    'student_id' => $student->id
                ]);
            }
}
