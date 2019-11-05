@extends('layouts.admin_default')
@section('title', trans('product::product.title'))
@section ('before-styles-end')
    <link rel="stylesheet" href="{{ asset('css/product.css') }}"> 
@stop
@section('content')
<section class="content-header">
    <h1>{{trans('product::product.title')}}</h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin_home') }}"><i class="fa fa-dashboard"></i> Trang chủ</a></li>
        <li class="active">{{trans('product::product.list_product')}}</li>
    </ol>
</section>
<section class="content">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">           
            <div class="box box-primary" style="padding: 10px 5px;">
                <div class="box-action">
                    <select class="form-control select2 filter filter-cate" name="cate_id" id="category">
                        <option value="">--Loại sản phẩm--</option>
                        @foreach($categories as $cate)
                            <option value="{{ $cate->id }}">{{ $cate->cate_name }}</option>
                        @endforeach
                    </select>
                    <a class="btn btn-primary btn-sm add-cate" href="{{ route('product.product.create') }}">Thêm sản phẩm mới</a>
                </div>
                <div class="body table-responsive">
                    <table id="table-product" class="table table-hover table-bordered txt-center">
                        <thead>
                            <tr class="bg-cyan">
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Loại sản phẩm</th>
                                {{-- <th>Số lượng</th> --}}
                                <th>Ảnh</th>
                                <th>Chất liệu</th>
                                <th>Mô tả</th>
                                <th>Xuất xứ</th>
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
            table = $('#table-product').DataTable({
                processing: true,
                serverSide: true,
                bAutoWidth: false,
                searching: false,
                ajax: {
                    url: '{{ route("product.product.get") }}',
                    type: 'get',
                    data: function(d) {
                        d.category_id = $('#category option:selected').val();
                        d.csrf = '{{csrf_field()}}';
                    }
                },
                columns: [
                    {data: 'id', sortable: true},
                    {data: 'name', orderable: false},
                    {data: 'price', sortable: true},
                    {data: 'cate_name', orderable: false},
                    // {data: 'count', sortable: true},
                    {data: 'cover_path', orderable: false},
                    {data: 'material', orderable: false},
                    {data: 'description', orderable: false},
                    {data: 'source', orderable: false},
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

            $('.filter-cate').change(function() {
                table.draw();
            });
        });
        
    </script>
@endsection