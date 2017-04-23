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
    	over750Aimate();
    });
    var scrollFlag = false;

    $(window).on('scroll', function(event) {
    	var nScrollTop = $('body').scrollTop();
    	if (nScrollTop > 650) {
    		if (!scrollFlag) {
				over750Aimate();
    		}
    	} else {
    		scrollFlag = false; 
    	}
    });
    function over750Aimate (){
    	$('body').animate({scrollTop: 947}, {
    		duration: 500,
    		easing: 'easeOutCirc'
    	});
    	scrollFlag = true;
    }
});
