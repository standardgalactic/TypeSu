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
            'uploaded_by_user_id' => 'required',
            'season' => 'required',
            'episode' => 'required',
        ]);
        
        return Quote::create($request->all());
    }

    public function show($id)
    {
        return Quote::find($id);
    }

    public function search($uploaded_by_user_id) {
        return Quote::where('uploaded_by_user_id', $uploaded_by_user_id);
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
