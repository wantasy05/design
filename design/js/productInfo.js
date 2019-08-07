$(function() {
	//阻止所有表单的提交
	$('form').submit(function() {
		return false;
	});
	
	
	/*
	 	放大镜js代码
	 * */
	//设置放大图片默认高度
	$('.right').css('height', $('#smallImg').css('height'));

	//获取小小图
	var $litImg = $('.sm_pic img');
	//获取左边小图、
	var $smallImg = $('#smallImg');
	//获取右边大图
	var $bigImg = $('#bigImg');

	//小图hover事件，改变图片
	$litImg.hover(function() {
		$smallImg.attr('src', $(this).attr('src'));
		$bigImg.attr('src', $(this).attr('src'));
	}, function() {});

	//获取小滑块
	var $flag = $('#flag');
	//获取遮罩层
	var $cover = $('#cover');
	//鼠标移动事件
	$cover.bind('mousemove', function() {
		mouseMove();
	});
	//	$cover.mousemove();
	//设置鼠标移出事件
	$cover.bind('mouseout', function() {
		mouseOut();
	});
	//	$cover.mouseout();
	var mouseMove = function(e) {
		$flag.css('display', 'block');
		$('.right').css('display', 'block');
		//鼠标事件的兼容性处理
		var ev = e || window.event;
		//获取鼠标位置坐标
		var mouseX = ev.offsetX;
		var mouseY = ev.offsetY;
		//		console.log(22222);
		//设置小滑块跟随鼠标移动
		$flag.css('left', mouseX - $flag.width() / 2);
		$flag.css('top', mouseY - $flag.height() / 2);

		//设置边界
		if(parseInt($flag.css('left')) <= 0) {
			$flag.css('left', '0');
		} else if(parseInt($flag.css('left')) >= $cover.width() - $flag.width()) {
			$flag.css('left', $cover.width() - $flag.width() + 'px');
		}
		if(parseInt($flag.css('top')) <= 0) {
			$flag.css('top', '0');
		} else if(parseInt($flag.css('top')) >= $cover.height() - $flag.height()) {
			$flag.css('top', $cover.height() - $flag.height() + 'px');
		}

		//设置大图跟随变化
		$bigImg.css('left', -2 * parseInt($flag.css('left')) + 'px');
		$bigImg.css('top', -2 * parseInt($flag.css('top')) + 'px');

	}
	var mouseOut = function() {
		$flag.css('display', 'none');
		$('.right').css('display', 'none');
	}

	//设置窗口大小改变事件
	$(window).resize(function() {
		//		alert(21221);
		//		console.log($(document).width());
		if($(window).width() < 751) {
			$cover.unbind();
		} else {
			$cover.unbind();
			//鼠标移动事件
			$cover.bind('mousemove', function() {
				mouseMove();
			});
			//	$cover.mousemove();
			//设置鼠标移出事件
			$cover.bind('mouseout', function() {
				mouseOut();
			});
		}
	});
	
	
	/*
	 	商品详情部分js代码
	 * */
	//当数量为0时禁用添加到购物车
	if($('#num').attr('value')==0){
		$('#infoAddCart').attr('disabled','disabled');
	}
	//减少数量按钮事件及特效
	$('#minus').bind('click', function() {
		var $self = $(this);
		$self.css('backgroundColor', '#999');
		setTimeout(function() {
			$self.css('backgroundColor', '#ccc');
		}, 90);
		var $num = parseInt($('#num').attr('value'));
		if($num > 0) {
			$('#num').attr('value', $num - 1);
			price = ($('#num').attr('value') * 1799).toString() + '.00';
			$('#total b').html(price);
			//当数量为0时禁用添加到购物车
			if($('#num').attr('value')==0){
				$('#infoAddCart').attr('disabled','disabled');
			}
		}
		

	});
	//增加数量按钮事件及特效
	$('#plus').bind('click', function() {
		var $self = $(this);
		$self.css('backgroundColor', '#999');
		setTimeout(function() {
			$self.css('backgroundColor', '#ccc');
		}, 90);
		var $num = parseInt($('#num').attr('value'));
		if($num < 100) {
			$('#num').attr('value', $num + 1);
			price = ($('#num').attr('value') * 1799).toString() + '.00';
			$('#total b').html(price);
			//当数量为0时禁用添加到购物车
	if($('#num').attr('value')>0){
		$('#infoAddCart').removeAttr('disabled');
	}
		}

	});
	
	
	
	//点击搜索按钮，弹出搜索框
	var searchWidth = '500px';
	var searchInputWidth = '380px';
	$(window).resize(function(){
		if($(window).width()>600){
			searchWidth = '500px';
			searchInputWidth = '380px';
			
			$('input[name="search"]').css('width','380px');
			$('.search_form').css('width',searchWidth);
		}else if($(window).width()<600){
			searchWidth = '400px';
			searchInputWidth = '280px';
			$('input[name="search"]').css('width','280px');
			
			$('.search_form').css('width',searchWidth);
		}
	});
	var searchBoxFlag = true;
	$('.search_box').click(function() {
		if(searchBoxFlag) {
			$('input[name="search"]').css('width','searchInputWidth');
			$('.search_form').css('width','20px');
			
			//			$('.search_form').css('padding','10px');
			searchBoxFlag = false;
			$('.search_form').stop(true).animate({
				top: '44px',
				height: '62px',
				padding: '10px'
			}, 500).animate({
				width: searchWidth
			}, 1000, function() {
				$('.search_form input').fadeIn(500);
			});
		} else {
			searchBoxFlag = true;
			$('.search_form input').fadeOut(500);
			$('.search_form').stop(true).animate({
				width: '20px'
			}, 1000).animate({
				top: '15px',
				height: '0px',
				padding: '0px'
			}, 500)
		}
	});
	
	
});