// tinymce.init({
//     selector: '#post-data',
//     height: 500,
//     theme: 'modern',
//     plugins: [
//         'advlist autolink lists link image charmap print preview hr anchor pagebreak',
//         'searchreplace wordcount visualblocks visualchars code fullscreen',
//         'insertdatetime media nonbreaking save table contextmenu directionality',
//         'responsivefilemanager emoticons template paste textcolor colorpicker textpattern imagetools codesample toc '
//     ],
// //            plugins: "image code media",
// //            toolbar:"undo redo | image code | media file",
//     toolbar1: 'undo redo styleselect bold italic underline blockquote forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent link table',
//     toolbar2: ' responsivefilemanager | media image | code emoticons preview fullscreen ',
//
//     // enable title field in the Image dialog
//     image_title: true,
//     // enable automatic uploads of images represented by blob or data URIs
//     automatic_uploads: true,
//     // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
//     // images_upload_url: 'postAcceptor.php',
//     // here we add custom filepicker only to Image dialog
//     file_picker_types: 'file image media',
//     // and here's our custom image picker
//     file_picker_callback: function(cb, value, meta) {
//         var input = document.createElement('input');
//         input.setAttribute('type', 'file');
//         input.setAttribute('accept', 'image/*');
//
//         // Note: In modern browsers input[type="file"] is functional without
//         // even adding it to the DOM, but that might not be the case in some older
//         // or quirky browsers like IE, so you might want to add it to the DOM
//         // just in case, and visually hide it. And do not forget do remove it
//         // once you do not need it anymore.
//
//         input.onchange = function() {
//             var file = this.files[0];
//
//             var reader = new FileReader();
//             reader.onload = function () {
//                 // Note: Now we need to register the blob in TinyMCEs image blob
//                 // registry. In the next release this part hopefully won't be
//                 // necessary, as we are looking to handle it internally.
//                 var id = 'blobid' + (new Date()).getTime();
//                 var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
//                 var base64 = reader.result.split(',')[1];
//                 var blobInfo = blobCache.create(id, file, base64);
//                 blobCache.add(blobInfo);
//
//                 // call the callback and populate the Title field with the file name
//                 cb(blobInfo.blobUri(), { title: file.name });
//             };
//             reader.readAsDataURL(file);
//         };
//
//         input.click();
//     },
//
//     imagetools_toolbar: 'alignleft aligncenter alignright rotateleft rotateright flipv fliph editimage imageoptions',
//     image_advtab: true,
//     external_filemanager_path:"{{asset('/adminlte/plugins')}}/filemanager/",
//     filemanager_title:"Công cụ quản lý file" ,
//     external_plugins: { "filemanager" : "{{asset('/adminlte/plugins')}}/filemanager/plugin.min.js"}
// });