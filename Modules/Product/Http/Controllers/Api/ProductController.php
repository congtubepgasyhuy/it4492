<?php

namespace Modules\Product\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Product\Entities\Product;
use Modules\Product\Entities\Category;
use Modules\Product\Entities\Brand;
use Validator;
use Response;
use stdClass;
use Datetime;

class ProductController extends Controller
{
    protected $product;
    protected $category;
    protected $brand;

    public function __construct(Product $product, Category $category, Brand $brand){
        $this->product = $product;
        $this->category = $category;
        $this->brand = $brand;
    }

    public function convertImageHome($listProduct) {
        foreach($listProduct as $key => $item) {
            if ($item->images != null) {
                $listPath = json_decode($item->images);
                $listProduct[$key]->image1 = $listPath[0] ? url($listPath[0]) : null;
                $listProduct[$key]->image2 = $listPath[1] ? url($listPath[1]) : null;
            } else {
                $listProduct[$key]->image1 = null;
                $listProduct[$key]->image2 = null;
            }
        }
        return $listProduct;
    }

    public function convertImage($listProduct) {
        foreach($listProduct as $key => $item) {
            if ($item->images != null) {
                $listPath = json_decode($item->images);
                $newArr = array();
                foreach ($listPath as $key2 => $path) {
                    if ($path) {
                        $newArr[$key2] = url($path);
                    } else {
                        $newArr[$key2] = null;
                    }
                }
                $listProduct[$key]->images = $newArr;
            }
        }
        return $listProduct;
    }

    public function getDetaiProduct(Request $request) {//ok
        try{
            $id = $request->id;
            
            if (!$id) {
                return response()->json(['success' => 500, 'Invalid id']);
            }

            $product = $this->product->getProductById($id);
            if ($product) {
                if ($product->images != null) {
                    $product->images = json_decode($product->images);
                    $arr_path = (array)$product->images;
                    $arr = array();
                    foreach ($arr_path as $key => $path) {
                        if ($path) {
                            $arr[$key] = url($path);
                        } else {
                            $arr[$key] = null;
                        }
                    }
                    $product->images = $arr;
                }

                $category = $this->category->getCategoryById($product->category_id);
                $brand = $this->brand->getBrandById($product->brand_id);
                
                return Response::json([
                    'status' => 200,
                    'result' => $product,
                    'category' => $category,
                    'brand' => $brand
                ]);
            } else {
                return Response::json([
                    'status' => 404,
                    'message' => 'Không tìm thấy dữ liệu'
                ]);
            }
        } catch (\Exception $ex){
            return response()->json(['status' => 403, $ex->getMessage()]);
        }
    }

    public function getProductByCategory(Request $request) {//ok
        // try{
            $cate_id = $request->id;
            if (!$cate_id) {
                return response()->json(['success' => 500, 'Invalid category id']);
            }
            $product = $this->product->getProductByCategory($cate_id);
            $listCate = Category::where('parent_id', $cate_id)
                                ->whereNull('deleted_at')
                                ->get();
           
            if ($product) {
                $product = $this->convertImageHome($product);
                return Response::json([
                    'status' => 200, 
                    'result' => $product,
                    'listCate' => $listCate
                    ]);
            } else {
                return Response::json(['status' => 404, 'message' => 'Không tìm thấy dữ liệu']);
            }
        // } catch (\Exception $ex){
        //     return Response::json(['status' => 500, 'message' => 'Đã có lỗi xảy ra']);
        // }
    }

