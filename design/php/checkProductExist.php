<?php
//	$username = 'winkey527@qq.com';
	session_start();
	$username = $_SESSION['username'];
	
	$productname = $_POST['productname'];
	// $productname = "大叔牌小鱼干5";
try {
//	//获取data source name  数据源名
//	$dsn = "mysql:host=localhost;dbname=store";
//	//获取pdo对象
//	$pdo = new PDO($dsn,'root','');
	require('./connect.php');
	
	//执行字符集设定操作 
	$pdo->exec("SET NAMES utf8");

	
	$sql = "SELECT * FROM `shoppingcart` Where username=? and productname=?";
	//使用预处理获取结果集对象
	$stmt = $pdo->prepare($sql);
	//执行sql语句 
	$stmt->execute(array($username,$productname));//可加参数，代替sql语句中的?
	//获取结果
	$result = $stmt->fetchAll();
	//将数据库中取出的数据转换为json字符串 
	// echo json_encode($result);
//	 var_dump($result);
	// echo count($result);
	if(count($result)==1){
		echo json_encode($result);
	}else if(count($result)==0){
		echo 0;
	}
} catch (PDOException $e) {
		echo $e->getMessage();
}