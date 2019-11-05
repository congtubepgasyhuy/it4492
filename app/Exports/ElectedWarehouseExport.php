<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Modules\Product\Entities\ElectedWarehouse;

class ElectedWarehouseExport implements FromView
{
    public function view(): View
    {
        $electeds = ElectedWarehouse::select("*")->with("product")->get();
        return view('product::elected-warehouse.export', compact('electeds'));
    }
}
