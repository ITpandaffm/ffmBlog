

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
                                <div class="content-text">${curData.content}</div>
                            </div>
                            <div class="info">
                                <div class="info-timestamp">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-date"></use>
                                    </svg>
                                    <span>${curData.createDate.substring(0, 10)}</span>
                                </div>
                                <div class="info-tag">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-tag"></use>
                                    </svg> <span>
                                        JavaScript
                                    </span>
                                </div>
                                <div class="info-zan">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-heart"></use>
                                    </svg>
                                    <span> (${curData.zan})</span>
                                </div>
                                <div class="info-comment">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-comment"></use>
                                    </svg><span> (20192)</span>
                                </div>
                            </div>
			`);
            oLi.appendTo(oUl);
        }
        //给每个li添加点击事件
        $('.article').on('click', function (event) {
            var aticleID = $(this).attr('id');
            // $.get('/article', { articleId: aticleID},function(data){
            //     console.log(data);
            // },'html'); //用ajax只能请求数据，不能更新页面

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