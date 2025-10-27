<?php

namespace App\Interfaces;

use App\Models\Playlist;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

interface PlaylistRepositoryInterface
{
    public function getAllPlaylistsWithLessonCount(): Collection;
    public function getPlaylistsForUser(User $user): Collection;
    public function findPlaylistById(int $id): ?Playlist;
    public function create(array $data): Playlist;
    public function update(Playlist $playlist, array $data): bool;
    public function delete(Playlist $playlist): bool;
}
