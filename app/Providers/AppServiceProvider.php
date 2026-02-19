<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS for all links (CSS, JS, Images) 
        // especially when using tunnels or proxies
        if (env('APP_ENV') !== 'local' || isset($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
            URL::forceScheme('https');
        }
    }
}
