<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebContentController extends Controller
{
    public function index(){
        return Inertia::render('WebContent/Index',[
            'web_content' => WebContent::first()
        ]);
    }

    public function update(Request $request) {
        $validated = $request->validate([
            'home_description' => 'required|string|max:1000',
            'image1' => 'nullable|image|max:2048',
            'image2' => 'nullable|image|max:2048',
            'skill1' => 'required|string|max:100',
            'skill2' => 'required|string|max:100',
            'skill3' => 'required|string|max:100',
            'skill4' => 'required|string|max:100',
            'services' => 'required|string|max:1000',
            'services2' => 'required|string|max:1000',
            'admin_number' => 'required|string|max:13',
            'admin_name' => 'required|string|max:100',
            'address' => 'required|string|max:100',
            'contact_image' => 'nullable|image|max:2048',
            'map_url' => 'required|string',
        ]);

        $web_content = WebContent::first();
        if($request->hasFile('image1') && $request->hasFile('image2') && $request->hasFile('contact_image')){
            if($web_content){

                $paths = [
                    $web_content->image1,
                    $web_content->image2,
                    $web_content->contact_image,
                ];

                foreach ($paths as $path){
                    if($path && Storage::disk('public')->exists($path)){
                        Storage::disk('public')->delete($path);
                    }
                }
                $validated['image1'] = $request->file('image1')->store('web-content', 'public');
                $validated['image2'] = $request->file('image2')->store('web-content', 'public');
                $validated['contact_image'] = $request->file('contact_image')->store('web-content', 'public');

            }
        }else{
            if($web_content){
                $validated['image1'] = $web_content->image1;
                $validated['image2'] =  $web_content->image2;
                $validated['contact_image'] = $web_content->contact_image;
            }
        }

        WebContent::updateOrCreate(['id' => 1], $validated);

        return back()->with('success', 'Web content saved');
    }

    public function webContent(){
        return Inertia::render('website', [
            'web_content' => WebContent::first(),
        ]);
    }
}
