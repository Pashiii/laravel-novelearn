<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = [
        'student_number',
        'course_id',
        'batch_number',
        'course_title',
    ];

    public function playlist(){
        return $this->belongsTo(Playlist::class, 'course_id', 'course_id');
    }

    public function batch()
    {
        return $this->belongsTo(Batch::class, 'batch_number', 'batch_number');
    }

    public function student(){
        return $this->belongsTo(Student::class, 'student_number', 'student_number');
    }

    
}
