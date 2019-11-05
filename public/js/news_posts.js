
// Create and Edit page Post

$('input').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_flat'
});

tinymce.init({
    selector: '#post-data',


    relative_urls:false,
    remove_script_host:false,

    height: 500,
    entities_encode:'raw',

    plugins: [

        'advlist autolink lists link image charmap print preview hr anchor pagebreak',

        'searchreplace wordcount visualblocks visualchars code fullscreen',

        'insertdatetime media nonbreaking save table contextmenu directionality',

        'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager'

    ],

    toolbar1: 'insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link anchor code ',

    toolbar2: 'print preview | responsivefilemanager media image | forecolor backcolor emoticons',

    //add caption to image
    image_advtab: true,
    image_caption: true,

    //Config template
    templates: [

        { title: 'Test template 1', content: 'Test 1' },

        { title: 'Test template 2', content: 'Test 2' }

    ],


    //Config filemanager
    external_filemanager_path:"/filemanager/",
    filemanager_title:"Responsive Filemanager" ,
    external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},

    //visual block will give you distinct clear between code block
    visualblocks_default_state: true,

    //This is for if any style undefined or user-defined
    style_formats_autohide: true,
    style_formats_merge: true,
    video_template_callback: function(data,e) {
        return '<p><iframe width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls"\n' + ' src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' \n' + (data.source2 ? ' src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' \n' : '') + '</iframe></p>';
    },

    init_instance_callback: function (editor) {
        editor.on('keyup', function (e) {
            checkSeo(false, false);
        });
    }

});
tinymce.init({
    selector: '#post-data-eng',


    relative_urls:false,
    remove_script_host:false,

    height: 500,
    entities_encode:'raw',

    plugins: [

        'advlist autolink lists link image charmap print preview hr anchor pagebreak',

        'searchreplace wordcount visualblocks visualchars code fullscreen',

        'insertdatetime media nonbreaking save table contextmenu directionality',

        'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager'

    ],

    toolbar1: 'insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link anchor code ',

    toolbar2: 'print preview | responsivefilemanager media image | forecolor backcolor emoticons',

    //add caption to image
    image_advtab: true,
    image_caption: true,

    //Config template
    templates: [

        { title: 'Test template 1', content: 'Test 1' },

        { title: 'Test template 2', content: 'Test 2' }

    ],


    //Config filemanager
    external_filemanager_path:"/filemanager/",
    filemanager_title:"Responsive Filemanager" ,
    external_plugins: { "filemanager" : "/filemanager/plugin.min.js"},

    //visual block will give you distinct clear between code block
    visualblocks_default_state: true,

    //This is for if any style undefined or user-defined
    style_formats_autohide: true,
    style_formats_merge: true,
    video_template_callback: function(data,e) {
        return '<p><iframe width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls"\n' + ' src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' \n' + (data.source2 ? ' src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' \n' : '') + '</iframe></p>';
    },

    init_instance_callback: function (editor) {
        editor.on('keyup', function (e) {
            checkSeo(false, false);
        });
    }

});
$(function () {
    $('#datetimepicker1').datetimepicker({
        format :"DD-MM-YYYY HH:mm"
    });
});

