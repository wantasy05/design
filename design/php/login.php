<?php
	$username = $_POST['username'];
	$psw = $_POST['passw'];
try {
//	//获取data source name  数据源名
//	$dsn = "mysql:host=localhost;dbname=store";
//	//获取pdo对象
//	$pdo = new PDO($dsn,'root','');
	require('./connect.php');
	//执行字符集设定操作 
	$pdo->exec("SET NAMES utf8");

	
	$sql = "SELECT * FROM `user` Where username=? and password=?";
	//使用预处理获取结果集对象
	$stmt = $pdo->prepare($sql);
	//执行sql语句 
	$stmt->execute(array($username,$psw));//可加参数，代替sql语句中的?
	//获取结果
	$result = $stmt->fetchAll();
	if(count($result)==1){
		session_start();
		$_SESSION['username'] = $username;
		echo true;
	}else if(count($result)==0){
		echo false;
	}
} catch (PDOException $e) {
		echo $e->getMessage();
}