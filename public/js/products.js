
// Create and Edit page Post

$('input').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_flat'
});

tinymce.init({
    selector: '#post-data',


    relative_urls:false,
    remove_script_host:false,

    height: 500,
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
    },

    init_instance_callback: function (editor) {
        editor.on('keyup', function (e) {
            checkSeo(false, false);
        });
    }

});

tinymce.init({
    selector: '#post-data-eng',


    relative_urls:false,
    remove_script_host:false,

    height: 500,
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
    },

    init_instance_callback: function (editor) {
        editor.on('keyup', function (e) {
            checkSeo(false, false);
        });
    }

});
$(function () {
    $('#datetimepicker1').datetimepicker({
        format :"DD-MM-YYYY HH:mm"
    });
});

$(document).ready(function(){
    $('#submitBtn').click(function (e) {
        if ($(".form-submit").valid()) {
            $('.divBtn').hide();
            $('#post_table_processing').show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#dataToken').attr('data-token')
                }
            });
            uploadImg(0, [], 1);
        } else {
            $('.has-error input').focus();
        }
    });
    
    function uploadImg(index, arrImg, num) {
        if (num <= $('#imgBtn1').attr('value')) {
            var file_data = $('#images' + num).prop('files')[index];
            var form_data = new FormData();
            form_data.append('file', file_data);
            form_data.append('foldername', $('#code').val() + "/" + num);
            $.ajax({
                url: $('#images1').attr('data-url'),
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (response) {
                    if (index < $('#images' + num).prop('files').length - 1) {
                        arrImg.push(response);
                        uploadImg(++index, arrImg, num);
                    } else {
                        $('#imagesArr' + num).val(JSON.stringify(arrImg));
                        $('#images' + num).attr('disabled', 'disabled');
                        arrImg = [];
                        index = 0;
                        uploadImg(index, arrImg, ++num);
                    }
                }
            });
        } else {
            
            $('.form-submit').submit();
        }
    }
    
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
    //console.log(slug)
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
    $('#slug').val(slug);
    $('#slug_text').val(slug);
    if(slug.length == 0){
        $('.snippet_main_slug').html("site-url > post-title");
    } else {
        $('.snippet_main_slug').html(slug);
    }
    
}

var post = (function(){
    return {
        addRowFile : function(_this,type){
            var add = "";
            if(type == "edit"){
                add = '<input type="hidden" name="link[]" value="0">';
            }
            var html = '<tr class="tr_clone">' +
                    '<td>' +
                    '<input class="form-control" name="video_url[]" placeholder="Nhập đường dẫn video youtube" />' +
                    '</td>' +
                    '<td style="width: 5%;" class="text-center"><button type="button" onclick="return post.addRowFile(this,\'' + type + '\');" class="btn btn-primary"><i class="fa fa-plus-circle"></i></button></td>' +
                    '<td style="width: 5%;" class="text-center"><button type="button" onclick="return post.delRow(this);" class="btn btn-danger"><i class="fa fa-close"></i></button></td>' +
                    add +
                    '</td>' +
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

var imgRolate = (function(){
    return {
        addRowFile: function (_this, type) {
            var add = "";
            if (type == "edit") {
                add = '<input type="hidden" name="link[]" value="0">';
            }
            var num = parseInt($('#imgBtn1').attr('value'));
            ++num;
            var html = '<tr class="tr_clone">' +
                    '<td>' +
                    '<input id="images' + num + '" type="file" accept="image/*" name="files' + num + '[]" class="form-control preview-upload-image" multiple/>' +
                    '<input id="imagesArr' + num + '" type="hidden" name="imagesArr' + num + '">' +
                    '</td>' +
                    '<td style="width: 5%;" class="text-center"><button style="height: 24px;padding: 0;display: flex;width: 100%;justify-content: center;align-items: center;" type="button" onclick="return imgRolate.addRowFile(this,\'' + type + '\');" class="btn btn-primary"><i class="fa fa-plus-circle"></i></button></td>' +
                    '<td style="width: 5%;" class="text-center"><button style="height: 24px;padding: 0;display: flex;width: 100%;justify-content: center;align-items: center;" type="button" onclick="return imgRolate.delRow(this);" class="btn btn-danger"><i class="fa fa-close"></i></button></td>' +
                    add +
                    '</td>' +
                    '</tr>';
            $('#imgBtn1').attr('value', num);
            if (_this == undefined) {
                $('#img_files').prepend(html);
            } else {
                $(_this).parent().parent().before(html);
            }
            
        },
        delRow : function (_this) {
            if (confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')) {
                $(_this).closest('.tr_clone').remove();
                var num = parseInt($('#imgBtn1').attr('value'));
                --num;
                $('#imgBtn1').attr('value', num);
            }
            else return false;
        }
    };
})();
