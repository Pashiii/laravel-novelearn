<?php

namespace App\Policies;

use App\Models\SubLesson;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SubLessonPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    private function isAdminOrTeacher(User $user): bool
    {
        return in_array($user->role, haystack: ['admin', 'teacher']);
    }

    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, SubLesson $subLesson): Response
    {
        if(in_array($user->role, ['admin', 'teacher'])){
            return Response::allow();
        }

        $student = $user->student;
        if(!$student){
            return Response::deny('Only student can view this lesson');
        }
        $isEnrolled = $subLesson->lesson->playlist->batches()
        ->where('status', 1)
        ->whereHas('enrollment', function ($q) use ($student){
            $q->where('student_number', $student->student_number);
        })
        ->exists();

        return $isEnrolled ? Response::allow() : Response::deny('You are not enrolled in this course');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $this->isAdminOrTeacher($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, SubLesson $subLesson): bool
    {
        return $this->isAdminOrTeacher($user);

    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, SubLesson $subLesson): bool
    {
        return $this->isAdminOrTeacher($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, SubLesson $subLesson): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, SubLesson $subLesson): bool
    {
        return false;
    }
}
