

$(function () {
	$('.content-nav li').on('click', function(event) {
		console.log('hello');
		$('.content-nav li').removeClass('active');
		$(this).addClass('active');
	});
	$('.content-pagination li').on('click', function(event) {
		console.log('hello');
		$('.content-pagination li').removeClass('active');
		$(this).addClass('active');
	});
});
