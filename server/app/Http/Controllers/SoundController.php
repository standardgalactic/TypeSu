<?php

namespace App\Http\Controllers;

use App\Models\Sound;
use Illuminate\Http\Request;

class SoundController extends Controller
{
    public function index()
    {
        return Sound::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'vocaroo_url' => 'required|string',
        ]);
        
        return Sound::create($request->all());
    }
    
    public function show($id)
    {
        return Sound::find($id);
    }

    public function update(Request $request, $id)
    {
        $sound = Sound::find($id);
        $sound->update($request->all());
        return $sound;
    }
    
    public function destroy($id)
    {
        return Sound::destroy($id);
    }
}
