<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;
    protected $fillable = [
        'playlist_id',
        'title',
        'description',
        'thumb',
    ];

    public function playlist(){
        return $this->belongsTo(Playlist::class);
    }

        public function sublesson(){
        return $this->hasMany(SubLesson::class);
    }
}
