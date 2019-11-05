<?php


namespace App\Models\Shop;


use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function newses()
    {
        return $this->belongsToMany(News::class,'news_tag','tag_id','news_id');
    }
}