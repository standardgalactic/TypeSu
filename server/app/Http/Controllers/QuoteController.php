<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    public function index()
    {
        return Quote::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'source_id' => 'required|integer',
            'reference_in_source' => 'required|string',
        ]);
        
        return Quote::create($request->all());
    }

    public function show($id)
    {
        return Quote::find($id);
    }

    public function search($user_id) {
        return Quote::where('user_id', $user_id);
    }

    public function update(Request $request, $id)
    {
        $quote = Quote::find($id);
        $quote->update($request->all());
        return $quote;
    }
    
    public function destroy($id)
    {
        return Quote::destroy($id);
    }
}
