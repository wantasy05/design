function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}
function move(obj,json,fun){
	//清除计时器的叠加
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//标志位
		var unit = 'px';
		var num = 100;
		// 遍历json
		for(var i in json){
			var current = 0;
			// 判断属性
			if(i == 'opacity'){
				num = 100;
				unit = '';
				current = getStyle(obj,i)*100;
			}else{
				num = 1;
				unit = 'px';
				current = parseInt(getStyle(obj,i));
			}
			// 计算速度
			var speed = (json[i] - current)/7;
			// 判断方向
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(json[i] != current){
				flag = false;
			}
			obj.style[i] = (current + speed)/num + unit;
		}
		if(flag){
			clearInterval(obj.timer);
			if(typeof(fun) == 'function'){
				fun();
			}
		}
	},30);
}