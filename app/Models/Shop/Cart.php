<?php


namespace App\Models\Shop;


use Illuminate\Database\Eloquent\Model;
use Modules\Core\Models\User;

class Cart extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}