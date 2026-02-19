<?php

namespace App\Providers;

use App\Models\Lesson;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Playlist;
use App\Models\User;
use App\Policies\LessonPolicy;
use App\Policies\PlaylistPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Playlist::class => PlaylistPolicy::class,
        Lesson::class => LessonPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Gate::define('deleteAny', function (User $user) {
        //     return in_array($user->role, ['admin', 'teacher']);
        // });
        // Gate::define('updateAny', function (User $user) {
        //     return in_array($user->role, ['admin', 'teacher']);
        // });


        // You can also define custom gates here if needed:
        // Gate::define('manage-playlists', fn($user) => $user->role === 'teacher');
    }
}
