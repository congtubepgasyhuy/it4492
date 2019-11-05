<?php


namespace App\Models\Shop;


use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    public function products()
    {
        return $this->belongsToMany(Size::class,'product_size','size_id','product_id')->withPivot(['count','updated_at']);
    }
}