$(document).ready(function(){
    $('.open-datetimepicker').click(function(){
        $('#datetimepicker1 ').datetimepicker("show","format:\"DD-MM-YYYY HH:mm\"");
    });
    if($('#cornerstone_value').val() == '1'){
        $('#cornerstone').iCheck('check');
    } else {
        $('#cornerstone').iCheck('uncheck');
    }
    $('#seotitle').attr('value', $("#title").val());
    checkSeo(true, false);
    $('.box-body').keyup( function(e) {
        checkSeo(false, false);
    });

    $('#cornerstone').on('ifChecked', function (e) {
        $('#cornerstone_value').val('1');
        checkSeo(false, true);
    });
    $('#cornerstone').on('ifUnchecked', function (e) {
        $('#cornerstone_value').val('0');
        checkSeo(false, false);
    });
    $('#focus_keyword').keyup(function() {
        checkExistKeyword();
    });
    $('#focus_keyword').keydown(function() {
        checkExistKeyword();
    });
    $("#title").keyup(function() {
        title = $("#title").val();
        processBar = title.length / 70 * 100;
        if(title.length >= 20 && title.length <= 39){
            $('.titlebar .snippet_config_item_bar').css("background", "#ee7c1b");    
        } else if(title.length >= 40 && title.length <= 70){
            $('.titlebar .snippet_config_item_bar').css("background", "#7ad03a");
        } else {
            $('.titlebar .snippet_config_item_bar').css("background", "#dc3232");
        }
        if(processBar > 100){
            processBar = 100;
        }
        changeInput(title);
        //Post title - Site title
        if (title.length == 0) {
            $('.snippet_main_title').text("Post title - Site title");
        } else {
            $('.snippet_main_title').text(title.substring(0,20)+ "...");
        }
        //Seo title
        $('#seotitle').attr('value', title);
        // process bar seo title
        $('.titlebar .snippet_config_item_bar').css("width", processBar + "%");
    });
   
    $("#meta_description").keyup(function() {
        title = $("#meta_description").val();
        processBar = title.length / 156 * 100;
        if(title.length >= 80 && title.length <= 119){
            $('.meta .snippet_config_item_bar').css("background", "#ee7c1b");    
        } else if(title.length >= 120 && title.length <= 156){
            $('.meta .snippet_config_item_bar').css("background", "#7ad03a");
        } else {
            $('.meta .snippet_config_item_bar').css("background", "#dc3232");
        }
        if(processBar > 100){
            processBar = 100;
        }
        $('.meta .snippet_config_item_bar').css("width", processBar + "%");
        if(title.length == 0){
            $('.snippet_main_description').text("This text is meta description.");
        } else {
            $('.snippet_main_description').text(title);
        }
    });
})

function getNumberIssue(div){
    problem = $(div+ ' #problemMsg1 .analysis_box_item').length + $(div+ ' #problemMsg2 .analysis_box_item').length;
    improve = $(div+ ' #improveMsg1 .analysis_box_item').length + $(div+ ' #improveMsg2 .analysis_box_item').length;
    good_num = $(div+ ' #goodMsg1 .analysis_box_item').length + $(div+ ' #goodMsg2 .analysis_box_item').length;
    $(div+" #goodMsg").html($(div+" #goodMsg").html().replace('phải', 'đáp ứng được tiêu chí'));
    $(div+ ' #problem_num').html(problem);
    $(div+ ' #improve_num').html(improve);
    $(div+ ' #good_num').html(good_num);
}

function checkExistKeyword() {
    $.ajaxSetup({headers: {'X-CSRF-TOKEN': $('#focus_keyword').attr('data-token')}});
    var id = $('.id').val() != undefined ? $('.id').val() : '';
    $.ajax({
        url: $("#focus_keyword").attr("data-url"),
        data: {
            focus_keyword: $("#focus_keyword").val(),
            id: id
        },
        dataType: 'json',
        cache: false,
        type: 'POST',
        async: true,
        complete: function (response) {
            msg = "Từ khoá chính phải có và là độc nhất, chưa được dùng làm từ khoá chính bao giờ";
            if (response.responseJSON == 0 || $("#focus_keyword").val() == '') {
                $('#problemMsg2').html(addSeoMsg(msg));
                $('#goodMsg2').html("");
            } else {
                $('#problemMsg2').html("");
                $('#goodMsg2').html(addSeoMsg(msg));
            }
            getNumberIssue('#seo');
            getNumberIssue('#read');
        }
    });
}

