<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    protected $fillable = [
        'course_id',
        'batch_number',
        'tutor_id',
        'course_title',
        'schedule',
        'start_time',
        'end_time',
        'status',
    ];
    protected $casts = [
        'schedule' => 'array',
        'status' => 'boolean',
    ];

    public function playlist()
    {
        return $this->belongsTo(Playlist::class, 'course_id', 'course_id');
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }



}
