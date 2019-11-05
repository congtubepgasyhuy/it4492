<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("groups")->insert(
            [
                "type" => 0,
                "name" => "admin",
                "created_at" => \Carbon\Carbon::now(),
                "updated_at" => \Carbon\Carbon::now(),
            ]
        );
        DB::table('users')->insert([
            'email'     =>  'admin@admin.com',
            'username'  =>  'admin',
            'password'  =>  bcrypt('123456'),
            'phone'     =>  '0945275567',
            'admin'     =>  '1'
        ]);

        DB::table("roles")->insert(
            [
                "name" => "admin",
                "created_at" => \Carbon\Carbon::now(),
                "updated_at" => \Carbon\Carbon::now(),
            ]
        );

        DB::table("user_groups")->insert(
            [
                "user_id" => 1,
                "group_id" => 1,
                "created_at" => \Carbon\Carbon::now(),
                "updated_at" => \Carbon\Carbon::now(),
            ]
        );

        DB::table("role_users")->insert(
            [
                "user_id" => 1,
                "role_id" => 1,
                "created_at" => \Carbon\Carbon::now(),
                "updated_at" => \Carbon\Carbon::now(),
            ]
        );
    }
}
