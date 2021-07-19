<?php

namespace App\Http\Controllers;

use App\Models\Source;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    public function index()
    {
        return Source::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'myanimelist_url' => 'required|string',
        ]);
        
        return Source::create($request->all());
    }
    
    public function show($id)
    {
        return Source::find($id);
    }

    public function update(Request $request, $id)
    {
        $source = Source::find($id);
        $source->update($request->all());
        return $source;
    }
    
    public function destroy($id)
    {
        return Source::destroy($id);
    }
}
