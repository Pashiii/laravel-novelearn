<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShortcutController extends Controller
{
    public function index(){
        return Inertia::render('Shortcut/Index');
    }
}
