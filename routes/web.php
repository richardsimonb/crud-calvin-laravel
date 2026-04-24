<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;

Route::get('/', function () {
    return view('app');
});

Route::get('/person/csv', [PersonController::class, 'exportCSV']);



