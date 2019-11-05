
// Create and Edit page Post

$('input').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_flat'
});

tinymce.init({
    selector: '#require',


    relative_urls:false,
    remove_script_host:false,

    height: 400,
    entities_encode:'raw',

    plugins: [

        'advlist autolink lists link image charmap print preview hr anchor pagebreak',

        'searchreplace wordcount visualblocks visualchars code fullscreen',

        'insertdatetime media nonbreaking save table contextmenu directionality',

        'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager'

    ],

    toolbar1: 'insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link anchor code ',

    toolbar2: 'print preview | responsivefilemanager media image | forecolor backcolor emoticons',

    //add caption to image
    image_advtab: true,
    image_caption: true,

    //Config template
    templates: [

        { title: 'Test template 1', content: 'Test 1' },

        { title: 'Test template 2', content: 'Test 2' }

    ],


    //Config filemanager
    external_filemanager_path:"/filemanager/",
    filemanager_title:"Responsive Filemanager" ,
    external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},

    //visual block will give you distinct clear between code block
    visualblocks_default_state: true,

    //This is for if any style undefined or user-defined
    style_formats_autohide: true,
    style_formats_merge: true,
    video_template_callback: function(data,e) {
        return '<p><iframe width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls"\n' + ' src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' \n' + (data.source2 ? ' src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' \n' : '') + '</iframe></p>';
    }
});

tinymce.init({
    selector: '#require',


    relative_urls:false,
    remove_script_host:false,

    height: 400,
    entities_encode:'raw',

    plugins: [

        'advlist autolink lists link image charmap print preview hr anchor pagebreak',

        'searchreplace wordcount visualblocks visualchars code fullscreen',

        'insertdatetime media nonbreaking save table contextmenu directionality',

        'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager'

    ],

    toolbar1: 'insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link anchor code ',

    toolbar2: 'print preview | responsivefilemanager media image | forecolor backcolor emoticons',

    //add caption to image
    image_advtab: true,
    image_caption: true,

    //Config template
    templates: [

        { title: 'Test template 1', content: 'Test 1' },

        { title: 'Test template 2', content: 'Test 2' }

    ],


    //Config filemanager
    external_filemanager_path:"/filemanager/",
    filemanager_title:"Responsive Filemanager" ,
    external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},

    //visual block will give you distinct clear between code block
    visualblocks_default_state: true,

    //This is for if any style undefined or user-defined
    style_formats_autohide: true,
    style_formats_merge: true,
    video_template_callback: function(data,e) {
        return '<p><iframe width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls"\n' + ' src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' \n' + (data.source2 ? ' src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' \n' : '') + '</iframe></p>';
    }
});

tinymce.init({
    selector: '#info',


    relative_urls:false,
    remove_script_host:false,

    height: 400,
    entities_encode:'raw',

    plugins: [

        'advlist autolink lists link image charmap print preview hr anchor pagebreak',

        'searchreplace wordcount visualblocks visualchars code fullscreen',

        'insertdatetime media nonbreaking save table contextmenu directionality',

        'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager'

    ],

    toolbar1: 'insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link anchor code ',

    toolbar2: 'print preview | responsivefilemanager media image | forecolor backcolor emoticons',

    //add caption to image
    image_advtab: true,
    image_caption: true,

    //Config template
    templates: [

        { title: 'Test template 1', content: 'Test 1' },

        { title: 'Test template 2', content: 'Test 2' }

    ],


    //Config filemanager
    external_filemanager_path:"/filemanager/",
    filemanager_title:"Responsive Filemanager" ,
    external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},

    //visual block will give you distinct clear between code block
    visualblocks_default_state: true,

    //This is for if any style undefined or user-defined
    style_formats_autohide: true,
    style_formats_merge: true,
    video_template_callback: function(data,e) {
        return '<p><iframe width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls"\n' + ' src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' \n' + (data.source2 ? ' src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' \n' : '') + '</iframe></p>';
    }
});

