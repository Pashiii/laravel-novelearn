<?php

namespace App\Http\Requests\Playlist;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePlaylistRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'thumb' => 'nullable|file|image|max:3072',
            'hours' => 'required|numeric',
        ];
    }
}
