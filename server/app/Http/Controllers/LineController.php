<?php

namespace App\Http\Controllers;

use App\Models\Line;
use Illuminate\Http\Request;

class LineController extends Controller
{
    public function index()
    {
        return Line::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'character_id' => 'required|integer',
            'quote_id' => 'required|integer',
            'line' => 'required|string',
            'is_main' => 'required|boolean',
        ]);
        
        return Line::create($request->all());
    }
    
    public function show($id)
    {
        return Line::find($id);
    }

    public function update(Request $request, $id)
    {
        $line = Line::find($id);
        $line->update($request->all());
        return $line;
    }
    
    public function destroy($id)
    {
        return Line::destroy($id);
    }
}
