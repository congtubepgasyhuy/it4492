<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use stdClass;

class Category extends Model
{
    protected $fillable = [];
    protected $table = "categories";

    public function getCategory(){
        $data = Category::whereNull('deleted_at')
                        ->get();
        $listCate = array();
        foreach ($data as $key => $value) {
            $listCate[$key] = array();
            array_push($listCate[$key], $value);
           
            // $itemData = Category::where('status', 0)
            //                     ->where('parent_id', $value->id)
            //                     ->whereNull('deleted_at')
            //                     ->get();
            // foreach ($itemData as $item) {
            //     array_push($listCate[$key], $item);
            // }
        }
        return $listCate;
    }

    public function insertCategory($data){
        return $this->insert($data);
    }

    public function updateCategory($id, $data){
        return $this->where('id', $id)
                    ->update($data);
    }

    public function getCategoryById($id) {
        $data = $this->where('id', $id)->first();
        return $data;
    }

    public function getCategoryList(){
        return $this->whereNull('deleted_at')->get();
    }
    
}
