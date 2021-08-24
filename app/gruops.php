<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class gruops extends Model
{
    protected $table = 'gruops';
    public $timestamp = false;
    public function users()
    {
        return $this->belongsToMany('App\User','gruopusers');
    }
}
