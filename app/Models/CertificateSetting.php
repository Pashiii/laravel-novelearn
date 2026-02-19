<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CertificateSetting extends Model
{
    protected $fillable = [
        'event_date',
        'venue',
        'admin_name',
        'mayor_name',
        'background_image',
    ];
}
