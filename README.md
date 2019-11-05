# it4492_20191

Deloyment:
	run:
		git clone https://github.com/Pokemon97/it4492_20191.git
		cd it4492_20191
		composer update
		php artisan migrate
		php artisan db:seed --class=ProductTableSeeder
api:
	POST	/api/db/products/products
	GET		/api/db/products/productDetail/{id}
	GET		/api/db/products/categories
	GET		/api/db/products/categoryDetail/{id}
	GET		/api/db/products/brands
	GET		/api/db/products/brandDetail/{id}
	POST	/api/db/products/createProduct
	POST	/api/db/products/updateProduct
	POST	/api/db/products/deleteProduct
	POST	/api/db/products/createCategory
	POST	/api/db/products/updateCategory
	POST	/api/db/products/deleteCategory
	POST	/api/db/products/createBrand
	POST	/api/db/products/updateBrand
	POST	/api/db/products/deleteBrand
