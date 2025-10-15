<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    protected $fillable = ['course_id','tutor_id', 'title', 'description', 'thumb', 'status', 'hours'];

    public function lesson(){
        return $this->hasMany(Lesson::class);
    }
}
