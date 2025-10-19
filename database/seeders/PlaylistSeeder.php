<?php

namespace Database\Seeders;

use App\Models\Playlist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaylistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $playlists = [
            [
                'course_id' => 'COURSE-001',
                'title' => 'Introduction to Programming',
                'description' => 'Basics of programming, syntax, and logic building.',
                'hours' => 10,
            ],
            [
                'course_id' => 'COURSE-002',
                'title' => 'Web Development Fundamentals',
                'description' => 'Learn HTML, CSS, and JavaScript fundamentals.',
                'hours' => 15,
            ],
        ];

        foreach ($playlists as $data) {
            Playlist::create($data);
        }
    }
}
