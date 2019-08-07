window.onload = function() {
	//定义用户名即邮箱的正则表达式
	var userPattern = /^[1-9a-zA-Z][0-9a-zA-Z]{2,16}@([0-9a-zA-Z]{2,10})\.(com|net|cn|org)$/;

	//获取用户名输入框
	var user = document.getElementById('username');
	//获取密码输入框
	var psw1 = document.getElementById('password1');
	//获取密码再次输入框
	var psw2 = document.getElementById('password2');
	//获取用户名输入提示
	var userText = document.getElementById('userText');
	//获取密码输入提示
	var passwordText1 = document.getElementById('passwordText1');
	//获取再次输入密码提示
	var passwordText2 = document.getElementById('passwordText2');
	//获取协议复选框
	var protocol = document.getElementById("protocol");
	//获取按钮
	var regBtn = document.getElementById('regBtn');
	//提示文本
	var tip = document.getElementById("tip");
	//存储检测邮箱是否已被注册的结果
	var userExist = false;

	//初始化按钮禁用
	if(protocol.checked) {
		regBtn.removeAttribute('disabled');
		regBtn.style.backgroundColor = '#3491C8';
	} else {
		regBtn.setAttribute('disabled', 'disabled');
		regBtn.style.backgroundColor = '#ccc';
	}

	//协议复选框改变事件
	protocol.onchange = function() {
		//		
		if(protocol.checked) {
			regBtn.removeAttribute('disabled');
			regBtn.style.backgroundColor = '#3491C8';
		} else {
			regBtn.setAttribute('disabled', 'disabled');
			regBtn.style.backgroundColor = '#ccc';
		}
		console.log();
	}

	//用户名输入框聚焦事件
	user.onfocus = function() {
			userText.innerHTML = '请按照邮箱格式输入，如:winkey@qq.com';
			userText.style.color = '#333';
		}
		//用户名输入框失焦事件
	user.onblur = function() {

		if(user.value == '') {
			userText.innerHTML = '用户名不能为空!';
			userText.style.color = '#f00';
		} else if(userPattern.exec(user.value)) {
			//检测邮箱是否已被注册
			var username = user.value;
			$.post('./php/checkUserExist.php', {
				username: username
			}, function(data) {
				if(data) {
					userText.innerHTML = '该邮箱已被注册！';
					userText.style.color = '#f00';
					userExist = false
				} else {
					userText.innerHTML = '该邮箱可用！';
					userText.style.color = '#0f0';
					userExist = true;
				}
			});
		} else {
			userText.innerHTML = '请输入正确的邮箱!';
			userText.style.color = '#f00';
		}
	}

	// 密码输入框聚焦事件
	psw1.onfocus = function() {
			passwordText1.innerHTML = '建议至少使用两种字符组合';
			passwordText1.style.color = '#333';
		}
		//密码输入框失焦事件
	psw1.onblur = function() {
			if(psw1.value == '') {
				passwordText1.innerHTML = '密码不能为空！';
				passwordText1.style.color = '#f00';
			}
		}
		//密码再次输入框聚焦事件
	psw2.onfocus = function() {
			passwordText2.innerHTML = '&nbsp;';
			passwordText2.style.color = '#333';
		}
		//密码再次输入框失焦事件
	psw2.onblur = function() {
		if(psw2.value == '') {
			passwordText2.innerHTML = '密码不能为空！';
			passwordText2.style.color = '#f00';
		} else if(psw2.value == psw1.value) {
			passwordText2.innerHTML = '两次输入的密码相同！';
			passwordText2.style.color = '#0f0';
		} else {
			passwordText2.innerHTML = '两次输入的密码不同！';
			passwordText2.style.color = '#f00';
		}
	}

	//ajax请求
	regBtn.onclick = function() {
		if(userPattern.exec(user.value) && psw2.value == psw1.value && psw2.value != '' && psw1.value != ''&& userExist) {
			var username = user.value;
			var passw = psw1.value;
			//			console.log(username,passw);
			$.post('./php/register.php', {
				username: username,
				passw: passw
			}, function(data) {
				if(data) {
					tip.innerHTML = '注册成功！';
					tip.style.color = '#0f0';
					setTimeout(function(){
						window.location.href = "index.html";
					},3000);
				}
			});
			user.onblur();
		} else {
			user.onblur();
			psw1.onblur();
			psw2.onblur();
		}
		return false;
	}

}