<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = [
        'student_number',
        'lesson_id',
        'sub_lesson_id',
        'batch_id',
        'status',
        'assessment',
    ];

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function student(){
        return $this->belongsTo(Student::class, 'student_number', 'student_number');
    }

    public function lesson(){
        return $this->belongsTo(Lesson::class);
    }

    public function subLesson(){
        return $this->belongsTo(SubLesson::class);
    }

    public function files(){
        return $this->hasMany(SubmissionFiles::class);
    }
}
