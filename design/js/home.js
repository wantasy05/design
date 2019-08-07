$(function() {
	//阻止所有表单的提交
		$('form').submit(function(){
			return false;
		});

	//	$('#shoppingCart').click(function(){
	//		var str = $('#cartform').serialize();
	//		console.log(str)
	//		return false;
	//	});
	
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
	$('.search_box').click(moveSearchBox);
	function moveSearchBox(){
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
			}, 500);
		}
	}
	
	//移动设备部分更换图片操作
	//更换图片操作
	$('.theCover').hover(function() {
		var index = $(this).attr('index');
		//设置正则表达式
		var pattern = /[0-9]/;
		var str = $('.theImg img').eq(index).attr('src');
		//设置计数器
		var count = pattern.exec(str);
		//清除计时器
		clearInterval(this.timer);
		//		通过计时器设置每0.5秒更换一次图片
		this.timer = setInterval(function() {
			count++;
			if(count > 3) {
				count = 1;
			}
			str = str.replace(pattern, count);
			$('.theImg img').eq(index).attr('src', str);
		}, 500);

	}, function() {
		//清除计时器
		clearInterval(this.timer);
	});

	//移动设备右部切换
	var eletrFlag = false;
	$('#eletr li').click(function() {
		if(eletrFlag) {
			return;
		}
		if($(this).attr('class') == 'active') {
			return;
		}
		eletrFlag = true;
		var index = $(this).attr('index');
		$('#eletr li').each(function() {
			$(this).removeClass('active');
		});
		$(this).addClass('active');

		$('.product').each(function(i) {
			$(this).fadeOut(500, 'linear', function() {
				if($(this).attr('index') == index) {
					$(this).delay(501).fadeIn(500);
					setTimeout(function() {
						eletrFlag = false;
					}, 900);
				}
			});
		});
	});

	//食品部分标签点击与内容切换
	var $foodBtn = $('#food li');
	var $foodList = $('.food_list');
	var foodFlag = true; //设置标志位
	$foodBtn.click(function() {
		if(foodFlag) {
			foodFlag = false;
			var foodBtnIndex = $(this).attr('index');
			$foodBtn.each(function(i) {
				if(i == foodBtnIndex) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			});
			$foodList.animate({
				left: -100 * foodBtnIndex + '%'
			}, 500, function() {
				foodFlag = true;
			});

		} else {
			return;
		}
	});
	//	var y = $('.food').scrollTop();
	//	console.log(y);
	//食品列表闪光特效
	$foodLi = $('.food_list ul li');
	$foodLi.hover(function() {
		$(this).find('.light').animate({
			left: '125%'
		}, 500);
	}, function() {
		$(this).find('.light').stop(true).css('left', '-75%');
	});

	//插入式无缝滚动
	var moveTimer = null;
	//自定义移动函数
	function move() {
		var $electLi = $('.electronic_list li');
		moveTimer = setInterval(function() {
			$('.electronic_list li').first().hide(500, function() {
				$(this).insertAfter($('.electronic_list li').last());
				setTimeout(function() {
					$('.electronic_list li').last().show(500);
				}, 1200);
			});
		}, 2000);
	}
	//	设置鼠标悬停事件
	$('.electronic_list').hover(function() {
		clearInterval(moveTimer);
	}, function() {
		move();
	});
	//初始移动
	move();

});

