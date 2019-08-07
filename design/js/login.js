$(function() {
	//定义正则表达式，
	//	var userPattern = /^[a-zA-Z][0-9a-zA-Z]{8,16}$/;
	//var pattern = /^[a-zA-Z][\w]{8,16}$/;
	var userPattern = /^[a-zA-Z][0-9a-zA-Z]{2,16}@([0-9a-zA-Z]{2,10})\.(com|net|cn|org)$/;
	//获取表单
	var form = document.getElementById('login');
	//获取用户名的input输入框
	var user = document.getElementById('username');
	//获取用户名输入提示
	var userText = document.getElementById('userText');
	//获取密码输入框
	var psw = document.getElementById('password');
	//获取密码输入提示框
	var passwordText = document.getElementById("passwordText");
	//获取登录按钮
	var loginBtn = document.getElementById('loginBtn');
	//获取错误提示
	var tip = document.getElementById("tip");
	//	console.log(loginBtn);
	//用户名聚焦事件
	user.onfocus = function() {
			userText.innerHTML = '用户名首位必须为字母'
			userText.style.color = '#000';
		}
		//用户名失焦事件
	user.onblur = function() {
			if(user.value == '') {
				userText.innerHTML = '用户名不能为空！'
				userText.style.color = '#f00';
			} else if(userPattern.exec(user.value)) {
				userText.innerHTML = '&nbsp;'
				userText.style.color = '#0f0';
			} else {
				userText.innerHTML = '请输入正确的邮箱！'
				userText.style.color = '#f00';
			}
		}
		//密码聚焦事件
	psw.onfocus = function() {
			passwordText.innerHTML = '';
		}
		//密码失焦事件
	psw.onblur = function() {
			if(psw.value == '') {
				passwordText.innerHTML = '密码不能为空！';
				passwordText.style.color = '#f00';
			} else {
				passwordText.innerHTML = '&nbsp;'
				passwordText.style.color = '#0f0';
			}
		}
		//登录按钮点击事件
	loginBtn.onclick = function() {
		if(userPattern.exec(user.value) && psw.value != '') {
			var username = user.value;
			var passw = psw.value;
			//			console.log(username,passw);

			$.post('./php/login.php', {
				username: username,
				passw: passw
			}, function(data) {
				if(data) {
					//					alert('登录成功！');
					tip.innerHTML = '登录成功！';
					tip.style.color = '#0f0';
					setTimeout(function(){
						window.location.href = "index.html";
					},3000);
				} else {
					tip.innerHTML = '账号或密码不正确！';
					tip.style.color = '#f00';
				}
				setTimeout(function() {
					tip.innerHTML = '&nbsp;';
					tip.style.color = '#0f0';
				}, 3000);
			});
		} else {
			user.onblur();
			psw.onblur();
		}

		return false;
	}

});