<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Session;
use DB;
use DateTime;

class Product extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'price',
        'images',
        'count',
        'brand_id',
        'category_id',
        'description'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class,'brand_id','id');
    }

    public function getAllProduct(){
        $data = Product::with('category')
                        ->with('brand')
                        // ->where('status', '<>' , -1)
                        ->paginate(20);
        return $data;
    }

    public function insertProduct($data){
        return $this->insert($data);
    }

    public function updateProduct($id, $data){
        return $this->where('id', $id)
                    ->update($data);
    }

    public function getProductById($id){
        return $this->where("id", $id)->first();
    }

    public function getProductFirst(){
        return $this->with('category')
                    ->with('brand')
                    ->whereNull('deleted_at')
                    // ->where('status', 2)
                    ->get();
    }

    public function getProductByCategory($category_id) {
        return Product::with('category')
                    ->whereNull('deleted_at')
                    // ->where('status', '!=' , -1)
                    ->whereHas('category', function($q) use ($category_id){
                            $q->where('id', $category_id);
                        })
                    ->paginate(20);
    }

    public function getProductByBrand($brand_id) {
        return Product::with('category')
                    ->whereNull('deleted_at')
                    // ->where('status', '!=' , -1)
                    ->whereHas('brand', function($q) use ($brand_id){
                            $q->where('id', $brand_id);
                        })
                    ->paginate(20);
    }
  
}