tinymce.init({
    selector: '#other_info',


    relative_urls:false,
    remove_script_host:false,

    height: 400,
    entities_encode:'raw',

    plugins: [

        'advlist autolink lists link image charmap print preview hr anchor pagebreak',

        'searchreplace wordcount visualblocks visualchars code fullscreen',

        'insertdatetime media nonbreaking save table contextmenu directionality',

        'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager'

    ],

    toolbar1: 'insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link anchor code ',

    toolbar2: 'print preview | responsivefilemanager media image | forecolor backcolor emoticons',

    //add caption to image
    image_advtab: true,
    image_caption: true,

    //Config template
    templates: [

        { title: 'Test template 1', content: 'Test 1' },

        { title: 'Test template 2', content: 'Test 2' }

    ],


    //Config filemanager
    external_filemanager_path:"/filemanager/",
    filemanager_title:"Responsive Filemanager" ,
    external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},

    //visual block will give you distinct clear between code block
    visualblocks_default_state: true,

    //This is for if any style undefined or user-defined
    style_formats_autohide: true,
    style_formats_merge: true,
    video_template_callback: function(data,e) {
        return '<p><iframe width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls"\n' + ' src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' \n' + (data.source2 ? ' src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' \n' : '') + '</iframe></p>';
    }
});

$(function () {
    $('#datetimepicker1').datetimepicker({
        format :"DD-MM-YYYY HH:mm"
    });
});

$(document).ready(function(){
    $('.open-datetimepicker').click(function(){
        $('#datetimepicker1 ').datetimepicker("show","format:\"DD-MM-YYYY HH:mm\"");
    });
})




function changeInput(val) {
    slug = val.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    console.log(slug)
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@'+slug+'@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    slug = slug.trim();
    $('#slug').val(slug)
}

var post = (function(){
    return {
        changeType : function(_this){
            if($(_this).val() == "news"){
                $('#typeContentNews').css('display', 'block');
                $('#typeContentOther').css('display', 'none');
            }else{
                $('#typeContentNews').css('display', 'none');
                $('#typeContentOther').css('display', 'block');
            }
        },
        addRowFile : function(_this,type){
            var add = "";
            if(type == "edit"){
                add = '<input type="hidden" name="link[]" value="0">';
            }
            var html = '<tr class="tr_clone">'+
                '<td>'+
                '<textarea class="form-control" name="caption[]" placeholder="Input caption name here..."></textarea>'+
                '</td>'+
                '<td style="width: 50%;">'+
                '<input type="file" class="form-control" name="file[]">'+
                '</td>'+
                '<td style="width: 10%;" class="text-center"><button type="button" onclick="return post.addRowFile(this,\''+type+'\');" class="btn btn-primary"><i class="fa fa-plus-circle"></i></button></td>'+
                '<td style="width: 10%;" class="text-center"><button type="button" onclick="return post.delRow(this);" class="btn btn-danger"><i class="fa fa-close"></i></button></td>'+
                add +
                '</td>'+
                '</tr>';


            if(_this == undefined){
                $('#body_files').prepend(html);
            }
            else{
                $(_this).parent().parent().before(html);
            }

        },
        delRow : function (_this) {
            if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
                $(_this).closest('.tr_clone').remove();
            }
            else return false;
        }
    };
})();

var dialog = (function () {
    return {
        show: function (title, data) {
            $('#finishModalLabel').html(title);
            $('#modal_content').html(data);
            $('#btnAction').attr('onclick', 'return formHelper.onSubmit("frmDialogCreate")');
            $('#detailModal').modal('show');
            $('#detailModal > .modal-dialog').css('min-width', '400px');
            $('input').attr('autocomplete', 'off');
        },
        close: function () {
            $('#detailModal').modal('hide');
            $('#detailModal').css('display', 'none').attr('aria-hidden', 'true');
            $('#finishModalLabel').html('');
            $('#modal_content').html('');
        },
        loading: function () {
            $('#f_loading_message').show();
        },
        hide: function () {
            $('#f_loading_message').hide();
        },
    };
})();

var formHelper = (function () {
    return {
        postFormJson: function (objID, onSucess) {
            var url = document.getElementById(objID).action;
            $.post(url, $('#' + objID).serialize(), function (data) {
                onSucess(data);
            }, 'json');
        }
    };
})();

var workHelper = (function(){
    return{
        enable : function(id, _this){
            $.post('/work/work_post/enable/' + id, null, function(result){
                $(_this).text(result.text);
                if(result.text == 'Tắt hiển thị'){
                    $('#show span').text(Number($('#show span').text()) + 1);
                    $('#draft span').text(Number($('#draft span').text()) - 1);
                } else {
                    $('#show span').text(Number($('#show span').text()) - 1);
                    $('#draft span').text(Number($('#draft span').text()) + 1);
                }
                filter();
                alert(result.message);
            });
        },
        getListCv : function (id) {
            dialog.loading();
            $.get('/work/work_post/getListCv/' + id, null, function (result) {
                dialog.hide();
                dialog.show('Danh sách ứng viên', result);
            })
        }
    };
})();