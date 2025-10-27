<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'student_number',
        'first_name',
        'middle_name',
        'last_name',
        'date_of_birth',
        'contact_number',
        'employment',
        'sex',
        'nationality',
        'education',
        'email',
        'civil_status',
        'image',
        'guardian_name',
        'guardian_address',
        'address_id',
    ];

    protected $casts = [
        'education' => 'array',
        'date_of_birth' => 'date',
    ];

    protected $appends = ['full_name'];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function enrollment(){
        return $this->hasMany(Enrollment::class, 'student_number', 'student_number');
    }
    public function batches()
{
    return $this->belongsToMany(Batch::class, 'enrollment');
}

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->middle_name} {$this->last_name}";
    }


}
