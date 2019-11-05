var warehouseHelper = (function () {
    return {
        create: function (url) {
            btn_loading.loading("post_table");
            $.get(url, null, function (result) {
                btnHelper.hide("post_table");
                dialog.show("Nhập kho", result);
            });
        },
        view: function (url) {
            btn_loading.loading("post_table");
            $.get(url, null, function (result) {
                btnHelper.hide("post_table");
                dialog.show('Chi tiết nhập kho', result);
            });
        },
        list: function (id) {
            btnHelper.loading("comment_table");
            $.get('/news/comment/list/'+id, null, function (result) {
                btnHelper.hide("comment_table");
                dialog.show('Bình luận', result);
            });
        },
        delete: function (id,isChild,_this) {
            var confirm = window.confirm("Bạn có muốn xóa bình luận này không ?");
            if(confirm == true){
                if(isChild == 1){
                    btnHelper.loading("form-input");
                }
                else{
                    btnHelper.loading("comment_table");
                }
                $.get('/news/comment/del/'+id+'/'+isChild, null, function (result) {
                    $(_this).parent().parent().remove();
                    if(isChild == 1){
                        alert("Xóa thành công");
                        if($("tbody tr").length <= 0){
                            window.location.reload();
                        }
                        btnHelper.hide("form-input");
                    }
                    else{
                        alert("Xóa thành công");
                        btnHelper.hide("comment_table");
                    }
                });
            }
        }
    };
})();
