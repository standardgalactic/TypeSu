<?php

use App\http\Controllers\QuoteController;
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

/// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Quotes routes
    Route::post('/quotes', [QuoteController::class, 'store']);
    Route::put('/quotes/{id}', [QuoteController::class, 'update']);
    Route::delete('/quotes/{id}', [QuoteController::class, 'destroy']);    
});
