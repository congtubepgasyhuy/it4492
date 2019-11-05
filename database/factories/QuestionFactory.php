<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\Modules\Exams\Entities\Question::class, function (Faker $faker) {
    return [
        'content' => "Câu hỏi thứ " .rand(1,1000) ,
        'level' => rand(\Modules\Exams\Entities\Question::LEVEL_EASY, \Modules\Exams\Entities\Question::LEVEL_HARD),
    ];
});
