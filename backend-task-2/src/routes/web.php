<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/email/verify/{id}/{hash}', [UserController::class, 'verify'])->name('verification.verify')->middleware(['signed']);
Route::get('/password/reset', [UserController::class, 'resetView'])->name('password.reset');
Route::post('/password/reset', [UserController::class, 'reset'])->name('post.password.reset');
