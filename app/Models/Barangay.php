<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    protected $fillable = ['code', 'name', 'city_code'];
    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    public function city()
    {
        return $this->belongsTo(City::class, 'city_code', 'code');
    }
}
