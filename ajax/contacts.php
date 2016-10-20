<?php
$data = json_decode(file_get_contents('php://input'), true);	
$link = mysqli_connect('localhost','root','','main');
mysqli_set_charset($link,'utf8');


if(isset($data) && !empty($data)){
	mysqli_query($link,"INSERT INTO  messages (name,message) VALUES ('".mysqli_real_escape_string($link,$data['name'])."', '".mysqli_real_escape_string($link,$data['message'])."')") or mysqli_error($link);
	echo 'success';
}