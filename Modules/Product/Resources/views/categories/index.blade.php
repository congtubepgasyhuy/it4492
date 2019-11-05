@extends('layouts.admin_default')
@section('title', trans('product::category.title'))
@section ('before-styles-end')
    <link rel="stylesheet" href="{{ asset('css/product.css') }}"> 
@stop
@section ('scripts')
    <script src="{{ asset('product.js') }}"></script>
    <script>
        $(function(){
            $('.add-cate').click(function(){
                var parent_id = $(this).data("id");
                $('#parent_id').val(parent_id);
            });

            $('.edit-cate').click(function(){
                var cate_id = $(this).data("id");
                var cate_name = $(this).data("name");

                $('#cate_id').val(cate_id);
                $('#cate_name').val(cate_name);

            });

            $('.delete-cate').click(function(){
                var cate_id = $(this).data("id");
                $('#categpry_id').val(cate_id);
            });

            $('.btn_toggle_content').on('click', function() {
                var cate_id = $(this).data("id");
                $('.item-' + cate_id).toggle();
                $(".data-item-" + cate_id).toggleClass('box-close');
            });
        });
    </script>
@stop

@section('content')
<section class="content-header">
    <h1>{{trans('product::category.title')}}</h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin_home') }}"><i class="fa fa-dashboard"></i> Trang chủ</a></li>
        <li class="active">{{trans('product::category.list_category')}}</li>
    </ol>
</section>
<section class="content">
    <div id='flash-container' class='flash-container'>
        Saved.
    </div>
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="box box-primary" style="padding: 20px 30px;">
                <div class="box-action">
                    <button class="btn btn-primary btn-sm add-cate" data-toggle="modal" data-target="#modal-add-category" data-id="0"
                        data-order="0" data-length="{{ count($categories) }}">
                        Thêm thể loại mới
                    </button>
                </div>
                <div class="profile-private main main_lecture">
                    <div class="wrap_main space-box-right">
                        <ol class="content_list my_sortable" id="list-data-course" >
                            @foreach($categories as $cates) 
                            @foreach($cates as $cate)                     
                            <li class="content_item parent-{{ $cate->parent_id ? 1 : 0 }} item-{{ $cate->parent_id }} data-item-{{ $cate->id }}">
                                <div class="a_part_view opened">
                                    <div class="row row-data-part">
                                        <div class="col-md-8 title_view">
                                            <span class="lecture_name"> {{ $cate->cate_name }} </span> 
                                        </div>
                                        <div class="col-md-4">
                                            <div class="pull-right">
                                                @if( $cate->parent_id == 0 )
                                                <span class="icon_buton add_part_button add-cate" data-toggle="modal" data-target="#modal-add-category" data-id="{{ $cate->id }}">
                                                    <i class="fa fa-plus-square" aria-hidden="true" title="Thêm thể loại con"></i>
                                                </span>
                                                @endif
                                                <span class="icon_buton edit-cate" data-toggle="modal" data-target="#modal-edit-category" data-id="{{ $cate->id }}" data-name="{{ $cate->cate_name }}">
                                                    <i class="fa fa-edit" title="Chỉnh sửa"></i>
                                                </span>  
                                                <span class="icon_buton btn_remove delete-cate" data-toggle="modal" data-target="#modal-delete-category" data-id="{{ $cate->id }}">
                                                    <i class="fa fa-trash" title="Xóa"></i>
                                                </span>
                                                @if( $cate->parent_id == 0 )
                                                <span class="icon_buton btn_toggle_content" data-id="{{ $cate->id }}">
                                                    <i class="fa fa-th-list" title="Chi tiết"></i>
                                                </span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            @endforeach
                            @endforeach
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.col -->
    </div>
</section>

<div id="modal-add-category" class="modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body box-add-cate">
                <form action="{{ route('product.category.store') }}" method="POST" name="form-add-cate">
                    <input type="hidden" name="_token" value="{{csrf_token()}}" />
                    <input type="hidden" name="parent_id" id="parent_id" />
                    <div class="title-modal">Thêm danh mục</div>
                    <div class="modal-box">
                        <input class="name-folder" name="cate_name" placeholder="Nhập tên thư mục"> 
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
<div id="modal-edit-category" class="modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body box-add-cate">
                <form action="{{ route('product.category.editcate') }}" method="POST" name="form-edit-cate">
                    <input type="hidden" name="_token" value="{{csrf_token()}}" />
                    <input type="hidden" name="cate_id" id="cate_id" />
                    <div class="title-modal">Sửa tên danh mục</div>
                    <div class="modal-box">
                        <input class="name-folder" id="cate_name" name="cate_name" placeholder="Nhập tên thư mục"> 
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
<div id="modal-delete-category" class="modal fade" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body box-add-cate">
                <form action="{{ route('product.category.deleteCate') }}" method="POST" name="form-delete-cate">
                    <input type="hidden" name="_token" value="{{csrf_token()}}" />
                    <input type="hidden" name="cate_id" id="categpry_id" />
                    <div class="title-modal">Xóa danh mục</div>
                    <div class="modal-box">
                        <p class="delete-confirm">Bạn có chắc chắn muốn xóa danh mục này?</p> 
                        <p class="delete-confirm">( Xóa danh mục cha sẽ xóa toàn bộ danh mục con )</p> 
                        <div class="box-btn">
                            <button class="btn btn-primary btn-sm" type="submit">Đồng ý</button>
                            <button class="btn btn-danger btn-sm" data-dismiss="modal">Hủy</button>
                        </div>      
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection