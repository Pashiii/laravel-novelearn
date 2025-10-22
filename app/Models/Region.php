<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $fillable = ['code', 'name', 'short_name'];
    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    public function provinces()
    {
        return $this->hasMany(Province::class, 'region_code', 'code');
    }

    public function cities()
    {
        return $this->hasMany(City::class, 'region_code', 'code');
    }
}
