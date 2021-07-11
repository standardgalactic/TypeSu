<?php

use App\http\Controllers\QuoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/quotes', [QuoteController::class, 'index']);
Route::get('/quotes/{id}', [QuoteController::class, 'show']);
Route::post('/quotes', [QuoteController::class, 'store']);
Route::put('/quotes/{id}', [QuoteController::class, 'update']);
Route::delete('/quotes/{id}', [QuoteController::class, 'destroy']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
