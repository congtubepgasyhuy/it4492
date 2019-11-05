<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
             // UserTableSeeder::class,
             // PermissionTableSeeder::class,
            // QuestionTableSeeder::class,
            // TagTableSeeder::class,
            // SizeTableSeeder::class,
            // ProductTableSeeder::class,
        ]);

    }
}
