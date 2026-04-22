<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Middleware;
use App\Http\Controllers\PersonController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/person', [PersonController::class, 'index']);
Route::get('/person/{id}', [PersonController::class, 'show']);
Route::post('/person', [PersonController::class, 'store']);
Route::patch('/person/{id}', [PersonController::class, 'update']);
Route::delete('/person/{id}', [PersonController::class, 'destroy']);