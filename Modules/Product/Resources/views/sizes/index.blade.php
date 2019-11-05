@extends('layouts.admin_default')
@section('title', trans('product::size.title'))
@section ('before-styles-end')
    <link rel="stylesheet" href="{{ asset('css/product.css') }}"> 
@stop
@section ('scripts')
    <script>
        $(function(){
           
        });
    </script>
@stop

@section('content')
<section class="content-header">
    <h1>{{trans('product::size.title')}}</h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin_home') }}"><i class="fa fa-dashboard"></i> Trang chủ</a></li>
        <li class="active">{{ trans('product::size.list_size') }}</li>
    </ol>
</section>
<section class="content">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">           
            <div class="box box-primary" style="padding: 10px 5px;">
                <div class="box-action">
                    <a class="btn btn-primary btn-sm add-cate" href="{{ route('product.size.create') }}">Thêm size cho sản phẩm</a>
                    <a class="btn btn-primary btn-sm add-cate" href="{{ route('product.size.getGoogle') }}">Thêm từ google sheet</a>
                </div>
                <div class="body table-responsive">
                    <table id="table-size" class="table table-hover table-bordered txt-center">
                        <thead>
                            <tr class="bg-cyan">
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                                <th>XL</th>
                                <th>XXL</th>
                                <th>XXXL</th>
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

        // $(function() {
        //     table=$('#table-size').DataTable({
        //         processing: true,
        //         serverSide: true,
        //         bAutoWidth: false,
        //         searching: false,
        //         ajax: {
        //             url: '{{ route("product.size.get") }}',
        //             type: 'get',
        //             data: function(d) {
        //                 {{--d.csrf = '{{csrf_field()}}';--}}
        //             }
        //         },
        //         columns: [
        //             {data: 'id', sortable: true},
        //             {data: 'name', orderable: false},
        //             {data: 'S', sortable: true},
        //             {data: 'M', orderable: true},
        //             {data: 'L', sortable: true},
        //             {data: 'XL', orderable: true},
        //             {data: 'XXL', orderable: true},
        //             {data: 'XXXL', orderable: true},
        //             {data: 'actions', orderable: false}
        //         ],
        //         "order": [[ 0, "desc" ]],
        //         "language": {
        //             "lengthMenu": "Hiển thị _MENU_ bản ghi trên một trang",
        //             "zeroRecords": "Không tìm bản ghi phù hợp",
        //             "info": "Đang hiển thị trang _PAGE_ of _PAGES_",
        //             "infoEmpty": "Không có dữ liệu",
        //             "infoFiltered": "(lọc từ tổng số _MAX_ bản ghi)",
        //             "info": "Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_ kết quả",
        //             "paginate": {
        //                 "previous":   "«",
        //                 "next":       "»"
        //             },
        //             "sProcessing": '<i class="fa fa-spinner fa-pulse fa-fw"></i> Loading'
        //         },
        //         "columnDefs": [
        //         ]
        //     });
        // });

    </script>
@endsection