var courseHelper = (function () {
    return {
        edit: function (id) {
            btn_loading.loading("course_table");
            $.get('/course/edit/'+id, null, function (result) {
                btn_loading.hide("course_table");
                dialog.show('Sửa năm học', result);
            });
        },
        create: function () {
            btn_loading.loading("course_table");
            $.get('/course/create', null, function (result) {
                btn_loading.hide("course_table");
                dialog.show('Tạo mới năm học', result);
            });
        }
    };
})();
