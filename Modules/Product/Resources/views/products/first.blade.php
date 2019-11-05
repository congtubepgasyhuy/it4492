@extends('layouts.admin_default')
@section('title', trans('product::product.title'))
@section ('before-styles-end')
    <link rel="stylesheet" href="{{ asset('css/product.css') }}"> 
@stop
@section('content')
<section class="content-header">
    <h1>{{trans('product::product.title_add')}}</h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin_home') }}"><i class="fa fa-dashboard"></i> Trang chủ</a></li>
        <li><a href="{{ route('product.product.index') }}">{{ trans('product::product.title') }}</a></li>
        <li class="active">Thay đổi sản phẩm trang chủ</li>
    </ol>
</section>
<section class="content">
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">           
        <div class="box box-primary" style="padding: 10px 25px;">
            <p class="trending">
                <span><i class="fa fa-circle" aria-hidden="true"></i></span> Sản phẩm nổi bật
                <span class="add-top" data-id="0">Chọn</span>
            </p>
            @if ( count($listDataFirst) > 0)
            <div class="row">
                @foreach($listDataFirst as $item)
                <div class="col-md-3">
                    <div class="box-product">
                        <img class="img-product" src="{{ ($item->cover_path != null ) ? $item->cover_path : url('img/fashion.png') }}">
                        <p class="product-name">{{ $item->name }}</p>
                        <p>{{ $item->price }} vnd</p>
                    </div>
                </div>
                @endforeach
            </div>
            @else 
            <p>Chưa có sản phẩm nổi bật</p>
            @endif
            @foreach($listCate as $key => $value)
                <p class="trending">
                    <span><i class="fa fa-circle" aria-hidden="true"></i></span> Top sản phẩm {{ $key }}
                    <span class="add-top" data-id="{{ $key }}">Chọn</span>
                </p>
                @if ( count($listData[$key]) > 0)
                <div class="row">
                    @foreach($listData[$key] as $item)
                    <div class="col-md-3">
                        <div class="box-product">
                            <img class="img-product" src="{{ ($item->cover_path != null ) ? $item->cover_path : url('img/fashion.png') }}">
                            <p class="product-name">{{ $item->name }}</p>
                            <p>{{ $item->price }} vnd</p>
                        </div>
                    </div>
                    @endforeach
                </div>
                @else
                <p>Chưa có sản phẩm nổi bật</p>
                @endif
            @endforeach
        </div>
    </div>
</div>

<div id="modal-add-first" class="modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-body box-add-cate">
                <div class="body table-responsive">
                    {!! Form::open(['method' => 'POST', 'route' => ['product.product.updateChoosen'], 'enctype'=>'multipart/form-data']) !!}
                        <input type="hidden" name="cate_id" id="category_id" />
                        <table id="table-product" class="table table-hover table-bordered txt-center">
                            <thead>
                                <tr class="bg-cyan">
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Loại sản phẩm</th>
                                    {{-- <th>Số lượng</th> --}}
                                    <th>Ảnh</th>
                                    <th>Chọn </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <button class="btn btn-primary btn-sm add-cate" type="submit">Cập nhật</button>
                    {!! Form::close() !!}
                </div>
                <div class="overlay hide">
                    <i class="fa fa-refresh fa-spin"></i>
                </div>
                <input type="hidden" id="data-search">
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
                    url: '{{ route("product.product.getChoose") }}',
                    type: 'get',
                    data: function(d) {
                        d.category_id = $('#data-search').val();
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

            $('.add-top').click(function(){
                var cate_id = $(this).data('id');
                $('#category_id').val(cate_id);
                $('#data-search').val(cate_id);
                table.draw();
                $('#modal-add-first').modal('show');
            });
        });
    </script>
@endsection