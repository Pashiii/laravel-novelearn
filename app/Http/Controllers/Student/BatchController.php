<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BatchController extends Controller
{
    public function index(){
        $user = Auth::user();
        $studentNumber = $user->student->student_number;
        $batches = Batch::where('status', 1)
        ->whereHas('enrollment', function($q) use ($studentNumber){
            $q->where('student_number', $studentNumber);
        })
        ->get();

        return Inertia::render('MyBatch/Index', [
            'batches' => $batches
        ]);
    }
}
