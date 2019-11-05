<?php


namespace App\Models\Shop;


use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}