<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'region',
        'province',
        'city',
        'barangay',
        'street',
        'district',
        'birth_city',
        'birth_region',
        'birth_province',
    ];

    // 🔗 Relationship: one address can belong to many students
    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function tutors(){
        return $this->hasMany(Tutor::class);
    }

    public function getFullAddressAttribute()
    {
        return collect([
            $this->street,
            $this->barangay,
            $this->city,
            $this->province,
            $this->region,
            $this->zip_code,
        ])->filter()->join(', ');
    }
}
