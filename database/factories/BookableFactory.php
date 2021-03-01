<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bookable;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;

$suffix = [
'Cheap Villa',
'House',
'Colony',
'Flat',
'Room',
'Cheap Rooms',
'Luxury apartment',
'Bangalow',
'Haveli',
'Fancy Rooms',
'Cheap Flat'
];

$factory->define(Bookable::class, function (Faker $faker) use ($suffix){
    return [
        'title' => $faker->city()." ".Arr::random($suffix),
        'description' => $faker->text()
    ];
});
