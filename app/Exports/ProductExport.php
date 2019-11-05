<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Modules\Product\Entities\Product;

class ProductExport implements FromView
{
    public function view(): View
    {
        return view('product::product.excel', [
            'products' => Product::all()
        ]);
    }
}
