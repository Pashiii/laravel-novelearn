<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebContent extends Model
{
    protected $fillable = [
        'home_description',
        'image1',
        'image2',
        'contact_image',
        'services',
        'services2',
        'address',
        'admin_name',
        'admin_number',
        'skill1',
        'skill2',
        'skill3',
        'skill4',
        'map_url',
    ];
}
