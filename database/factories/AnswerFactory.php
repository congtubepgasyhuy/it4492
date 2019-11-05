<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\Modules\Exams\Entities\Answer::class, function (Faker $faker) {
    return [
        //
        'content' => 'Đáp án số ' .rand(1,4),
        'correct' =>rand(0,1),
    ];
});
