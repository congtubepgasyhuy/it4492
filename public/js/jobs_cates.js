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

var categoryHelper = (function () {
    return {
        create : function () {
            dialog.loading();
            $.get('/work/work_category/create', null, function (result) {
                dialog.hide();
                dialog.show('Thêm mới danh mục', result);
            })
        },
        edit : function (id) {
            dialog.loading();
            $.get('/work/work_category/' + id + '/edit', null, function (result) {
                dialog.hide();
                dialog.show('Cập nhật danh mục', result);
            })
        },
        del : function (id) {
            var result = confirm("Bạn có muốn xóa bản ghi này không?");
            if(result == true){
                $.post('/work/work_category/delete/' + id, null, function (result) {
                    if(result.result == 0){
                        alert(result.message);
                    }else{
                        table.draw();
                        alert(result.message);
                    }
                });
            }
        }
    };
})();