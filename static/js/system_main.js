$(function () {

    //页面加载完成向服务器请求文章显示
    getAticle('all', 1);

    $('.content-nav li').on('click', function (event) {
        $('.content-nav li').removeClass('active');
        $(this).addClass('active');

        //ajax发送请求
        var tag = getCurTag();
        getAticle(tag, 1);

        //切换标签时，默认都是跳到第一页
        $('.content-pagination li').removeClass('active');
        $('.content-pagination li').eq(0).addClass('active');
    });

    $('.content-pagination li').on('click', function (event) {
        $('.content-pagination li').removeClass('active');
        $(this).addClass('active');

        var page = $(this).html();
        var tag = getCurTag();
        getAticle(tag, page);
    });

    //点击增加 提交
    $('#j-add-submit').on('click', function () {
        if ($('#j-title').val() && $('#j-content').val()) {
            var addData = $('.add-wrapper form').serialize();
            $.ajax({
                url: '/addArticle',
                data: addData,
                async: true,
                type: "POST",
                dataType: "text",
                success: function (data) {
                    console.log(data);
                    // eval(data);
                    $('#j-title').val('');
                    $('#j-content').val('');
                }
            });
        } else {
            alert('还有未填项');
        }
        return false;
    });

    //点击删除 
    $('#j-delete-btn').on('click', function () {
        var deleteId = $('#j-deleteId').val();

        if (deleteId) {
            console.log(deleteId);
            $.get('/deleteArticle', { deleteId: deleteId }, function (data) {
                alert(data);
            });
        } else {
            alert('未填id');
        }

        return false;
    });

    $('#j-rewriteId-btn').on('click', function () {
        var rewriteId = $('#j-rewriteId').val();
        console.log(rewriteId);
        if (rewriteId) {
            $.get('/rewriteArticle', { rewriteId: rewriteId }, function (data) {
                console.log(data);
                $('#j-rewrite-title').val(data.title);
                $('#j-rewrite-tag').val(data.tag);
                $('#j-rewrite-content').val(data.content);
                $('#j-rewrite-submit').on('click', function () {
                    if ($('#j-rewrite-title').val() && $('#j-rewrite-content').val()) {
                        var rewriteData = $('#rewrite-form').serialize();
                        $.ajax({
                            url: '/rewriteArticle/Done',
                            data: {rewriteData: rewriteData,_id: data._id},
                            async: true,
                            type: "POST",
                            dataType: "text",
                            success: function (data) {
                                alert(data);
                                $('#j-rewriteId').val('');
                                $('#j-rewrite-title').val('');
                                $('#j-rewrite-content').val('');
                            }
                        });
                    } else {
                        alert('还有未填项');
                    }
                    return false;
                });
            });
        }
    });
});

function getAticle(tag, page) {
    $.get('/blog/articleList', { tag: tag, page: page }, function (data) {

        //清空父节点
        var oUl = $('.content-article ul');
        oUl.empty();
        var aData = data.articleList.content;
        for (let i = 0; i < aData.length; i++) {

            var curData = aData[i];
            var oLi = $('<li></li>');
            var articleId = curData._id;
            oLi.attr('class', 'article');
            oLi.attr('id', articleId);
            oLi.html(`
                            <div class="title">
                                <h1>${curData.title}</h1></div>
                            <div class="content">
                                <div class="content-text">id:${curData._id}</div>
                            </div>
			`);
            oLi.appendTo(oUl);
        }
        //给每个li添加点击事件
        $('.article').on('click', function (event) {
            var aticleID = $(this).attr('id');

            // 取得要提交页面的URL  
            var action = '/article';
            // 创建Form  
            var form = $('<form></form>');
            // 设置属性  
            form.attr('action', action);
            form.attr('method', 'get');
            // form的target属性决定form在哪个页面提交  
            // _self -> 当前页面 _blank -> 新页面  
            form.attr('target', '_self');
            // 创建Input  
            var my_input = $('<input type="text" name="articleid" />');
            my_input.attr('value', aticleID);
            $('body').append(form); // 这里必须要将form表单添加到页面中，否则会报错jquery使用 Form submission canceled because the form is not connected

            // 附加到Form  
            form.append(my_input);
            // 提交表单  
            form.submit();
        });
    }, 'json');
}

function getCurTag() {
    var tag = $('.content-nav .active').html();
    switch (tag) {
        case '全部':
            tag = 'all';
            break;
        case 'Html':
            tag = 'html';
            break;
        case 'Css':
            tag = 'css';
            break;
        case 'Javascript':
            tag = 'javascript';
            break;
        case 'node.js':
            tag = 'nodejs';
            break;
        default:
            console.log('no such tag');
    };
    return tag;
}

