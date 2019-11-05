<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Modules\Product\Entities\WareHouse;
use Modules\Product\Entities\WarehouseItem;

class ImportWarehouseExport implements FromView
{
    public $id;
    public function __construct($id)
    {
        $this->id = $id;
    }

    public function view(): View
    {
        $warehouses = WarehouseItem::with("product")->where("warehouse_id", $this->id)->get();
        $item = WareHouse::where('id', $this->id)->first();
        if(empty($item)){
            return redirect()->back();
        }
        return view('product::warehouse.import-excel', compact('warehouses', 'item'));
    }
}
