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
            'quote_id' => 'required|integer',
            'character_id' => 'required|integer',
            'line' => 'required|string',
            'verified' => 'required|boolean',
            'is_main' => 'required|boolean',
        ]);
        
        return Line::create($request->all());
    }
    
    public function show($id)
    {
        return Line::find($id);
    }
    
    public function showQuoteId($quote_id)
    {
        $line = Line::where('quote_id', $quote_id)->all();

        if (!$line) {
            return response([
                'message' => 'Not Found.'
            ]);
        }
        
        return $line;
    }
    
    public function showCharacterId($character_id)
    {
        $line = Line::where('character_id', $character_id)->all();

        if (!$line) {
            return response([
                'message' => 'Not Found.'
            ]);
        }
        
        return $line;
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
