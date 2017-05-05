
var hasLogin = false;

$(function () {
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
                   <span>${curData.timestamp.substring(0, 10)}</span>
                   </div>
                   <div class="comment-content">${curData.content}</div>
            `);
            oLi.appendTo('.comment-area ul');
        }
    });


    //登录框显示
    $('.write-comment').on('click', function () {
        showMask();

        // mask.show();//用这个的话相当于display:block 就把display:flex冲掉了
        $(window).on('resize', maskResize);

        //实现点击框外 关闭该框
        //阻止冒泡
        $('.login').on('click', function(event) {
            event.stopPropagation();
        });
        $('.register').on('click', function(event) {
            event.stopPropagation();
        });
        //利用setTimeout执行优先级低 否则登录框弹不出来，得先弹出来，再阻止冒泡
        //否则点击弹出登录框也会冒泡到document，关闭登录框
        setTimeout(function () {
             $(document).on('click', hideMask);
        }, 0);
    });        

    //登录框
    //注意登录要同步  同步等待的时候可以增加 加载的显示
    //登录框的点击登录
    $('#j-s-signin-btn').on('click', function(event){
        event.preventDefault(); //阻止默认事件
        $('body').css('overflow', 'visible');
        $(window).off('resize', maskResize);   
        $('.signin-preload').show();
        setTimeout(function(){
            hideMask();
            //如果进行其他操作 关闭等 那就要移除计时器
        }, 3000);

        //检验表单 


        //发送ajax请求 同步 并且显示加载页面  


        //
    });
    //点击登录框的注册
    $('#j-s-register-btn').on('click', function(event) {
        event.preventDefault(); 
        $('.login').hide();
        $('.register').show();
        $('.signin-preload').hide();
        return false;
    });

    //注册框
    //登录同样要同步
    //点击注册框的登录，返回登录框
    $('#j-r-signin-btn').on('click', function(event) {
        event.preventDefault(); 
        $('.register').hide();
        $('.login').show();
        return false;
    });

    //点击注册框的注册
    $('#j-r-register-btn').on('click', function(event) {
        event.preventDefault();
        

    //发送ajax请求

    //
    });


});

function showMask () {
    $('.mask').css({
            height: $(window).height(),
            width: $(window).width(),
            top: $(window).scrollTop() + 'px',
            dispaly: 'flex'
        });
    $('body').css('overflow','hidden'); //以此达到页面不可以滚动
    $('.signin-preload').hide();

}

function maskResize() {
    $('.mask').css({
        height: $(window).height(),
        width: $(window).width(),
        top: $(window).scrollTop() + 'px',
    });
}

function hideMask(){
    $('body').css('overflow', 'visible');
    $(window).off('resize', maskResize);   
    $('.mask').css('width', 0+'px');   
    $('.signin-preload').hide();
    $(document).off('click', hideMask);
}
