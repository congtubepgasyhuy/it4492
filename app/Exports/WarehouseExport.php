<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Modules\Orders\Entities\OrderItems;
use Modules\Orders\Entities\Orders;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;

class WarehouseExport implements FromView, ShouldAutoSize, WithEvents
{
    public $order_id;
    public $item_count;
    public function __construct($id, $item_count)
    {
        $this->order_id = $id;
        $this->item_count = $item_count;
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            BeforeExport::class  => function(BeforeExport $event) {
                $event->writer->setCreator('Patrick');
            },
            AfterSheet::class    => function(AfterSheet $event) {
                $event->sheet->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);

                $event->sheet->styleCells(
                    'A17:N'. (22 + $this->item_count),
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => '00000000'],
                            ],
                        ]
                    ]
                );
                $event->sheet->styleCells(
                    'A'. (19 + $this->item_count) .':N'.(19 + $this->item_count),
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => '00000000'],
                            ],
                        ]
                    ]
                );
                $event->sheet->styleCells(
                    'A'. (20 + $this->item_count) .':N'. (20 + $this->item_count),
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => '00000000'],
                            ],
                        ]
                    ]
                );
                $event->sheet->styleCells(
                    'A'. (21 + $this->item_count) .':N'. (21 + $this->item_count),
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => '00000000'],
                            ],
                        ]
                    ]
                );
                $event->sheet->styleCells(
                    'B17:B18',
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => '00000000'],
                            ],
                        ]
                    ]
                );
                $event->sheet->styleCells(
                    'C17:I17',
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => '00000000'],
                            ],
                        ]
                    ]
                );
                $event->sheet->styleCells(
                    'M17:M18',
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => '00000000'],
                            ],
                        ]
                    ]
                );
                $event->sheet->styleCells(
                    'N17:N18',
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => '00000000'],
                            ],
                        ]
                    ]
                );
                $event->sheet->wrapText(
                    'O17:O18'
                );
                $event->sheet->wrapText(
                    'E18:I18'
                );
                $event->sheet->wrapText(
                    'N17:N18'
                );
                $event->sheet->wrapText(
                    'M17:M18'
                );                
                $event->sheet->setFontSize(
                    'C18:C18',
                    7
                );
                $event->sheet->setFontSize(
                    'J18:J18',
                    7
                );                
                $event->sheet->setFontFamily(
                    'A1:N'. (22 + $this->item_count),
                    'Arial'
                );
                $event->sheet->setFontFamily(
                    'A'. (23 + $this->item_count) .':N'. (41 + $this->item_count),
                    'Arial'
                );
                $event->sheet->columnWidth(
                    'J',
                    50.0
                );
                $event->sheet->columnWidth(
                    'K',
                    50.0
                );
                $event->sheet->columnWidth(
                    'I',
                    100.0
                );
            },
        ];
    }

    public function view(): View
    {
        $order = Orders::where('id', $this->order_id)->first();
        if(empty($order)){
            return redirect()->back();
        }
        $allItems = OrderItems::with('color', 'product')->where('order_id',$this->order_id)->get();
        return view('product::warehouse.export', compact('order', 'allItems'));
    }
}
