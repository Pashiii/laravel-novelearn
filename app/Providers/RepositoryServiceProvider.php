<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Interfaces\PlaylistRepositoryInterface::class,
            \App\Repositories\PlaylistRepository::class
        );
        $this->app->bind(
            \App\Interfaces\LessonRepositoryInterface::class,
            \App\Repositories\LessonRepository::class
        );
        $this->app->bind(
            \App\Interfaces\SubLessonRepositoryInterface::class,
            \App\Repositories\SubLessonRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
