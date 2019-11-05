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

var companyHelper = (function () {
    return {
        create : function () {
            dialog.loading();
            $.get('/work/work_company/create', null, function (result) {
                dialog.hide();
                dialog.show('Thêm mới công ty', result);
            })
        },
        edit : function (id) {
            dialog.loading();
            $.get('/work/work_company/' + id + '/edit', null, function (result) {
                dialog.hide();
                dialog.show('Cập nhật thông tin công ty', result);
            })
        },
        del : function (id) {
            var result = confirm("Bạn có muốn xóa bản ghi này không?");
            if(result == true){
                $.post('/work/work_company/delete/' + id, null, function (result) {
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

var addressHelper = (function(){
    return {
        getDisctict: function(province_id){
            addressHelper.loading_district();
            addressHelper.loading_wards();
            $.post('/work/work_company/get_district', {province_id : province_id}, function (result) {
                addressHelper.hide_district();
                $("#district_id").html(result);
                addressHelper.getWard($("#district_id").val());
            });
        },
        getWard: function(district_id){
            addressHelper.loading_wards();
            $.post('/work/work_company/get_ward', {district_id : district_id}, function (result) {
                addressHelper.hide_wards();
                $("#ward_id").html(result);
            });
        },
        loading_district: function(){
            $('#loading_districts').show();
        },
        hide_district: function(){
            $('#loading_districts').hide();
        },
        loading_wards: function(){
            $('#loading_wards').show();
        },
        hide_wards: function(){
            $('#loading_wards').hide();
        }
    };
})();