    public function getProduct(Request $request) {
        try {
            //Params
            $params = $request->all();
            $page = isset($params['page']) ? (int)$params['page'] : 1;
            $pageSize = isset($params['page_size']) ? (int)$params['page_size'] : 12;

            //Sortby
            $sortBy = isset($params['sort_by']) ? $params['sort_by'] : 'created_at';
            $sortType = isset($params['sort_type']) ? $params['sort_type'] : "ASC";
            $result = array();
            $query = Product::with('category', 'brand')
                                ->whereNull('deleted_at');
            $category_id = isset($params['category_id']) ? $params['category_id'] : null;
            if ($category_id != null) {
                $query = $query->whereHas('category', function($q) use ($category_id){
                            $q->where('id', $category_id);
                        });
            }

            $brand_id = isset($params['brand_id']) ? $params['brand_id'] : null;
            if ($brand_id != null) {
                $query = $query->whereHas('brand', function($q) use ($brand_id){
                            $q->where('id', $brand_id);
                        });
            }

            $query = $query->orderby($sortBy, $sortType);
            $listData = $query->paginate($pageSize, ['*'], 'page', $page);
            $listData = $this->convertImageHome($listData);
            if ($listData) {
                return Response::json([
                    'status' => 200,
                    'result' => $listData
                ]);
            } else {
                return Response::json([
                    'status' => 404,
                    'message' => 'Không tìm thấy dữ liệu'
                ]);
            }
        } catch (\Exception $ex) {
            return response()->json(['status' => 403, $ex->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        $name = $request->name;
        $price = $request->price;
        $description = $request->description;
        $category_id = $request->category_id;
        $brand_id = $request->brand_id;
        $created_at = date('Y-m-d H:i:s');

        $validatorArray = [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'brand_id' => 'required',
        ];

        $validator = Validator::make($request->all(), $validatorArray);
        if ($validator->fails()) {
            $message = $validator->errors();
            return response()->json(['status' => 403, 'message' => 'Thiếu trường dữ liệu']);
        }

        $list_img = [];
        if(isset($request->images)){
            foreach ($request->images as $key => $value) {
                $filename = '/img/product/_' . substr(md5('_' . time()), 0, 15) . $key . '.png';
                $path = public_path($filename);
                Image::make($value)->orientate()->save($path);
                array_push($list_img, $filename);
            }

            for ($i = 0; $i < 5; $i++) {
                if (isset($request->images[$i]) && $request->images[$i] !== null) {
                    $filename = '/img/product/_' . substr(md5('_' . time()), 0, 15) . $i . '.png';
                    $path = public_path($filename);
                    Image::make($request->images[$i])->orientate()->save($path);
                    $list_img[$i] = $filename;
                } else {
                    $list_img[$i] = null;
                }
            }
        }

        $array = [
            'name' => $name,
            'price' => $price,
            'description' => $description,
            'brand_id' => $brand_id,
            'category_id' => $category_id,
            'images' => count($list_img) > 0 ? json_encode($list_img) : null,
            'created_at' => $created_at
        ];

        $created = $this->product->insertProduct($array);

        if ($created) {
            return response()->json(['status' => 201, 'message' => 'thêm sản phẩm thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'thêm sản phẩm thất bại']);
        }
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $price = $request->price;
        $description = $request->description;
        $category_id = $request->category_id;
        $brand_id = $request->brand_id;
        $updated_at = date('Y-m-d H:i:s');

        $validatorArray = [
            'id' => 'required',
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'brand_id' => 'required',
        ];

        $validator = Validator::make($request->all(), $validatorArray);
        if ($validator->fails()) {
            $message = $validator->errors();
            return response()->json(['status' => 403, 'message' => 'Thiếu trường dữ liệu']);
        }

        $old_list_image = Product::select('images')->where('id', $id)->get();
        $old_list_image = $old_list_image[0];
        $old_list_image = json_decode($old_list_image->images);

        $list_img = [];
        if(isset($request->images)){
            foreach ($request->images as $key => $value) {
                $filename = '/img/product/_' . substr(md5('_' . time()), 0, 15) . $key . '.png';
                $path = public_path($filename);
                Image::make($value)->orientate()->save($path);
                array_push($list_img, $filename);
            }

            for ($i = 0; $i < 5; $i++) {
                if (isset($request->images[$i]) && $request->images[$i] !== null) {
                    $filename = '/img/product/_' . substr(md5('_' . time()), 0, 15) . $i . '.png';
                    $path = public_path($filename);
                    Image::make($request->images[$i])->orientate()->save($path);
                    $list_img[$i] = $filename;
                } else {
                    $link = $old_list_image[$i];
                    $list_img[$i] = $link;
                }
            }
        } else {
            $list_img = $old_list_image;
        }

        $array = [
            'name' => $name,
            'price' => $price,
            'description' => $description,
            'brand_id' => $brand_id,
            'category_id' => $category_id,
            'images' => count($list_img) > 0 ? json_encode($list_img) : null,
            'updated_at' => $updated_at
        ];

        $updated = $this->product->updateProduct($id, $array);

        if ($updated) {
            return response()->json(['status' => 201, 'message' => 'cập nhật sản phẩm thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'cập nhật sản phẩm thất bại']);
        }
    }

    public function destroy(Request $request)
    {
        if ( !isset($request->id) ) {
            return response()->json(['status' => 403, 'message' => 'Chưa chọn sản phẩm muốn xóa']);
        }

        $id = $request->id;

        $time = date('Y-m-d H:i:s');

        $data = [
            'deleted_at'  => $time
        ];

        $delete_product =  $this->product->updateProduct($id, $data);

        if ($delete_product) {
            return response()->json(['status' => 201, 'message' => 'xóa sản phẩm thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'xóa sản phẩm thất bại']);
        }
    }
}
