@extends('layouts.admin_default')
@section('title', 'Quản lý số lượng')
@section ('before-styles-end')
    <link rel="stylesheet" href="{{ asset('css/product.css') }}"> 
@stop

@section('content')
<section class="content-header">
    <h1>Quản lý size, màu sản phẩm</h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin_home') }}"><i class="fa fa-dashboard"></i> Trang chủ</a></li>
        <li><a href="{{ route('product.product.index') }}">{{ trans('product::product.title') }}</a></li>
        <li class="active">Quản lý size, màu</li>
    </ol>
</section>
<section class="content">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">           
            <div class="box box-primary" style="padding: 10px 5px;">
                <div class="box-action">
                    <select class="form-control select2 filter filter-size" name="size_id" id="size">
                        <option value="">--Chọn size--</option>
                        @foreach($listSize as $item)
                            <option value="{{ $item->id }}">{{ $item->size_name }}</option>
                        @endforeach
                    </select>
                    <a class="btn btn-primary btn-sm add-color-product" href="{{ route('product.color.create_amount', $productId) }}">Thêm màu sản phẩm</a>
                    <a class="btn btn-primary btn-sm add-color" href="{{ route('product.color.list_color') }}">Danh sách màu</a>
                </div>
                <div class="body table-responsive">
                    <table id="table-color" class="table table-hover table-bordered txt-center">
                        <thead>
                            <tr class="bg-cyan">
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Loại size</th>
                                <th>Màu</th>
                                {{-- <th>Số lượng</th> --}}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="overlay hide">
                    <i class="fa fa-refresh fa-spin"></i>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection
@section('scripts')
    <script src="{{ asset('admin-lte/plugins/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('admin-lte/plugins/datatables/dataTables.bootstrap.js') }}"></script>
    <script src="{{ asset('js/theory_group.js') }}"></script>
    <script>

        $(function() {
            table = $('#table-color').DataTable({
                processing: true,
                serverSide: true,
                bAutoWidth: false,
                searching: false,
                ajax: {
                    url: '{{ route("product.color.getData") }}',
                    type: 'get',
                    data: function(d) {
                        d.product_id = '{{ $productId }}';
                        d.size_id = $('#size option:selected').val();
                        d.csrf = '{{csrf_field()}}';
                    }
                },
                columns: [
                    {data: 'id', sortable: true},
                    {data: 'product_name', orderable: false},
                    {data: 'size_name', sortable: true},
                    {data: 'color_name', orderable: false},
                    // {data: 'count', sortable: true},
                    {data: 'actions', orderable: false}
                ],
                "order": [[ 0, "desc" ]],
                "language": {
                    "lengthMenu": "Hiển thị _MENU_ bản ghi trên một trang",
                    "zeroRecords": "Không tìm bản ghi phù hợp",
                    "info": "Đang hiển thị trang _PAGE_ of _PAGES_",
                    "infoEmpty": "Không có dữ liệu",
                    "infoFiltered": "(lọc từ tổng số _MAX_ bản ghi)",
                    "info": "Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_ kết quả",
                    "paginate": {
                        "previous":   "«",
                        "next":       "»"
                    },
                    "sProcessing": '<i class="fa fa-spinner fa-pulse fa-fw"></i> Loading'
                },
                "columnDefs": [
                ]
            });

            $('.filter-size').change(function() {
                table.draw();
            });
        });
        
    </script>
@endsection