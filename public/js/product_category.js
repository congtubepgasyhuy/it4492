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
            url: 'products_category/get',
            type: 'get',
            data: function (d) {
                d.category = $('#category option:selected').val();
                d.checkHasChildren =$('input#checkHasChildren:checked').val();
                // d.checkTypeOrder =$('input#checkTypeOrder:checked').val();
            }
        },
        columns: [
            {data: 'id'},
            {data: 'name',name:'products_categories.name'},
            {data: 'parent_id',name:'products_categories.parent_id'},
            {data: 'position',name:'products_categories.position'},
            {data: 'status',name:'products_categories.status'},
            {data: 'actions', orderable: false}
        ],
        "pagingType": "simple_numbers",
        "language": {
            "lengthMenu": "Hiển thị _MENU_ bản ghi trên một trang",
            "zeroRecords": "Không tìm bản ghi phù hợp",
            "info": "Đang hiển thị trang _PAGE_ of _PAGES_",
            "infoEmpty": "Không có dữ liệu phù hợp",
            "infoFiltered": "(lọc từ tổng số _MAX_ bản ghi)",
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