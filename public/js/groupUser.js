
$('input').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_flat'
});


$(document).ready(function(){
    $('input').on('ifChecked', function(event){
        //if check parent category -> check all children category
        parentToChildren(this, 'check');

        //if check children category -> if all it's siblings checked -> check parent
        childrenToParent(this, 'check');

    });


    $('input').on('ifUnchecked', function(event){
        //Uncheck Parent ->uncheck all children
        parentToChildren(this, 'uncheck');

        //Uncheck children -> if all it's siblings unchecked -> uncheck parent
        childrenToParent(this, 'uncheck');

    });


    function parentToChildren (data, status){
        var classLv = data.value;
        var child = $('.'+classLv).length;
        if(child>0){
            $('.'+classLv).each(function(){
                $(this).iCheck(status);
                var classLevel3 = this.value;
                var childLv3 = $('.'+classLevel3).length;
                if(childLv3>0){
                    $('.'+classLevel3).each(function(){
                        $(this).iCheck(status);
                    })
                }
            })
        }

        return true;
    }


    function childrenToParent(data,status){

        if(status == 'uncheck')
        {
            var flag = checkInput(data);

            //flag == 0: Tat ca deu uncheck
            //flag == 1 : co it nhat 1 cai check
            if(flag == 0){
                var data2 = data.className;
                $('input[value='+data2+']').each(function(){
                    $(this).iCheck(status);
                    var flag2 = checkInput(this);
                    if(flag2 == 0){
                        var data3 = this.className;
                        $('[value='+data3+']').each(function(){
                            $(this).iCheck(status);
                        })
                    }
                })
            }
        }

        else {
            var flag = unCheckInput(data);

            //flag == 1: Tat ca deu da check
            //flag == 0: Co it nhat 1 cai chua check
            if(flag == 1){
                var data2 = data.className;
                $('input[value='+data2+']').each(function(){
                    $(this).iCheck(status);
                    var flag2 = unCheckInput(this);
                    if(flag2 == 1){
                        var data3 = this.className;
                        $('[value='+data3+']').each(function(){
                            $(this).iCheck(status);
                        })
                    }
                })
            }

        }
    }


    function checkInput(data){

        var flag =0;
        result = $('.'+data.className);
        for(i=0;i<result.length;i++){
            var array_className = ($(result[i]).parent().get(0).className).split(" ");
            if(typeof (array_className[1]) != 'undefined'){
                if(array_className[1]=="checked"){
                    if(typeof array_className[2] == "undefined"){
                        flag = 1;
                    }
                }
            }
        }

        return flag
    }


    function unCheckInput(data){
        var flag =1;
        result = $('.'+data.className);
        for(i=0;i<result.length;i++){

            var array_className = ($(result[i]).parent().get(0).className).split(" ");
            if(typeof (array_className[1]) == 'undefined'){
                flag = 0;
            }

            //Children 0f each result[i];
            $('.'+result[i].value).each(function(){
                var array_className2 = ($(this).parent().get(0).className).split(" ");
                if(typeof (array_className2[1]) == 'undefined'){
                    flag = 0;
                }
            })
        }

        return flag
    }


});