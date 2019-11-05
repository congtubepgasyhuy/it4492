<?php


namespace App\Models\Shop;


use Illuminate\Database\Eloquent\Model;
use Modules\Core\Models\User;

class Order extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class,'order_product','order_id','product_id');
    }
}