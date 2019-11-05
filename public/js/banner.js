var bannerHelper = (function () {
    return {
        editBanner: function (id) {
            btn_loading.loading("post_table");
            $.get('/banner/edit/'+ id, null, function (result) {
                btn_loading.hide("post_table");
                dialog.show('Slide', result);
            });
        },
        createBanner: function () {
            btn_loading.loading("post_table");
            $.get('/banner/create', null, function (result) {
                btn_loading.hide("post_table");
                dialog.show('Slide', result);
            });
        },
    };
})();
