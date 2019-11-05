<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Modules\Agency\Entities\Agency;
use Modules\Notification\Entities\Notification;

class DebtCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'debt:post';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Push debt';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $query = Agency::with("order.order_item", "user");
        $query = $query->whereHas('order', function ($query) {
            $start = Carbon::now()->startOfMonth();
            $end = Carbon::now()->endOfMonth();
            $query->whereBetween('created_at', array($start, $end));
        });
        $agencys = $query->get();
        $object = [];
        $object_insert = [];
        foreach ($agencys as $agency){
            $item = [];
            $item_insert = [];
            $item_insert["created_id"] = 1;
            $item_insert["to"] = $agency->id;
            $item_insert["title"] = "Công nợ tháng này";
            $item["to"] = $agency->user->token;
            $item["title"] = "Công nợ tháng này";
            $total = 0;
            foreach ($agency->order as $order){
                $total_type_4 = 0;
                foreach ($order->order_item as $order_item){
                    if($order_item->unit == 4){
                        $total_type_4 += $order_item->sell_price * $order_item->amount;
                    }
                }
                $item_total = ($order->total - $total_type_4) * (100 - (int) $order->tax) * (100 - (int) $order->discount) / 10000 + $total_type_4;
                $total += $item_total;
            }
            $item["body"] = number_format($total). " Đ";
            $item_insert["body"] = number_format($total). " Đ";
            $item_insert["created_at"] = Carbon::now();
            array_push($object, $item);
            array_push($object_insert, $item_insert);
        }
        $client = new \GuzzleHttp\Client();
        $headers = [
            'Accept' => 'application/json',
            'Accept-Encoding' => 'gzip, deflate',
            'Content-Type' => 'application/json',
        ];
        $request = $client->post('https://exp.host/--/api/v2/push/send',
            ['json'=> $object
            ]);
        Notification::insert($object_insert);
    }
}
