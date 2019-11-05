<?php

namespace App\Exports;

use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Modules\Agency\Entities\Agency;
use Modules\Orders\Entities\Orders;

class StatisticalExport implements FromView
{
    public $level;
    public $agency_id;
    public $filer_type;
    public $published_at;

    public function __construct($params)
    {
        $this->level = $params["level"];
        $this->agency_id = $params["agency_id"];
        $this->filer_type = $params["filer_type"];
        $this->published_at = $params["published_at"];
    }

    public function view(): View
    {
        $end_date = Carbon::now("asia/ho_chi_minh")->format('Y-m-d H:i:s');

        $start_date = Carbon::create($end_date)->subDays(11);
        $query = Orders::whereBetween('created_at', array($start_date->toDateTimeString(), $end_date))->orderBy('created_at', 'desc')->where('status', ">=" , Orders::DELIVERED);
        //dd($query);
        if(isset($this->level)){
            $query_level = $query->where('user_level', $this->level);
            $order_current = $query_level->get();
        }if (isset($this->created_at)) {
            $date = explode(' - ', $this->published_at);
            if($date[0] != $date[1]){
                if($this->filer_type == "1"){
                    $start_date = Carbon::create($date[0]);
                    $end_date = Carbon::create($date[1]);
                }else{

                }
            }

        }if(isset($this->agency_id)){
            $agency = Agency::where('id', $this->agency_id)->first();
            //dd($agency);
            $query_current = Orders::whereBetween('created_at', array($start_date, $end_date))->orderBy('created_at', 'desc')->where('created_user_id', $agency->user_id)->where('status', ">=" , Orders::DELIVERED);
            $order_current = $query_current->get();
        }
        return view('statistical::export', [
            'order' => $order_current
        ]);

    }
}
