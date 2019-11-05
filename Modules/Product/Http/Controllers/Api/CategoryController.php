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

class CategoryController extends Controller
{
    protected $product;
    protected $category;
    protected $brand;

    public function __construct(Product $product, Category $category, Brand $brand){
        $this->product = $product;
        $this->category = $category;
        $this->brand = $brand;
    }

    public function getCategories() {//ok
        $categories = $this->category->getCategoryList();
        if ($categories) {
            return Response::json(['status' => 200, 'result' => $categories]);
        } else {
            return Response::json(['status' => 404, 'message' => 'Không tìm thấy dữ liệu']);
        }
    }

    public function getCategoryById(Request $request) {//ok
        try {
            $id = $request->id;
            $category = Category::where('id', $id)->first();
            if ($category) {
                return Response::json(['status' => 200, 'result' => $category]);
            } else {
                return Response::json(['status' => 404, 'message' => 'Không tìm thấy dữ liệu']);
            }
        } catch (\Exception $ex) {
            return Response::json(['status' => 500, 'message' => 'Đã có lỗi xảy ra']);
        }
    }

    public function store(Request $request)
    {
        $name = $request->name;
        $description = $request->description;
        $created_at = date('Y-m-d H:i:s');

        $validatorArray = [
            'name' => 'required',
            'description' => 'required',
        ];

        $validator = Validator::make($request->all(), $validatorArray);
        if ($validator->fails()) {
            $message = $validator->errors();
            return response()->json(['status' => 403, 'message' => 'Thiếu trường dữ liệu']);
        }

        $array = [
            'name' => $name,
            'description' => $description,
            'created_at' => $created_at
        ];

        $created = $this->category->insertCategory($array);

        if ($created) {
            return response()->json(['status' => 201, 'message' => 'thêm danh mục thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'thêm danh mục thất bại']);
        }
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $description = $request->description;
        $updated_at = date('Y-m-d H:i:s');

        $validatorArray = [
            'id' => 'required',
            'name' => 'required',
            'description' => 'required',
        ];

        $validator = Validator::make($request->all(), $validatorArray);
        if ($validator->fails()) {
            $message = $validator->errors();
            return response()->json(['status' => 403, 'message' => 'Thiếu trường dữ liệu']);
        }

        $array = [
            'name' => $name,
            'description' => $description,
            'updated_at' => $updated_at
        ];

        $updated = $this->category->updateCategory($id, $array);

        if ($updated) {
            return response()->json(['status' => 201, 'message' => 'chỉnh sửa danh mục thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'chỉnh sửa danh mục thất bại']);
        }
    }

    public function destroy(Request $request)
    {
        if ( !isset($request->id) ) {
            return response()->json(['status' => 403, 'message' => 'Chưa chọn danh mục muốn xóa']);
        }

        $id = $request->id;

        $time = date('Y-m-d H:i:s');

        $data = [
            'deleted_at'  => $time
        ];

        $deleted =  $this->category->updateCategory($id, $data);

        if ($deleted) {
            return response()->json(['status' => 201, 'message' => 'xóa danh mục thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'xóa danh mục thất bại']);
        }
    }
}
