<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'middle_name',
        'last_name',
        'date_of_birth',
        'contact_number',
        'email',
        'civil_status',
        'image',
        'address_id',
    ];
    protected $appends = ['full_name'];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function getFullNameAttribute(): string
    {
        if (!empty($this->middle_name)) {
            return "{$this->first_name} " . strtoupper(substr($this->middle_name, 0, 1)) . ". {$this->last_name}";
        }

        return "{$this->first_name} {$this->last_name}";
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    public function batches()
    {
        return $this->hasMany(Batch::class);
    }



}
