<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CandidateController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PositionController;
use Illuminate\Support\Facades\Route;

// Auth (públicas)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Rutas protegidas: requieren token Bearer
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/candidates', [CandidateController::class, 'index']);
    Route::get('/candidates/{id}', [CandidateController::class, 'show']);
    Route::post('/candidates', [CandidateController::class, 'store']);
    Route::put('/candidates/{id}', [CandidateController::class, 'update']);
    Route::delete('/candidates/{id}', [CandidateController::class, 'destroy']);

    Route::get('/positions', [PositionController::class, 'index']);
    Route::get('/positions/{id}', [PositionController::class, 'show']);
    Route::post('/positions', [PositionController::class, 'store']);
    Route::put('/positions/{id}', [PositionController::class, 'update']);
    Route::delete('/positions/{id}', [PositionController::class, 'destroy']);

    Route::get('/dashboard', [DashboardController::class, 'index']);
});
