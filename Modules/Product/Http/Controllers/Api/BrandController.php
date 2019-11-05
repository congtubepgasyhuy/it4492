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

class BrandController extends Controller
{
    protected $product;
    protected $category;
    protected $brand;

    public function __construct(Product $product, Category $category, Brand $brand){
        $this->product = $product;
        $this->category = $category;
        $this->brand = $brand;
    }

    public function getBrands() {//ok
        $brands = $this->brand->getBrandList();
        if ($brands) {
            return Response::json(['status' => 200, 'result' => $brands]);
        } else {
            return Response::json(['status' => 404, 'message' => 'Không tìm thấy dữ liệu']);
        }
    }

    public function getBrandById(Request $request) {//ok
        try {
            $id = $request->id;
            $brand = Brand::where('id', $id)->first();
            if ($brand) {
                return Response::json(['status' => 200, 'result' => $brand]);
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

        $created = $this->brand->insertBrand($array);

        if ($created) {
            return response()->json(['status' => 201, 'message' => 'thêm hãng thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'thêm hãng thất bại']);
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

        $updated = $this->brand->updateBrand($id, $array);

        if ($updated) {
            return response()->json(['status' => 201, 'message' => 'chỉnh sửa hãng thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'chỉnh sửa hãng thất bại']);
        }
    }

    public function destroy(Request $request)
    {
        if ( !isset($request->id) ) {
            return response()->json(['status' => 403, 'message' => 'Chưa chọn hãng muốn xóa']);
        }

        $id = $request->id;

        $time = date('Y-m-d H:i:s');

        $data = [
            'deleted_at'  => $time
        ];

        $deleted =  $this->brand->updateBrand($id, $data);

        if ($deleted) {
            return response()->json(['status' => 201, 'message' => 'xóa hãng thành công']);
        } else {
            return response()->json(['status' => 202, 'message' => 'xóa hãng thất bại']);
        }
    }
}
