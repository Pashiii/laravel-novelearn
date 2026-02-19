<?php

namespace App\Policies;

use App\Models\Playlist;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PlaylistPolicy
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
    public function view(User $user, Playlist $playlist): Response
    {
        if (in_array($user->role, ['admin', 'teacher'])) {
            return Response::allow();
        }

        $student = $user->student;
        if (!$student) {
            return Response::deny('Only students can view this playlist.');
        }

        // Only if enrolled in active batch
        $isEnrolled =  $playlist->batches()
            ->where('status', 1)
            ->whereHas('enrollment', function ($q) use ($student) {
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
        return $this->isAdminOrTeacher(user: $user);

    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Playlist $playlist): bool
    {
        return $this->isAdminOrTeacher($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Playlist $playlist): bool
    {
        return $this->isAdminOrTeacher($user);
    }

        public function updateAny(User $user): bool
    {
        return $this->isAdminOrTeacher($user);    }

    public function deleteAny(User $user): bool
    {
        return $this->isAdminOrTeacher($user);    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Playlist $playlist): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Playlist $playlist): bool
    {
        return false;
    }
}
