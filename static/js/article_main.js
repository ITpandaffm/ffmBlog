
var hasLogin = false;       //记录登录状态
var currentUser = '';       //记录当前登陆后的用户名
var hasZan = false;
var para = window.location.search;
var articleId = para.substring((para.indexOf('=') + 1));    //当前页面显示的文章的id

$(function () {

    $.get('/getArticle', { articleId: articleId }, function (data) {
        $('.title').html(data.title);
        $('.tag').html(data.tag);
        $('.lastEditDate span').html(new Date(data.lastEditDate).toLocaleString());
        $('.createDate span').html(new Date(data.createDate).toLocaleString());
        $('.zanCount  span').html(`(${data.zan})`);
        $('.visitedCount span').html(`(${data.visited})`);
        $('.content').html(data.content);
    }, 'json');

    getComment();

    //登录框显示
    $('.write-comment').on('click', function () {
        if (!hasLogin) {
            //如果是未登陆状态，则弹框进行登陆
            showMask();
            // mask.show();//用这个的话相当于display:block 就把display:flex冲掉了
            $(window).on('resize', maskResize);
            //实现点击框外 关闭该框
            //阻止冒泡
            $('.login').on('click', function (event) {
                event.stopPropagation();
            });
            $('.register').on('click', function (event) {
                event.stopPropagation();
            });
            //利用setTimeout执行优先级低 否则登录框弹不出来，得先弹出来，再阻止冒泡
            //否则点击弹出登录框也会冒泡到document，关闭登录框
            setTimeout(function () {
                $(document).on('click', hideMask);
            }, 0);
        } else {
            //用户已经登陆，应该变成可以编辑的
            showCommentEditArea();
        }
    });

    //登录框
    //登录框的点击登录
    $('#j-s-signin-btn').on('click', function (event) {
        event.preventDefault();     //阻止默认事件
        signin();
    });
    //点击登录框的注册
    $('#j-s-register-btn').on('click', function (event) {
        event.preventDefault();
        $('.login').hide();
        $('.register').show();
        $('.signin-preload').hide();
        $('#register-username').focus();
    });

    //注册框
    //登录同样要同步
    //点击注册框的登录，返回登录框
    $('#j-r-signin-btn').on('click', function (event) {
        event.preventDefault();
        $('.register').hide();
        $('.login').show();
        $('#signin-username').focus();
    });

    //点击注册框的注册
    $('#j-r-register-btn').on('click', function (event) {
        event.preventDefault();

        //发送ajax请求 注册
        registerNewUser();
    });


    //点赞功能
    $('.zan').on('click', function () {
        if (hasZan) {
            Materialize.toast('您已经赞过了(￣▽￣)~*', 3000, 'rounded')
        } else {
            //发送请求给数据库 zan++
            $.get('/zanArticle', { articleId: articleId }, (result) => {
                if (result === 'success') {
                    Materialize.toast('谢谢您的支持(￣▽￣)~*', 3000, 'rounded');
                    hasZan = true;
                    $('.zan').html(`
                     <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-heart"></use>
                         </svg>
                       `).css('color', 'rgb(255, 137, 0)');
                } else {
                    alert('点赞失败了..稍后再试试？');
                }
            });
        }
    });

    //打赏功能
    $('.money').on('click', function(){
        Materialize.toast('谢谢兄台！心意已get！打赏自是不必啦ヾ(^▽^ヾ)', 3000, 'rounded');
    });
});


function showMask() {
    $('.mask').css({
        height: $(window).height(),
        width: $(window).width(),
        top: $(window).scrollTop() + 'px',
    });
    $('body').css('overflow', 'hidden'); //以此达到页面不可以滚动
    $('.signin-preload').hide();
    $('#signin-username').focus();
}

function maskResize() {
    $('.mask').css({
        height: $(window).height(),
        width: $(window).width(),
        top: $(window).scrollTop() + 'px',
    });
}

function hideMask() {
    $('body').css('overflow', 'visible');
    $(window).off('resize', maskResize);
    $('.mask').css('width', 0 + 'px');
    $('.signin-preload').hide();
    $(document).off('click', hideMask);
}

function getComment() {
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
}

function showCommentEditArea() {
    $('.write-comment').html(`
                <form action="">
                <textarea name="newComment" id="new-comment" cols="30" rows="10" placeholder="ctrl+回车快速提交评论"></textarea>
                <a class="waves-effect waves-light btn blue-grey darken-1" id="comment-submit-btn">发表</a>
                </form> 
            `);
    $('.write-comment').css('height', 100 + 'px');
    $('.write-comment').off('click');
    $('#new-comment').focus();

    $('#new-comment').on('keydown', function (event) {
        if (event.keyCode === 13 && event.ctrlKey) {
            submitNewComment();
        }
    });
    $('#comment-submit-btn').on('click', submitNewComment);
}

function submitNewComment() {
    //提交评论
    var newComment = $('#new-comment').val();
    if (newComment) {
        $.post('/pushNewComment', {
            articleId: articleId,
            currentUser: currentUser,
            content: newComment
        }, function (data) {
            if (data === 'success') {
                alert('评论成功！');
                //插入评论成功， 刷新评论列表
                getComment(articleId);
            } else {
                alert('插入评论失败:' + data);
            }
        });
        $('#new-comment').val('');
    } else {
        alert('评论不能为空！');
    }
}

function signin() {
    //注意登录要同步  同步等待的时候可以增加 加载的显示

    $('.signin-preload').show();
    //检验表单 
    //发送ajax请求 同步 并且显示加载页面 
    var username = $('#signin-username').val();
    var password = $('#signin-password').val();

    setTimeout(function () {
        $.ajax({
            type: 'get',
            url: '/signin',
            data: { username: username, password: password },
            async: false,
            success: function (result) {
                if (result === 'success') {
                    signinSuccess(username);
                } else {
                    alert(result);
                    $('.signin-preload').hide();
                }
            },
            dataType: 'text'
        });
    }, 1000);
}

function signinSuccess(username) {
    hideMask();

    hasLogin = true;
    currentUser = username;
    //释放窗口
    $('body').css('overflow', 'visible');
    $(window).off('resize', maskResize);

    showCommentEditArea();
}

function registerNewUser() {
    var username = $('#register-username').val();
    var password = $('#register-password').val();
    var telephone = $('#telephone').val();
    var email = $('#email').val();

    if (username && password && telephone && email) {
        $('.signin-preload').show();
        setTimeout(function () {
            $.ajax({
                type: 'get',
                url: '/registerNewUser',
                data: { username: username, password: password, telephone: telephone, email: email },
                async: false,
                success: function (result) {
                    if (result === 'success') {
                        alert('注册成功！快去评论吧(～￣▽￣)～')
                        signinSuccess(username);
                    } else if(result === 'hasUser') {
                        alert('用户已被注册！');
                        $('.signin-preload').hide();
                    }
                },
                dataType: 'text'
            });
        }, 1000);
    } else {
        alert('还有东西没填完o~');
        $('.signin-preload').hide();
    }
}

