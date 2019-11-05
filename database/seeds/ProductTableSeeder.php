<?php

use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('categories')->insert([
            'name'     =>  'quần',
            'description'  =>  'quần',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('categories')->insert([
            'name'     =>  'áo',
            'description'  =>  'áo',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('brands')->insert([
            'name'     =>  'Gucci',
            'description'  =>  'Gucci',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('brands')->insert([
            'name'     =>  'D&G',
            'description'  =>  'D&G',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('brands')->insert([
            'name'     =>  'Adidas',
            'description'  =>  'Adidas',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('brands')->insert([
            'name'     =>  'Nike',
            'description'  =>  'Nike',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('products')->insert([
            'category_id' => 1,
            'brand_id' => 1,
            'name'     =>  'Quần jean',
            'description'  =>  'quần bò',
            'price' => '200000',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('products')->insert([
            'category_id' => 1,
            'brand_id' => 2,
            'name'     =>  'Quần âu',
            'description'  =>  'quần vải',
            'price' => '250000',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('products')->insert([
            'category_id' => 2,
            'brand_id' => 3,
            'name'     =>  'Áo khoác',
            'description'  =>  'Áo khoác',
            'price' => '150000',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);

        DB::table('products')->insert([
            'category_id' => 2,
            'brand_id' => 4,
            'name'     =>  'Áo phông',
            'description'  =>  'Áo phông',
            'price' => '150000',
            "created_at" => \Carbon\Carbon::now(),
            "updated_at" => \Carbon\Carbon::now(),
        ]);
    }
}
