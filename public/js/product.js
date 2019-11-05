Flash = {}
//Success notify
Flash.success = function(msg, time){ time = time || 2000;
    $('#flash-container').html("<div class='success message'>" + msg + "</div>");
    $('#flash-container').addClass('showing');
    setTimeout(function(){
        $('#flash-container').removeClass('showing');
    }, time);
};
//Error notify
Flash.fail = function(msg, time){ time = time || 2000;
    $('#flash-container').html("<div class='fail message'>" + msg + "</div>");
    $('#flash-container').addClass('showing');
    setTimeout(function(){
        $('#flash-container').removeClass('showing');
    }, time);
};