function checkSeo(firstload, cornerstone){
    checkSeoMsg = [
        "Đoạn văn đầu tiên trong bài viết phải chứa từ khoá chính",
        "Tỷ lệ xuất hiện của từ khoá chính trong bài phải chiếm ít nhất 1 - 4%",
        "Meta description phải chứa từ khoá chính",
        "Meta description phải độ dài phù hợp (tối thiểu 120 ký tự, tối đa 156 ký tự)",
        "Ảnh xuất hiện trong bài viết đều phải alt text chứa từ khoá chính (thuộc tính alt trong thẻ img)",
        "Nội dung bài viết phải tối thiểu 300 từ",
        "Nội dung bài viết phải chứa ít nhất 1 link ngoại tuyến",
        "Nội dung bài viết phải chứa ít nhất 1 link nội tuyến (link đến trang chủ)",
        "Seo Title có độ dài phù hợp, tối thiểu 40 ký tự, tối đa 70 ký tự",
        "URL phải chứa từ khoá chính (add vào slug)",
        "Tất cả các subheadings đều có chứa từ khoá",
        "Từ khoá chính phải có và là độc nhất, chưa được dùng làm từ khoá chính bao giờ"        
    ];
    
    checkReadability = [
        'Đoạn văn phải chứa các thẻ subheadings (thẻ tiêu đề H1, H2, H3, H4, H5, H6), mỗi thẻ subheading cách nhau 1 đoạn text không quá 300 từ',
        'Mỗi đoạn văn bản không dài quá 150 từ',
        'Số câu chứa hơn 20 từ không vượt quá 25% nội dung bài viết'
    ];
    
    key = $('#focus_keyword').val();
    if ($('.id').val() != undefined) {
        $('#goodMsg2').html(addSeoMsg(checkSeoMsg[11]));
        $('#problemMsg2').html("");
    } else {
        $('#problemMsg2').html(addSeoMsg(checkSeoMsg[11]));
        $('#goodMsg2').html("");
    }
    if (firstload == true) {
        strContent = $('#post-data').val();
    } else {
        strContent = tinyMCE.activeEditor.getContent();
    }
    meta = $('#meta_description').val();
    seotitle = $('#title').val();
    arrReadMsg = [];
    arrReadMsg[0] = r_checkSubHeading(strContent, checkReadability[0]);
    arrReadMsg[1] = r_checkSentence(strContent, checkReadability[1]);
    arrReadMsg[2] = r_checkContentLength(strContent, checkReadability[2]);
    msgHtml1 = ['', '', ''];
    for (var i = 0; i < arrReadMsg.length; i++) {
        if (arrReadMsg[i][0] == 0) {
            msgHtml1[0] += addSeoMsg(arrReadMsg[i][1]);
        } else if (arrReadMsg[i][0] == 1) {
            msgHtml1[1] += addSeoMsg(arrReadMsg[i][1]);
        } else {
            msgHtml1[2] += addSeoMsg(arrReadMsg[i][1]);
        }
    }
    $('#read #problemMsg #problemMsg1').html(msgHtml1[0]);
    $('#read #improveMsg #improveMsg1').html(msgHtml1[1]);
    $('#read #goodMsg #goodMsg1').html(msgHtml1[2]);
   
    arrMsgDisplay = [];
    //check first content - keyword
    arrMsgDisplay[0] = checkKeyinContent(key, strContent, checkSeoMsg[0]);
    //check keyword percent
    arrMsgDisplay[1] = checkKeyPercent(key, strContent, checkSeoMsg[1]);
    //check meta - keyword
    arrMsgDisplay[2] = checkKeyinContent(key, meta, checkSeoMsg[2]);
    //check meta length
    arrMsgDisplay[3] = checkContentLength(meta, [80, 119], [120, 156], checkSeoMsg[3], true);
    //check alt img
    arrMsgDisplay[4] = checkTagContent(key, strContent, "img", "alt", "altimg", checkSeoMsg[4]);
    //check content length
    arrMsgDisplay[5] = checkContentLength(strContent, [200, 299], [300, strContent.length], checkSeoMsg[5]);
    //check tag a_peripheral
    arrMsgDisplay[6] = checkTagContent(key, strContent, "a", "href", "a_peripheral", checkSeoMsg[6]);     
    //check tag a internal
    arrMsgDisplay[7] = checkTagContent(key, strContent, "a", "href", "a_internal", checkSeoMsg[7]);
    //check seo title length
    arrMsgDisplay[8] = checkContentLength(seotitle, [20, 39], [40, 70], checkSeoMsg[8]);
    //check slug - keyword
    arrMsgDisplay[9] = checkKeyinContent(key, seotitle, checkSeoMsg[9]);
    //check sub-heading
    if (cornerstone == true) {
        arrMsgDisplay[10] = checkSubHeading(strContent, checkSeoMsg[10]);
    }
    msgHtml = ['','',''];
    for (var i = 0; i < arrMsgDisplay.length; i++) {
        if(arrMsgDisplay[i][0] == 0){
            msgHtml[0] += addSeoMsg(arrMsgDisplay[i][1]); 
        } else if(arrMsgDisplay[i][0] == 1){
            msgHtml[1] += addSeoMsg(arrMsgDisplay[i][1]);
        } else {
            msgHtml[2] += addSeoMsg(arrMsgDisplay[i][1]);
        }
    }
    $('#seoDiv #problemMsg1').html(msgHtml[0]);
    $('#seoDiv #improveMsg1').html(msgHtml[1]);
    $('#seoDiv #goodMsg1').html(msgHtml[2]);
    checkExistKeyword();
    getNumberIssue('#seo');
    getNumberIssue('#read');
}

