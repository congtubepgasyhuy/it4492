<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Modules\Orders\Entities\Orders;

class OrderExport implements FromView
{
    public function view(): View
    {
        return view('orders::order.excel', [
            'orders' => Orders::all()
        ]);
    }
}
