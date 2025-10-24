<?php

use App\Http\Controllers\Admin\BatchController;
use App\Http\Controllers\Admin\LessonController;
use App\Http\Controllers\Admin\PlaylistController;
use App\Http\Controllers\Admin\SubLessonController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\TutorController;
use App\Http\Controllers\PSGCController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //PLAYLIST ROUTES
    Route::get('/playlist', [PlaylistController::class, 'index'])->name('playlist.index');
    Route::get('/playlist/{playlist}', [PlaylistController::class, 'show'])->name('playlist.show');
    Route::post('/playlist', [PlaylistController::class, 'store'])->name('playlist.store');
    Route::delete('/playlist/{id}', [PlaylistController::class, 'destroy'])->name(('playlist.destroy'));
    Route::match(['put', 'post'],'/playlist/{playlist}', [PlaylistController::class, 'update'])->name(('playlist.update'));

    //LESSON ROUTES
    Route::prefix('/playlist/{playlist}')->group(function () {
            Route::get('/lesson', [LessonController::class ,'index'])->name('lesson.index');
            Route::post('/lesson', [LessonController::class, 'store'])->name('lesson.store');
            Route::match(['put','post'],'/lesson/{lesson}', [LessonController::class, 'update'])->name('lesson.update');
            Route::delete('/lesson/{id}',[LessonController::class, 'destroy'])->name('lesson.destroy');
    });

    //SUB LESSON ROUTES
    Route::prefix('/lesson/{lesson}')->group(function(){
        Route::get('/sub_lesson', [SubLessonController::class, 'index'])->name('sub_lesson.index');
        Route::post('/sub_lesson', [SubLessonController::class, 'store'])->name('sub_lesson.store');
        Route::match(['put', 'post'],'/sub_lesson/{subLesson}', [SubLessonController::class, 'update'])->name('sub_lesson.update');
        Route::delete('/sub_lesson/{id}', [SubLessonController::class, 'destroy'])->name('sub_lesson.destroy');
        Route::get('/sub_lesson/{subLesson}', [SubLessonController::class, 'show'])->name('sub_lesson.show');
    });



    //TEACHER ROUTES
    Route::middleware(['role:admin'])->group(function() {
        Route::get('/teachers', [TutorController::class, 'index'])->name('teacher.index');
        Route::get('/teachers/create', [TutorController::class, 'create'])->name('teacher.create');
        Route::post('/teachers', [TutorController::class, 'store'])->name('teacher.store');
        Route::delete('/teachers/{tutor}', [TutorController::class, 'destroy'])->name('teacher.destroy');
    });
    Route::get('/teachers/{tutor}', [TutorController::class, 'show'])->name('teacher.show');
    Route::get('/teachers/edit/{tutor}', [TutorController::class, 'edit'])->name('teacher.edit');
    Route::post('/teachers/edit/{tutor}', [TutorController::class, 'update'])->name('teacher.update');



    //BATCH ROUTES
    Route::get('/batch', [BatchController::class, 'index'])->name('batch.index');
    Route::get('/batch/{id}', [BatchController::class, 'show'])->name('batch.show');
    Route::post('/batch', [BatchController::class, 'store'])->name('batch.store');
    Route::put('/batch/{batch}', [BatchController::class, 'update'])->name(name: 'batch.update');


    //STUDENT ROUTES
    Route::get('/students', [StudentController::class, 'index'])->name('student.index');
    Route::get('/students/create', [StudentController::class, 'create'])->name('student.create');
    Route::post('/students', [StudentController::class, 'store'])->name('student.store');
    Route::get('/students/{student}', [StudentController::class, 'show'])->name('student.show');
    Route::get('/students/edit/{student}', [StudentController::class, 'edit'])->name('student.edit');
    Route::delete('/students/{tutor}', [StudentController::class, 'destroy'])->name('student.destroy');
    Route::post('/students/edit/{student}', [StudentController::class, 'update'])->name('student.update');



    //PSGC ROUTES
    Route::prefix('psgc')->group(function () {
        Route::get('/regions', [PsgcController::class, 'regions']);
        Route::get('/regions/{regionCode}/provinces', [PsgcController::class, 'provinces']);
        Route::get('/provinces/{provinceCode}/cities', [PsgcController::class, 'cities']);
        Route::get('/cities/{cityCode}/barangays', [PsgcController::class, 'barangays']);
        Route::get('/address/{brgyCode}', [PsgcController::class, 'address']);
        Route::get('/full-address/{brgyCode}', [PSGCController::class, 'fullAddress']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
