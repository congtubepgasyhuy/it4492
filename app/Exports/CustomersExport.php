<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Session;
use Maatwebsite\Excel\Concerns\FromView;
use Modules\Orders\Entities\Customer;

class CustomersExport implements FromView
{
    public function view(): View
    {
        $province = (!empty(Session::get('province'))) ? Session::get('province') : "";
        $query = Customer::select("customer.*", "provine.name as province_name")->join('provine', 'provine.id', '=', 'customer.province_id');
        if(!empty($province)){
            $query = $query->where('customer.province_id', $province);
        }
        $customers = $query->get();

        return view('orders::customer.excel', [
            'customers' => $customers
        ]);
    }
}
