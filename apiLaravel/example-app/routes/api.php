<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

$router->group(['prefix'=> 'utente'], function () use ($router) {
    $router->get('profilo/{id_user}', [ App\Http\Controllers\Api\ApiApp::class,'getProfilo']);
    $router->post('login', [App\Http\Controllers\Api\ApiApp::class,'login']);
    $router->post('register', [ App\Http\Controllers\Api\ApiApp::class,'register']);
    $router->post('update', [ App\Http\Controllers\Api\ApiApp::class,'update']);
    $router->post('searchByInterest', [ App\Http\Controllers\Api\ApiApp::class,'searchByInterest']);
    $router->post('registerInterests', [ App\Http\Controllers\Api\ApiApp::class,'registerInterests']);
    $router->get('listaInteressi/{userID}', [ App\Http\Controllers\Api\ApiApp::class,'listInterests']);   
});

