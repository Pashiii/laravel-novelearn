<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(){
        $messages = Message::get();
        return Inertia::render('Message/Index', [
            'messages' => $messages
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string',
            'number' => 'required|string|max:13',
            'message' => 'required|string|max:100',
        ]);
        Message::create( $validated);
    }

    public function update(Request $request, Message $message){
        $message->read_message = 1;
        $message->save();

        return back();
    }

    public function destroy(Request $request, Message $message){
        $message->delete();

        return back();
    }
}
