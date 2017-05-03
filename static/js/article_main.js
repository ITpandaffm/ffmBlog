
$(function(){
    var para = window.location.search;
    var articleId = para.substring((para.indexOf('=')+1));

    $.get('/getArticle',{articleId: articleId}, function(data){
        $('.title').html(data.title);
        $('.timestamp span').html(data.lastEditDate.substring(0,10));
        $('.content').html(data.content);

    }, 'json');

});