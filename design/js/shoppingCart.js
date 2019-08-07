$(function(){
	var $shoppingCart = $('#shoppingCart');
	var $shoppingCartList = $('.shoppingCartList');
	var $close = $('.close');
	var $theBox = $('.theBox');
	

	//购物车点击事件
	$shoppingCart.click(function(){
		$shoppingCartList.fadeIn(500);
		searchBoxFlag = true;
			$('.search_form input').fadeOut(500);
			$('.search_form').stop(true).animate({
				width: '20px'
			}, 1000).animate({
				top: '15px',
				height: '0px',
				padding: '0px'
			}, 500);
	});
	//关闭购物车剪辑事件
	$close.click(function(){
		$shoppingCartList.fadeOut(500);
	});
	//封装更新购物车函数
	function updataCart(){
		$.post('./php/updataCart.php',function(data){
//			$theBox.html('');
			var result = eval(data);
			//定义计算总金额变量
			var sum = 0;
			if(result.length==0){
				$('.theBox').html('您的购物车空空如也！');
				sum = 0;
				return;
			}else{
				$theBox.html('');
				for(var i in result){
					var thePrice = (result[i].price*100*result[i].number)/100;
					if(thePrice%parseInt(result[i].price)==0){
				thePrice += '.00';		
					}
					var li = document.createElement('li');
					li.innerHTML = '<span class="productname">' + result[i].productname + '</span>' + '<input type="text" value="'+ result[i].number +'" />' + '<button>×</button><span>'+ thePrice +'</span>';
//					li.innerHTML = '<span class="productname">' + result[i].productname + '</span>' + '<input type="text" value="'+ result[i].number +'" onkeyup="this.value=this.value.replace(/\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\D/g)" />' + '<button>×</button><span>'+ thePrice +'</span>';
					$theBox.append(li);
					sum += parseFloat(thePrice);
				}
//				console.log(sum);
				$('.total').html(sum + '.00');
			}
//			console.log(result.length);
				
		});
		
		
	}
	updataCart();	
	

	//使用jquery-1.7.2
	(function($){
		//动态添加删除购物车商品按钮  
		$('.theBox button').live('click',function(){
			var $productname = $(this).prev().prev().html();
			$.post('./php/deleteProduct.php',{productname:$productname},function(data){
//				console.log(data);
				updataCart();
				setTimeout(function(){
					console.log($('.theBox').html());
					/*if($('.theBox').html()==''){
						$('.theBox').html('您的购物车空空如也！');
					}*/
				},50);
				
				
			});
			
		});
		
		//购物车数量修改触发事件
		$('.theBox input').live('change',function(){
			var productname = $(this).prev().html();
			var num = $(this).attr('value');
//			console.log(num);
			$.post('./php/updataProduct.php',{productname:productname,num:num},function(data){
				updataCart();
			});
		});
	})(jq172);
	
	
	
	
	//添加购物车事件代码
	//获取加入购物车按钮
	var $addCart = $('.addCart');
	
	$addCart.click(function(){
		//获取添加数量
		if($(this).get(0) == $('#infoAddCart').get(0)){
			var count = $('#num').get(0).value;
		}else{
			var count = 1;
		}

		var form = $(this).attr('form');
		var $input = $('#'+form).find('input[type="hidden"]');
		var value = $input.val();

		var obj = JSON.parse(value);

		$.post('./php/checkProductExist.php',{productname:obj.name},function(data){
			if(data==0){
				$.post('./php/insertProduct.php',{productname:obj.name,price:obj.price,num:count},function(data){

					updataCart();
				});
			}else{

				var theObj = JSON.parse(data)[0];
				var num = theObj.number;
				num++;
				$.post('./php/updataProduct.php',{productname:theObj.productname,num:num},function(data){
					if(data==1){
						updataCart();
					}
				});
			}
		});
	});
		
});