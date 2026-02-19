<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Certificate;
use App\Models\CertificateSetting;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function settings(){
        return Inertia::render('Certificates/Index', [
            'settings' => CertificateSetting::first(),
            'batches' => Batch::with(
                'playlist:course_id,hours,title'
            )
            ->where('status', 1)
            ->get(['id','course_id','batch_number'])
            ]);
    }

    public function updateSettings(Request $request){
        $validated = $request->validate([
            'event_date' => 'nullable|date',
            'venue' => 'nullable|string',
            'admin_name' => 'nullable|string',
            'mayor_name' => 'nullable|string',
            'background_image' => 'nullable|image|max:2048',
        ]);

        $settings = CertificateSetting::first();
        if ($request->hasFile('background_image')) {
            // Delete old image if exists
            if ($settings && $settings->background_image &&
                Storage::disk('public')->exists($settings->background_image)) {

                Storage::disk('public')->delete($settings->background_image);
            }
            // Store new image
            $validated['background_image'] = $request
                ->file('background_image')
                ->store('certificates', 'public');
        }else {
            if ($settings) {
                $validated['background_image'] = $settings->background_image;
            }
        }

        CertificateSetting::updateOrCreate(['id' => 1], $validated);

        return back()->with('success', 'Settings saved');
    }

    public function batchDetails(Batch $batch){
        $batch->load(['playlist', 'enrollment.student']);

        return response()->json([
            'students' => $batch->enrollment->pluck('student'),
            'course_title' => $batch->playlist->title,
            'hours' => $batch->playlist->hours ?? 40,
        ]);
    }

    public function download(Request $request){
        $validated = $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'student_id' => 'required|exists:students,id',
        ]);

        $batch = Batch::with('playlist')->findOrFail($validated['batch_id']);
        $student = Student::findOrFail($validated['student_id']);
        $settings = CertificateSetting::first();

        $certificate = Certificate::firstOrCreate(
            ['batch_id' => $batch->id, 'student_id' => $student->id],
            [
                'course_title' => $batch->playlist->title,
                'hours' => $batch->playlist->hours,
                'issued_at' => now(),
            ]
            );

            $pdf = Pdf::loadView('certificates.template', [
                'student' => $student,
                'course_title' => $certificate->course_title,
                'hours' => $certificate->hours,
                'event_date' => $settings?->event_date,
                'venue' => $settings?->venue,
                'admin_name' => $settings?->admin_name,
                'mayor_name' => $settings?->mayor_name,
                'background' => $settings?->background_image,
            ])->setPaper('A4', 'portrait');

            return $pdf->stream('certificate-'.$student->id.'.pdf');

    }
}
