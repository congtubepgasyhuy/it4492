@extends('layouts.admin_default')
@section('title', 'Quản lý số lượng')
@section ('before-styles-end')
    <link rel="stylesheet" href="{{ asset('css/product.css') }}"> 
@stop
@section ('scripts')
    <script>
        $(function(){

            $('.edit-color').click(function(){
                var color_id = $(this).data("id");
                var color_name = $(this).data("name");

                $('#color_id').val(color_id);
                $('#color_name').val(color_name);

            });
        });
    </script>
@stop

@section('content')
<section class="content-header">
    <h1>Quản lý danh sách màu</h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin_home') }}"><i class="fa fa-dashboard"></i> Trang chủ</a></li>
        <li><a href="{{ route('product.product.index') }}">{{ trans('product::product.title') }}</a></li>
        <li class="active">Danh sách màu</li>
    </ol>
</section>
<section class="content">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">           
            <div class="box box-primary" style="padding: 10px 5px;">
                <div class="box-action">
                    <a class="btn btn-primary btn-sm add-color" data-toggle="modal" data-target="#modal-add-color">Thêm mã màu</a>
                </div>
                <div class="body table-responsive">
                    <table id="table-color" class="table table-hover table-bordered txt-center">
                        <thead>
                            <tr class="bg-cyan">
                                <th>Mã màu</th>
                                <th>Tên màu</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($listColor as $item)
                            <tr>
                                <td>{{$item->id}}</td>
                                <td>{{$item->color_name}}</td>
                                <td>
                                    <a type="button" class="btn btn-primary btn-sm edit-color" data-toggle="modal" data-target="#modal-edit-color" data-id="{{$item->id}}" data-name="{{$item->color_name}}">Sửa</a>
                                    <a href="{{ route('product.color.delete', $item->id) }}" onclick="return confirm('Bạn muốn xóa màu này?')" class="btn btn-xs btn-danger">Xoá</i></a>
                                </td>
                            </tr>
                            @endforeach
                            {{ $listColor->links() }}
                        </tbody>
                    </table>
                </div>
                <div class="overlay hide">
                    <i class="fa fa-refresh fa-spin"></i>
                </div>
            </div>
        </div>
    </div>
    <div id="modal-add-color" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body box-add-cate">
                    <form action="{{ route('product.color.create') }}" method="POST" name="form-add-cate">
                        <input type="hidden" name="_token" value="{{csrf_token()}}" />
                        <div class="title-modal">Thêm màu</div>
                        <div class="modal-box">
                            <input class="name-folder" name="color_name" placeholder="Nhập tên màu"> 
                            <div class="box-btn">
                                <button class="btn btn-primary btn-sm" type="submit">Lưu</button>
                                <button class="btn btn-danger btn-sm" data-dismiss="modal">Hủy</button>
                            </div>      
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="modal-edit-color" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body box-add-cate">
                    <form action="{{ route('product.color.update') }}" method="POST" name="form-edit-cate">
                        <input type="hidden" name="_token" value="{{csrf_token()}}" />
                        <input type="hidden" name="color_id" id="color_id" />
                        <div class="title-modal">Sửa tên màu</div>
                        <div class="modal-box">
                            <input class="name-folder" id="color_name" name="color_name" placeholder="Nhập tên màu"> 
                            <div class="box-btn">
                                <button class="btn btn-primary btn-sm" type="submit">Lưu</button>
                                <button class="btn btn-danger btn-sm" data-dismiss="modal">Hủy</button>
                            </div>      
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection