<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Playlist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $playlists = Playlist::all();
            foreach ($playlists as $playlist) {
                for ($i = 1; $i <= 5; $i++) {
                    Lesson::create([
                        'playlist_id' => $playlist->id,
                        'title' => "Lesson $i for " . $playlist->title,
                        'description' => "This is the description for Lesson $i of " . $playlist->title,
                    ]);
                }
            }
    }
}
