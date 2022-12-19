<?php

use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\VerifyCsrfToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post("/register", [UserController::class, "register"]);
Route::post("/login", [UserController::class, "login"]);
Route::post("/reset", [UserController::class, "reset_password"]);

Route::get("/my-tickets/{id}", [TicketController::class, "my_shared"]);

Route::middleware('auth:sanctum')->group(function() {
    Route::get("/logout", [UserController::class, "logout"]);
    Route::get("/tickets", [TicketController::class, "index"]);
    Route::post("/tickets/store", [TicketController::class, "store"]);

});


//
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
