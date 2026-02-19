<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'batch_id',
        'student_id',
        'course_title',
        'hours',
        'issued_at',
        'pdf_path',
    ];

    public function batch(){
        return $this->belongsTo(Batch::class);
    }

    public function student(){
        return $this->belongsTo(Student::class);
    }
}
