$(function(){
    $('.submit-btn').on('click', function(){
        var data = $('form').serialize();
        $.get('/signin?'+data, function(status){
            if(status ==='success'){
                window.location.href = './system.html';
            } else {
                alert('wrong！');
            }
        }, 'text');
        return false;
    });
});