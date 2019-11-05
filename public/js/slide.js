var slideHelper = (function () {
    return {
        editSlide: function (id) {
            btn_loading.loading("post_table");
            $.get('/slide/edit/'+ id, null, function (result) {
                btn_loading.hide("post_table");
                dialog.show('Slide', result);
            });
        },
        createSlide: function () {
            btn_loading.loading("post_table");
            $.get('/slide/create', null, function (result) {
                btn_loading.hide("post_table");
                dialog.show('Slide', result);
            });
        },
    };
})();
var commentHelper = (function () {
    return {
        edit: function (id) {
            btn_loading.loading("post_table");
            $.get('/comment/edit/'+ id, null, function (result) {
                btn_loading.hide("post_table");
                dialog.show('Comment', result);
            });
        },
    };
})();