function r_checkSubHeading(strContent, msg){
    if(strContent != ""){
    function getSubContentLength(subContent) {
        return subContent.replace(/^\s+|\s+$/g, "").split(/\s+/).length >= 300;
    }
    subContent = strContent.split(/<h|h>/);
    if(subContent.length <= 1){
        return [0, msg];
    } else if(subContent.find(getSubContentLength) == undefined){
        return [2, msg];
    } else {
        return [1, msg];
    }
    } else {
        return [0, msg];
    }
}

function r_checkContentLength(strContent, msg){
    if(strContent != ""){
        subContent = strContent.split(/\r?\n/);
        function getSubContentLength(subContent) {
            return subContent.replace(/^\s+|\s+$/g, "").split(/\s+/).length > 150;
        }
        if(subContent.find(getSubContentLength) == undefined){  
            return [2, msg];
        } else {
            return [1, msg];
        }
    } else {
        return [0, msg];
    }
}

function r_checkSentence(strContent, msg) {
    if(strContent != ""){
    sentenceArr = strContent.split( /[^\.!\?]+[\.!\?]+/g );
    countSenErr = 0;
    for (var i = 0; i < sentenceArr.length; i++) {
        if (sentenceArr[i].replace(/^\s+|\s+$/g, "").split(/\s+/).length >= 20) {
            countSenErr++;
        }
    }
    senErrPer = countSenErr / sentenceArr.length * 100;
    if (senErrPer <= 25) {
        return [2, msg];
    } else if (senErrPer > 25 && senErrPer <= 30) {
        return [1, msg];
    } else {
        return [0, msg];
    }
    } else {
        return [0, msg];
    }
}

function findSubHeading(content) {
    return content != $('#focus_keyword').val();
}

function checkSubHeading(strContent, msg) {
    subHeadContent = [];
    getdataSubHeading(subHeadContent, strContent, 1);
    check = 0;
    if ($('#focus_keyword').val() != "") {
        if (subHeadContent.length != 0 && subHeadContent.find(findSubHeading) == undefined) {
            check = 2;
        }
    }
    return [check, msg];
}

function getdataSubHeading(res, strContent, index) {
    var regex = new RegExp('<h' + index + '(.*?)>(.*?)</h' + index + '>', "gi"), result;
    contentHeading = strContent;
    if(strContent != ""){
        while ((result = regex.exec(contentHeading))) {
            res.push(result[2]);
        }
        if (index < 6) {
            getdataSubHeading(res, strContent, ++index);
        }
    }
}

function checkKeyinContent(key, strContent, msg){
    firstContent = strContent.split(/\r?\n/);
    check = firstContent[0].indexOf(key) >= 0 && key != "" && strContent != "" ? 2 : 0;
    return [check, msg];
}

function checkKeyPercent(key, strContent, msg) {
    check = 0;
    if(key != "" && strContent != ""){
        var re = new RegExp(key, 'g');
        if(strContent.match(re) == null){
            check = 0;
        } else {
            numWordsPer = strContent.match(re).length / strContent.replace(/^\s+|\s+$/g, "").split(/\s+/).length * 100;
            if (numWordsPer > 0 && numWordsPer <= 1) {
                check = 1;
            } else {
                check = 2;
            }
        }
    }
    return [check, msg];
}

function checkContentLength(strContent, problem_num, imp_num, msg) {
    check = 0;
    if (strContent.length >= problem_num[0] && strContent.length <= problem_num[1]) {
        check = 1;
    } else if (strContent.length >= imp_num[0] && strContent.length <= imp_num[1]) {
        check = 2;
    } else {
        check = 0;
    }
    return [check, msg];
}

