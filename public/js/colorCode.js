var colorCode = (function () {
    return {
        create: function (url) {
            btn_loading.loading("post_table");
            $.get(url, null, function (result) {
                btn_loading.hide("post_table");
                dialog.show("Thêm mới màu sản phẩm", result);
            });
        },
        edit: function (url) {
            console.log(url);
            btn_loading.loading("post_table");
            $.get(url, null, function (result) {
                btn_loading.hide("post_table");
                dialog.show('Sửa màu sản phẩm', result);
            });
        },
    };
})();
var notification = (function () {
    return {
        create: function (url) {
            btn_loading.loading("post_table");
            $.get(url, null, function (result) {
                btn_loading.hide("post_table");
                dialog.show("Tạo nội dung tin nhắn", result);
            });
        },
    };
})();
