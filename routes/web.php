<?php

use App\Http\Controllers\LessonController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\SubLessonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/playlist', [PlaylistController::class, 'index'])->name('playlist.index');
    Route::get('/playlist/{playlist}', [PlaylistController::class, 'show'])->name('playlist.show');
    Route::post('/playlist', [PlaylistController::class, 'store'])->name('playlist.store');
    Route::delete('/playlist/{id}', [PlaylistController::class, 'destroy'])->name(('playlist.destroy'));
    Route::match(['put', 'post'],'/playlist/{playlist}', [PlaylistController::class, 'update'])->name(('playlist.update'));

    Route::prefix('/playlist/{playlist}')->group(function () {
            Route::get('/lesson', [LessonController::class ,'index'])->name('lesson.index');
            Route::post('/lesson', [LessonController::class, 'store'])->name('lesson.store');
            Route::match(['put','post'],'/lesson/{lesson}', [LessonController::class, 'update'])->name('lesson.update');
            Route::delete('/lesson/{id}',[LessonController::class, 'destroy'])->name('lesson.destroy');
    });
    Route::prefix('/lesson/{lesson}')->group(function(){
        Route::get('sub_lesson', [SubLessonController::class, 'index'])->name('sub_lesson.index');
        Route::post('sub_lesson', [SubLessonController::class, 'store'])->name('sub_lesson.store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
