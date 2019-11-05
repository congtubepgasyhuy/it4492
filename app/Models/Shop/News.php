<?php

namespace App\Models\Shop;


use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news';

    public function tags()
    {
        return $this->belongsToMany(News::class,'news_tag','news_id','tag_id');
    }
}