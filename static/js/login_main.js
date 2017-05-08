$(function(){
    $('.submit-btn').on('click', function(event){
        event.preventDefault();
        var data = $('form').serialize();
        $.get('/signin?'+data, function(status){
            if(status ==='success'){
                window.location.href = './system.html';
            } else if(status === 'huangchuqi'){
                window.location.href = './daqi.html'
            } else {
                alert('wrong！');
            }
        }, 'text');
    });
});