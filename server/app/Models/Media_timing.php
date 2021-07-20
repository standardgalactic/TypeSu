<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media_timing extends Model
{
    use HasFactory;

    protected $fillable = [
        'line_id',
        'word_position',
        'char_position',
        'image_id',
        'sound_id',
    ];
}
