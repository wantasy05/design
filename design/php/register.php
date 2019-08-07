<?php
	$username = $_POST['username'];
	$psw = $_POST['passw'];
	
	session_start();
	$_SESSION['username'] = $username;
	
try {
//	//获取data source name  数据源名
//	$dsn = "mysql:host=localhost;dbname=store";
//	//获取pdo对象
//	$pdo = new PDO($dsn,'root','');
	
	require('./connect.php');

	//执行字符集设定操作 
	$pdo->exec("SET NAMES utf8");
	$sql = "INSERT INTO user(username,password) VALUES (?,?)";
	//使用预处理获取结果集对象
	$stmt = $pdo->prepare($sql);
	//执行sql语句 
	$stmt->execute(array($username,$psw));//可加参数，代替sql语句中的?
	echo true;
} catch (PDOException $e) {
		echo $e->getMessage();
}