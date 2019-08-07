<?php
//	$username = "winkey527@qq.com";
	session_start();
	$username = $_SESSION['username'];
	
	$productname = $_POST['productname'];
	// echo $productname;
	
	// $productname = "凤祥牌凤梨酥";
try {
//	//获取data source name  数据源名
//	$dsn = "mysql:host=localhost;dbname=store";
//	//获取pdo对象
//	$pdo = new PDO($dsn,'root','');
	
	require('./connect.php');

	//执行字符集设定操作 
	$pdo->exec("SET NAMES utf8");

	
	// $sql = "SELECT * FROM `user` Where username=? and password=?";
	$sql = "DELETE FROM shoppingcart WHERE username=? and productname=?";
	//使用预处理获取结果集对象
	$stmt = $pdo->prepare($sql);
	//执行sql语句 
	$stmt->execute(array($username,$productname));//可加参数，代替sql语句中的?
	// echo "true";
} catch (PDOException $e) {
		echo $e->getMessage();
}