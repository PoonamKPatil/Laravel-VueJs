<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillables = ['from', 'to'];

    public function bookable()
    {
        return $this->belongsTo(BooKable::class);
    }
}
