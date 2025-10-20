<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubLessonFiles extends Model
{
    use HasFactory;

    protected $fillable = ['sub_lesson_id', 'file_name', 'file_path'];

    public function subLesson(){
        return $this->belongsTo(SubLesson::class);
    }
}
