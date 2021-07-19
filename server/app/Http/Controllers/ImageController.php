<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index()
    {
        return Image::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'imgurl_url' => 'required|string',
            'show_direction' => 'string',
            'cubic_bezier' => 'string',
        ]);
        
        return Image::create($request->all());
    }
    
    public function show($id)
    {
        return Image::find($id);
    }

    public function update(Request $request, $id)
    {
        $image = Image::find($id);
        $image->update($request->all());
        return $image;
    }
    
    public function destroy($id)
    {
        return Image::destroy($id);
    }
}
