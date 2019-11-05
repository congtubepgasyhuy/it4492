<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use stdClass;

class Brand extends Model
{
    protected $fillable = [];
    protected $table = "brands";

    public function getBrand(){
        $data = Brand::whereNull('deleted_at')
                        ->get();
        $listBrand = array();
        foreach ($data as $key => $value) {
            $listBrand[$key] = array();
            array_push($listBrand[$key], $value);
		}
        return $listBrand;
    }

    public function insertBrand($data){
        return $this->insert($data);
    }

    public function updateBrand($id, $data){
        return $this->where('id', $id)
                    ->update($data);
    }

    public function getBrandById($id) {
        $data = $this->where('id', $id)->first();
        return $data;
    }

    public function getBrandList(){
        return $this->whereNull('deleted_at')->get();
    }
    
}
