<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubLesson extends Model
{
    use HasFactory;
    protected $fillable = ['lesson_id', 'type', 'title', 'thumb', 'instruction', 'url'];

    public function lesson(){
        return $this->belongsTo(Lesson::class);
    }

    public function files() {
        return $this->hasMany(SubLessonFiles::class);
    }
}
