// -------------
//     Index PAge
$('input').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
    radioClass: 'iradio_flat-blue'
});

$(function() {
    table = $('#category_table').DataTable({
        processing: true,
        serverSide: true,
        bAutoWidth: true,
        searching: false,
        ajax: {
            url: window.location.href.split('/').pop() + '/get',
            type: 'get',
            data: function (d) {
                d.category = $('#category option:selected').val();
                d.checkHasChildren =$('input#checkHasChildren:checked').val();
            }
        },
        columns: [
            {data: 'id'},
            {data: 'name',name:'faq_categories.name'},
            {data: 'parent_id',name:'faq_categories.parent_id'},
            {data: 'position',name:'faq_categories.position'},
            {data: 'status',name:'faq_categories.status'},
            {data: 'actions', orderable: false}
        ],
        "pagingType": "simple_numbers",
        "language": {
            "lengthMenu": "Hiển thị _MENU_ bản ghi trên một trang",
            "zeroRecords": "Chưa có dữ liệu",
            "info": "Đang hiển thị trang _PAGE_ of _PAGES_",
            "infoEmpty": "",
            "infoFiltered": "",
            "info": "Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_ kết quả",
            "paginate": {
                "previous":   "«",
                "next":       "»"
            },
            "sProcessing": '<i class="fa fa-spinner fa-pulse fa-fw"></i> Loading'
        },
    });
});
function filter(){
    table.draw();
}