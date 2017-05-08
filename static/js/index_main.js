$(function() {

    //title Animate
    var aTitleText = $('.title span');
    (function titleSetup() {
        aTitleText.eq(0).css('left', '50px');
        aTitleText.eq(1).css('top', '60px');
        aTitleText.eq(2).css('left', '-50px');
    })();

    aTitleText.eq(1).delay(500);
    titleAnimate(1);
    aTitleText.eq(0).delay(1000);
    aTitleText.eq(2).delay(1000);
    titleAnimate(0);
    titleAnimate(2);
    $('.title p').delay(1800).animate({
    	opacity: 1
    }, {
    	duration: 1000,
    	easing: 'easeInOutQuad'
    });

    function titleAnimate(index) {
        aTitleText.eq(index).animate({
            left: 0,
            top: 0,
            opacity: 1
        }, {
            duration: 800,
            easing: 'easeInOutCubic',
        });
    }

    //menu
    var oMenuToggle = $(".menu-toggle");
    oMenuToggle.click(function() {
        oMenuToggle.toggleClass("cross");
        var left = 0;
        if (!oMenuToggle.hasClass('cross')) {
            left = -150 + 'px';
        }
        //出现吧！ list大军！
        var aMenuLi = $('header nav li');
        for (var i = 0; i < aMenuLi.length; i++) {
            (function(index) {
                setTimeout(function() {
                    aMenuLi.eq(index).animate({
                        left: left
                    }, {
                        duration: 200,
                        easing: 'easeInOutQuint'
                    });
                }, 100 * index);
            })(i);
        }
    });

    //arrow 
    $('.arrow').click(function(event) {
    	arrowAimate();
    });
    var scrollFlag = false;
    var destinTop = $('header').height();
    $(window).on('scroll', function(event) {
    	var nScrollTop = $('body').scrollTop();
    	if (nScrollTop > destinTop-50) {
    		if (!scrollFlag) {
				arrowAimate();
    		}
    	} else {
    		scrollFlag = false; 
    	}
    });
    function arrowAimate (){
    	$('body').animate({scrollTop: destinTop}, {
    		duration: 500,
    		easing: 'easeOutCirc'
    	});
    	scrollFlag = true;
    }

    //life pic change
        var aPigPath = ['static/image/homepage/pic0.jpeg', 'static/image/homepage/pic1.jpeg', 'static/image/homepage/pic2.jpeg', 'static/image/homepage/pic3.jpeg', 'static/image/homepage/pic4.png'];
        var aPigDescrit = ['摄于沈阳 冬 2016-12-26', '摄于北京 春 2017-03-30', '摄于沈阳 冬 2017-12-13', '摄于沈阳 夏 2016-05-03', '摄于天池 秋 2014-10-07'];
        var nCurPic = 0;
        $('.life-pic').click(function(event) {
            nCurPic++;
             $('.life-pic img').animate({opacity: 0}, { duration: 300 }).attr('src', aPigPath[nCurPic % aPigPath.length]).animate({opacity:1}, { duration: 400});
             $('.life-pic-container p').animate({opacity: 0}, { duration: 300 }).html(aPigDescrit[nCurPic % aPigDescrit.length]).animate({opacity:1}, { duration: 400});
        });
    //获取网站访客数量
    $.get('/getVisitorNum', function(data) {
        console.log(data);
        var visitorNum = data.visitorNum;
        $('.footer-info span').html(visitorNum);
    }, 'json');
});
