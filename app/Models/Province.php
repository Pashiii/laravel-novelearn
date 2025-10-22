<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $fillable = ['code', 'name', 'region_code'];
    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    public function region()
    {
        return $this->belongsTo(Region::class, 'region_code', 'code');
    }

    public function cities()
    {
        return $this->hasMany(City::class, 'province_code', 'code');
    }
}
