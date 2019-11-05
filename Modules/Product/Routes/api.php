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

// Route::middleware('auth:api')->get('/product', function (Request $request) {
//     return $request->user();
// });

Route::group(['namespace' => 'Api'], function () {

    Route::group(['prefix' => 'product'], function () {

        Route::get('/productDetail/{id}', 'ProductController@getDetaiProduct');//ok

        Route::post('/products', 'ProductController@getProduct');//ok

        Route::post('/createProduct', 'ProductController@store');//ok

        Route::post('/updateProduct', 'ProductController@update');//ok

        Route::post('/deleteProduct', 'ProductController@destroy');//ok

        Route::get('/categoryDetail/{id}', 'CategoryController@getCategoryById');//ok

        Route::get('/categories', 'CategoryController@getCategories');//ok

        Route::post('/createCategory', 'CategoryController@store');//ok

        Route::post('/updateCategory', 'CategoryController@update');//ok

        Route::post('/deleteCategory', 'CategoryController@destroy');//ok

        Route::get('/brandDetail/{id}', 'BrandController@getBrandById');//ok

        Route::get('/brands', 'BrandController@getBrands');//ok

        Route::post('/createBrand', 'BrandController@store');//ok

        Route::post('/updateBrand', 'BrandController@update');//ok

        Route::post('/deleteBrand', 'BrandController@destroy');//ok
        
    });
});

