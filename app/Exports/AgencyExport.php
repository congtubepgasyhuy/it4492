<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Modules\Agency\Entities\Agency;

class AgencyExport implements FromView
{
    public function view(): View
    {
    	$query = Agency::select("agency.*", "users.username as username", "users.phone as phone", "users.address as address", "users.email as email")
            ->whereNull('agency.deleted_at')->join('users','users.id', '=', 'agency.user_id');

        $agencies = $query->get();

        return view('agency::agency.excel', [
            'agencies' => $agencies
        ]);
    }
}