function checkTagContent(key, strContent, tags, attr, checkStep, msg) {
    check = 0;
    if (key != "" && strContent != "") {
        var regex = new RegExp('<' + tags + ' .*?' + attr + '="(.*?)"', "gi"), result, res = [];
        countAlt = 0;
        while ((result = regex.exec(strContent))) {
            res.push(result[1]);
        }
        switch (checkStep) {
            case "altimg":
                for (var i = 0; i <= res.length; i++) {
                    if (res[i] != null && res[i].indexOf(key) >= 0) {
                        countAlt += 1;
                    }
                }
                console.log(res.length);
                if (countAlt == res.length && res.length != 0) {
                    check = 2;
                }
                break;
            case "a_internal":
                if (tags == 'a' && res.join().indexOf(window.location.hostname) >= 0) {
                    check = 2;
                }
                break;
            case "a_peripheral":
                function findPeripheral(url) {
                    return url.indexOf(window.location.hostname) == -1;
                }
                if (tags == 'a' && res.find(findPeripheral) != undefined) {
                    check = 2;
                }
                break;
        }
    }
    return [check, msg];
}

function addSeoMsg(strMsg) {
    return '<div class="analysis_box_item">' + strMsg + '</div>';
}

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
    //console.log(slug)
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
    $('#slug').val(slug);
    $('#slug_text').val(slug);
    if(slug.length == 0){
        $('.snippet_main_slug').html("site-url > post-title");
    } else {
        $('.snippet_main_slug').html(slug.substring(0, 20) + '...');
    }
    
}
const exampleInputEmail1 = $('#exampleInputEmail1').val();
var post = (function(){
    return {
        changeType : function(_this){
            if($(_this).val() == "news"){
                $('#typeContentNews1').show();
                $('#typeContentNews2').hide();
                $('.data_label').text('Nội dung (*)');
                $('#typeContentOther').css('display', 'none');
                $('.seo').show();
            }else{
                if($(_this).val() != 'video'){
                    $('.data_label').text('Nội dung');
                    $('#typeContentNews1').hide();
                    $('#typeContentNews2').hide();
                    $('.seo').show();
                } else {
                    $('.data_label').text('Link Video Youtube');
                    $('#typeContentNews1').hide();
                    $('#typeContentNews2').show();
                    $('.seo').hide();
                }
                $('#typeContentOther').css('display', 'block');
                $('#typeContentNews #post-data').val($('#post_type :selected').val());
            }
        },
        addRowFile : function(_this,type){
            var add = "";
            if(type == "edit"){
                add = '<input type="hidden" name="link[]" value="0">';
            }
            var html = '<tr class="tr_clone">'+
                            '<td>'+
                                '<textarea class="form-control" name="caption[]" placeholder="Input caption name here..."></textarea>'+
                            '</td>'+
                            '<td style="width: 50%;">'+
                                '<input type="file" class="form-control" name="file[]">'+
                            '</td>'+
                            '<td style="width: 10%;" class="text-center"><button type="button" onclick="return post.addRowFile(this,\''+type+'\');" class="btn btn-primary"><i class="fa fa-plus-circle"></i></button></td>'+
                            '<td style="width: 10%;" class="text-center"><button type="button" onclick="return post.delRow(this);" class="btn btn-danger"><i class="fa fa-close"></i></button></td>'+
                                add +
                            '</td>'+
                        '</tr>';


            if(_this == undefined){
                $('#body_files').prepend(html);
            }
            else{
                $(_this).parent().parent().before(html);
            }

        },
        delRow : function (_this) {
            if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
                $(_this).closest('.tr_clone').remove();
            }
            else return false;
        }
    };
})();

var seoHelper = (function () {
    return{
        changeTitle : function(_this) {
            $.post('/work/work_post/changeTitle', null, function(result){
                $(_this).text(result.text);
                if(result.text == 'Tắt hiển thị'){
                    $('#show span').text(Number($('#show span').text()) + 1);
                    $('#draft span').text(Number($('#draft span').text()) - 1);
                } else {
                    $('#show span').text(Number($('#show span').text()) - 1);
                    $('#draft span').text(Number($('#draft span').text()) + 1);
                }
                filter();
                alert(result.message);
            });
        }
    }
});