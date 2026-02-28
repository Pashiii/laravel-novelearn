<?php

namespace App\Http\Middleware;

use App\Models\Batch;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckBatchId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $batchId = $request->query('batchId') ?? $request->route('batchId');
        $user = Auth::user();

        // Try to find batch only if exists
        $batch = $batchId ? Batch::find($batchId) : null;

        // If batchId is provided but invalid
        if ($batchId && !$batch) {
            abort(404, 'Batch not found.');
        }

        // ADMIN always allowed
        if ($user->role === 'admin') {
            if ($batch) {
                $request->attributes->set('batch', $batch);
            }
            return $next($request);
        }

        // TEACHER batch is OPTIONAL
        if ($user->role === 'teacher') {
            if ($batch && $batch->tutor_id !== $user->teacher->id) {
                abort(403, 'You are not assigned to this batch.');
            }

            if ($batch) {
                $request->attributes->set('batch', $batch);
            }

            return $next($request);
        }

        // STUDENT batch is REQUIRED
        if ($user->role === 'student') {
            if (!$batch) {
                abort(404, 'Batch ID is required.');
            }

            if ($batch->status != 1 || !$batch->enrollment()
                    ->where('student_number', $user->student->student_number)
                    ->exists()) {abort(403, 'You are not part of this batch. ');
            }

            $request->attributes->set('batch', $batch);

            return $next($request);
        }

        return $next($request);
    }
}
