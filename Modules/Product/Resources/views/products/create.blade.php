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
        <li class="active">{{ trans('product::product.add') }}</li>
    </ol>
</section>
<section class="content">
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">           
        <div class="box box-primary" style="padding: 10px 5px;">
            {!! Form::open(['method' => 'POST', 'route' => ['product.product.store'], 'class' => 'validate','enctype'=>'multipart/form-data']) !!}
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>{{ trans('product::product.name') }}(*)</label>
                        <input name="name" type="text" class="form-control" value="{{ old('name') }}" placeholder="{{ trans('product::product.enter_name') }}" required>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.price') }}(*)</label>
                        <input name="price" type="number" class="form-control" value="{{ old('price') }}" placeholder="{{ trans('product::product.enter_price') }}" required>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.material') }}(*)</label>
                        <input name="material" type="text" class="form-control" value="{{ old('material') }}" placeholder="{{ trans('product::product.enter_material') }}" required>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.description') }}</label>
                        <textarea name="description" type="text" class="form-control" value="{{ old('description') }}" placeholder="{{trans('product::product.enter_description')}}" required> </textarea>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.category') }}</label>
                        {!! Form::select('category_id', $selectedCategories, old('category_id'), ['class'=>'form-control select2']) !!}
                    </div>
                    <hr>
                    <h3>Thông tin seo sản phẩm</h3>
                    <div class="form-group">
                        <label>{{ trans('product::product.seo_title') }}</label>
                        <input name="seo_title" type="text" class="form-control" value="{{ old('seo_title') }}">
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.seo_des') }}</label>
                        <textarea name="seo_description" type="text" class="form-control" value="{{ old('seo_description') }}"> </textarea>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.seo_key') }}</label>
                        <textarea name="seo_key" type="text" class="form-control" value="{{ old('seo_key') }}"></textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>{{ trans('product::product.cover1') }}</label>
                        <input type="file" name="cover_path[]" class="form-control preview-upload-image"/>
                        <img src="{{ asset('/img/placeholder.jpg') }}" alt="" class="preview-feature-image preview-image" required/>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.cover2') }}</label>
                        <input type="file" name="cover_path[]" class="form-control preview-upload-image"/>
                        <img src="{{ asset('/img/placeholder.jpg') }}" alt="" class="preview-feature-image preview-image" required/>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.cover3') }}</label>
                        <input type="file" name="cover_path[]" class="form-control preview-upload-image"/>
                        <img src="{{ asset('/img/placeholder.jpg') }}" alt="" class="preview-feature-image preview-image"/>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.cover4') }}</label>
                        <input type="file" name="cover_path[]" class="form-control preview-upload-image"/>
                        <img src="{{ asset('/img/placeholder.jpg') }}" alt="" class="preview-feature-image preview-image"/>
                    </div>
                    <div class="form-group">
                        <label>{{ trans('product::product.cover5') }}</label>
                        <input type="file" name="cover_path[]" class="form-control preview-upload-image"/>
                        <img src="{{ asset('/img/placeholder.jpg') }}" alt="" class="preview-feature-image preview-image"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-footer">
            <a href="{{ route('product.product.index') }}" class="btn btn-default pull-right">{{trans('product::product.cancel')}}</a>
            {!! Form::button( trans('product::product.save'), ['class' => 'btn btn-primary pull-left', 'type' => "submit"]) !!}
        </div>
        {!! Form::close() !!}
    </div>
</div>
</section>
@endsection