window.onload = function() {
	//	var toTop = document.getElementById("toTop");
	//	var toMobiles = document.getElementById("toMobiles");

	//楼层效果
	// 楼层按钮
	var floorBtn = document.getElementsByClassName('floorBtn')[0];
	var btn = floorBtn.getElementsByClassName('btn');
	//获取目标楼层
	var floors = document.getElementsByClassName('floors')
	//	console.log(btn);
	var time = 200;
	var interval = 5;
	var num = 0;
	var timer = null;
	//楼层滚动计时器
	var floorTimer = null;

	window.onscroll = function() {
		//滚动条高度
		var scrollTop = document.documentElement.scrollTo || document.body.scrollTop;
		//可视区域高度
		var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		//		console.log(floors[0].offsetTop);

		if(scrollTop >= floors[0].offsetTop && floorBtn.style.display == 'none') {
			floorBtn.style.display = 'block';

			clearInterval(timer);

			//渐现效果
			timer = setInterval(function() {
				num += 0.1;
				floorBtn.style.opacity = num;
				if(num > 0.99) {
					clearInterval(timer);
				}
			}, 25);
				
		} else if(scrollTop < floors[0].offsetTop && floorBtn.style.display == 'block') {
			clearInterval(timer);
			//渐隐效果
			timer = setInterval(function() {
				num -= 0.1;
				floorBtn.style.opacity = num;
				if(num < 0) {
					clearInterval(timer);
					floorBtn.style.display = 'none';
				}
			}, 25);
		}
		//		console.log(scrollTop,floorBtn.style.display)
	}

	//点击移动事件
	for(var i = 0; i < btn.length; i++) {
		btn[i].onclick = function() {
			clearInterval(floorTimer);
			// console.log(this);
			FloorMove(this);
		}
	}

	function FloorMove(obj) {
		// console.log(obj);
		var num = obj.getAttribute('index');

		if(num == 'top') {
			var destination = 0;
		} else {
			var destination = floors[num].offsetTop;
		}

		// console.log(destination);
		var speed = (destination - document.body.scrollTop) / (time / interval);
		//		console.log(speed);
		var number = 0;
		floorTimer = setInterval(function() {
			document.body.scrollTop += speed;
			if(speed < 0 && document.body.scrollTop <= destination) {
				clearInterval(floorTimer);
				document.body.scrollTop = destination;
			} else if(speed > 0 && document.body.scrollTop >= destination) {
				clearInterval(floorTimer);
				document.body.scrollTop = destination;
			}
		}, interval);
	}

	// 轮播图jQuery代码
	var $sliderUl = $('#slider_pic'); //111111111
	var $sliderLi = $sliderUl.children('li');
	var $sliderImg = $sliderUl.find('img');
	var $prev = $('#prev');
	var $next = $('#next');
	$sliderFlag = true;
	var $picnum = $('.picnum');
	var sliderTimer = null;
	$index = 1;

	//初始化每张图片的宽度
	$sliderLi.css('width', (100 / $sliderLi.length) + '%');
	$(window).resize(function() {
		$sliderLi.css('width', (100 / $sliderLi.length) + '%');
	});
	//默认运行
	play();
	//下一张点击事件
	$next.click(function() {
		move(1);
	});
	//				上一张点击事件
	$prev.click(function() {
		move(-1);
	});

	//数字按钮点击事件
	$picnum.click(function() {
		if($sliderFlag) {
			$sliderFlag = false;
			$index = parseInt($(this).attr('index'));
			console.log(typeof $index)
			$sliderUl.animate({
				left: -100 * $index + '%'
			}, 1000, function() {
				changeNum($index);
				$sliderFlag = true;
			});

		} else {
			return;
		}
	});
	//封装移动函数
	function move(index) {
		if($sliderFlag) {
			$sliderFlag = false;
			if(index == 1) {
				var condition = $sliderImg.length - 1;
				var newIndex = 1;
			} else if(index == -1) {
				var condition = 0;
				var newIndex = $sliderImg.length - 2;
			}
			$index += index;
			$sliderUl.animate({ left: -100 * $index + '%' }, 1000, function() {
				if($index == condition) {
					$index = newIndex;
					$sliderUl.css('left', -100 * $index + '%');
				}
				changeNum($index);
				$sliderFlag = true;
			});

		} else {
			return;
		}
	}
	//改变数字按钮方法
	function changeNum(index) {
		$picnum.each(function(i) {
			if(i + 1 == index) {
				$picnum.eq(i).css({ backgroundColor: '#ccc', color: '#333' });
			} else {
				$picnum.eq(i).css({ backgroundColor: '#333', color: '#ccc' });
			}
		});
	}

	//封装停止函数
	function stop() {
		$('.slider_box .btn').css('display', 'block');
		clearInterval(sliderTimer);
	}
	//封装运行函数
	function play() {
		$('.slider_box .btn').css('display', 'none');
		sliderTimer = setInterval(function() {
			move(1);
			// console.log($index);
		}, 3000);
	}
	$('.slider_box').hover(stop, play);
	//保险措施，防止鼠标在轮播图上是刷新网页而出现无法停止自动轮播的bug
	$('.slider_box').mouseover(stop);
}





