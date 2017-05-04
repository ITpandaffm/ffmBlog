
var hasLogin = false;

$(function () {
      //选项卡初始化
    $('ul.tabs').tabs({'swipeable':true});
    $('.tabs').css('backgroundColor', 'transparent');
    $('.carousel').css('height', '450');
    $('.carousel-item').css('height', '450');

    var para = window.location.search;
    var articleId = para.substring((para.indexOf('=') + 1));

    $.get('/getArticle', { articleId: articleId }, function (data) {
        $('.title').html(data.title);
        $('.timestamp span').html(data.lastEditDate.substring(0, 10));
        $('.content').html(data.content);

    }, 'json');

    $.get('/getComment', { articleId: articleId }, function (data) {
        var commentArr = data.commentArr;
        //先清空父级
        $('.comment-area ul').empty();
        for (var i = 0; i < commentArr.length; i++) {
            var curData = commentArr[i];
            var oLi = $('<li></li>');
            oLi.html(`
                   <div class="user-info">
                   <div class="avatar"><img src=${curData.avatar_path} alt=""></div>
                   <h1>${curData.user_name}</h1>
                   <span>${curData.timestamp.substring(0,10)}</span>
                   </div>
                   <div class="comment-content">${curData.content}</div>
            `);
            oLi.appendTo('.comment-area ul');
        }
    });

    $('.write-comment').on('click', function(){
        console.log('click'); 
    });


});