$(function() {
    $('.select2').select2();
    $('.select2-full-width').select2({ width: '100%' });
    
    $('#btnBack').click(function (e) {
            if(confirm("Bạn có chắc chắn muốn hủy không?")){
                window.location = $('.btnBack').attr('url');
            } else {
                e.preventDefault();
            }
    });
});

$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});


function showNotify(message, type)
{
    if (type == undefined || type == '') {
        type = 'success';
    }

    $.notify(message, type, {position: 'top center'});
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



var dialog = (function(){
    return {
        show : function(title, data){
            $('#finishModalLabel').html(title);
            $('#modal_content').html(data);
            $('#btnAction').attr('onclick', 'return formHelper.onSubmit("frmDialogCreate")');
            $('#detailModal').modal('show');
        },
        close: function () {
            $('#detailModal').modal('hide');
            $('#detailModal').css('display', 'none').attr('aria-hidden', 'true');
            $('#finishModalLabel').html('');
            $('#modal_content').html('');
        },
    }
})();

var projectHelper = (function(){
    return {
        create : function () {
            on();
            $.get('/utilities/project/create', null, function (result) {
                off();
                dialog.show('Thêm mới dự án', result);
            })
        },
        edit : function (id) {
            on();
            $.get('/utilities/project/edit/'+id ,null, function (result) {
                    off();
                    dialog.show('Cập nhật thông tin dự án', result);
                })
        },

        editdecentralization : function (id) {
            on()
            $.get('/utilities/project/editdecentralization/'+id ,null, function (result) {
                off();
                dialog.show('Cập nhật phân quyền dự án', result);
            })
        }
    };
})();

var checkDeleteRegion = (function(){
    return {
        delete: function(id){
            on();
            $.get({
                url: '/news/news_region/checkDelete',
                type: 'GET',
                data: {
                    id: id
                },
                success: function(result){
                    off();
                    console.log(result);
                    dialog.show('Notice',result)
                }
            })

        }
    }
})();

var BlockHelper = (function(){
    return {
        detail: function(id){
            on();
            $.get('/news/news_block/detail/'+id, null, function(result){
                off();
                dialog.show('View block content',result);
            });
        }
    }
})();


var regionHelper = (function(){
    return {
        create: function(){
            on();
            $.get('/news/news_region/create', null, function (result) {
                off();
                dialog.show('Add new region', result);
            })
        },
        edit : function (id) {
            on();
            $.get('/news/news_region/edit/'+id ,null, function (result) {
                off();
                dialog.show('Update region', result);
            })
        }
    }

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

var btn_loading = (function () {
    return {
        loading : function (btn_id) {
            var $btn = $('#' + btn_id);
            $btn.prop('disabled', true);
            $btn.waitMe({
                color: '#3c8dbc'
            });
        },
        hide : function (btn_id) {
            var $btn = $('#' + btn_id);
            $btn.prop('disabled', false);
            $btn.waitMe('hide');
        }
    };
})();

function showModal(modalContent) {
    // Create modal element
    var date = new Date();
    var id = date.getTime();

    var $modal = $('<div class="modal fade" id="modal-'+ id +'" tabindex="-1" role="dialog" aria-labelledby="modal-'+ id +'"></div>');
    $modal.html(modalContent);
    $('body').append($modal);
    $modal.modal('show');
}

function on() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("loading").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}


// Create and Edit page
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
    console.log(slug);
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
    $('#prefix').val(slug);
}

function removeDisabled(){
    if($('.region-select').removeAttr('disabled')){
        return true;
    }
    else return false;
}

function changeRegion(){
    var data = $('#category option:selected').val();
    $('.loader').attr('style','display:inline-block');
    if(data!=0){
        $('.region-select').prop('disabled',true);
        $.ajax({
            url: '/news/news_category/checkRegion',
            type: 'GET',
            data: {
                id: data
            },
            success: function (respond) {
                $('.loader').attr('style','display:none');
                var data = document.getElementsByClassName('region');
                for(var i=0; i<data.length;i++){

                    if(data[i].value == respond){
                        data[i].selected='selected';
                    }
                    else{
                        data[i].selected='';
                    }
                }
            }
        });

    }
    else{
        $('.loader').attr('style','display:none');
        $('.region-select').prop('disabled',false);
    }
}
var btnHelper = (function () {
    return {
        loading: function (id) {
            console.log(id);
            $('#' + id).waitMe({
                effect: 'bounce',
                text: '',
                bg: 'rgba(255,255,255,0.7)',
                color: '#000'
            });
        },
        hide: function (id) {
            $('#' + id).waitMe('hide');
        }
    };
})();

function detailPost(post_id) {

    $.post({
        url: '/news/detail_post',
        data: {
            post_id: post_id
        },
        success: function(response) {
            if (response !== null) {
                $('#modal_content').html(response.data);
                $('#finishModalLabel').html(response.title)
                $('#detailModal').modal("show");
            }
        }
    })


}