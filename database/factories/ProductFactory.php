<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\Modules\Product\Entities\Product::class, function (Faker $faker) {
    return [
        //
        'name' => 'Sản phẩm thứ'.rand(1,1000),
        'price' => rand(1,50)*10000,
        'count' => rand(1,100),
        'admin_id' => 1,
        'material' => 'Vải',
        'description' => 'Mô tả',
        'category_id' => rand(1,3),
    ];
});
