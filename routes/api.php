<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([
    'prefix' => 'auth',
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::get('logout', 'AuthController@logout');
});

Route::group([
    'middleware' => ['web'],
], function ($router) {
    Route::get('user', 'UserController@index');
    Route::get('user/{id}', 'UserController@getUser');
    Route::post('edituser/{id}', 'UserController@updateUser');
    //Route::post('editgroup/{id}', 'UserController@updateGroup');
    Route::get('delete/{id}', 'UserController@destroy');
    
});
