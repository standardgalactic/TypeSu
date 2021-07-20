<?php

use App\http\Controllers\QuoteController;
use App\http\Controllers\LineController;
use App\http\Controllers\CharacterController;
use App\http\Controllers\SourceController;
use App\http\Controllers\MediaTimingController;
use App\http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/// Public Routes

// Register
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Quotes
Route::get('/quotes', [QuoteController::class, 'index']);
Route::get('/quotes/{id}', [QuoteController::class, 'show']);

// Lines
Route::get('/lines', [LineController::class, 'index']);
Route::get('/lines/{id}', [LineController::class, 'show']);
Route::get('/lines/{quote_id}', [LineController::class, 'showQuoteId']);
Route::get('/lines/{character_id}', [LineController::class, 'showCharacterId']);

// Characters
Route::get('/characters', [CharacterController::class, 'index']);
Route::get('/characters/{id}', [CharacterController::class, 'show']);
Route::get('/characters/{name}', [CharacterController::class, 'showName']);

// Sources
Route::get('/sources', [SourceController::class, 'index']);
Route::get('/sources/{id}', [SourceController::class, 'show']);

// Media Timings
Route::get('/media_timings/{id}', [MediaTimingController::class, 'show']);
Route::get('/media_timings/{line_id}', [MediaTimingController::class, 'show']);

// Sounds
Route::get('/sounds', [SoundController::class, 'index']);
Route::get('/sounds/{id}', [SoundController::class, 'show']);

// Images
Route::get('/images', [SoundController::class, 'index']);
Route::get('/images/{id}', [SoundController::class, 'show']);

/// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Quotes routes
    Route::post('/quotes', [QuoteController::class, 'store']);
    Route::put('/quotes/{id}', [QuoteController::class, 'update']);
    Route::delete('/quotes/{id}', [QuoteController::class, 'destroy']);    
});
