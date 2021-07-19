<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    public function index()
    {
        return Character::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string',
            'source_id' => 'required',
        ]);
        
        return Character::create($request->all());
    }
    
    public function show($id)
    {
        return Character::find($id);
    }

    public function update(Request $request, $id)
    {
        $character = Character::find($id);
        $character->update($request->all());
        return $character;
    }
    
    public function destroy($id)
    {
        return Character::destroy($id);
    }
}
