@extends('layouts.admin_default')
@section('title', 'Quản lý số lượng')
@section ('before-styles-end')
    <link rel="stylesheet" href="{{ asset('css/product.css') }}"> 
@stop
@section('content')
<section class="content-header">
    <h1>Thêm màu, size cho sản phẩm</h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin_home') }}"><i class="fa fa-dashboard"></i> Trang chủ</a></li>
        <li><a href="{{ route('product.product.index') }}">{{ trans('product::product.title') }}</a></li>
        <li><a href="{{ route('product.color.get', $productId) }}">Quản lý số lượng</a></li>
        <li class="active">Thêm</li>
    </ol>
</section>
<section class="content">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">           
            <div class="box box-primary" style="padding: 10px 5px;">
                <form action="{{ route('product.color.create_amount', $productId) }}" method="POST" name="form-add-color-product">
                    <input type="hidden" name="_token" value="{{csrf_token()}}" />
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Kích thước(*)</label>
                                {!! Form::select('size_id', $listSize, old('size_id'), ['class'=>'form-control select2']) !!}
                            </div>
                            <div class="form-group">
                                <label>Màu(*)</label>
                                {!! Form::select('color_id', $listColor, old('color_id'), ['class'=>'form-control select2']) !!}
                            </div>
                            {{-- <div class="form-group">
                                <label>Số lượng(*)</label>
                                <input name="count" type="number" class="form-control" value="{{ old('material') }}" required>
                            </div> --}}
                        </div>
                    </div>
                    <div class="box-footer">
                        <a href="{{ route('product.color.get', $productId) }}" class="btn btn-default pull-right">{{trans('product::product.cancel')}}</a>
                        {!! Form::button( 'Lưu', ['class' => 'btn btn-primary pull-left', 'type' => "submit"]) !!}
                    </div>
                {!! Form::close() !!}
                <div class="overlay hide">
                    <i class="fa fa-refresh fa-spin"></i>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection
