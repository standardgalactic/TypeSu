<?php

namespace App\Http\Controllers;

use App\Models\Media_timing;
use Illuminate\Http\Request;

class MediaTimingController extends Controller
{
    public function index()
    {
        return Media_timing::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'line_id' => 'required|integer',
            'word_position' => 'required|integer',
            'char_position' => 'required|integer',
            'image_id' => 'required|integer',
            'sound_id' => 'integer',
        ]);
        
        return Media_timing::create($request->all());
    }
    
    public function show($id)
    {
        return Media_timing::find($id);
    }

    public function searchName($line_id)
    {
        $media_timings = Media_timing::where('line_id', $line_id)->all();

        if (!$media_timings) {
            return response([
                'message' => 'Not Found.'
            ]);
        }
        
        return $media_timings;
    }

    public function update(Request $request, $id)
    {
        $media_timing = Media_timing::find($id);
        $media_timing->update($request->all());
        return $media_timing;
    }
    
    public function destroy($id)
    {
        return Media_timing::destroy($id);
    }
}
