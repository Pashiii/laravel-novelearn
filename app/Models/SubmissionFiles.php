<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubmissionFiles extends Model
{
    protected $fillable = [
        'submission_id',
        'file_path',
        'file_name',
    ];

    public function submission()
    {
        return $this->belongsTo(Submission::class);
    }
}
