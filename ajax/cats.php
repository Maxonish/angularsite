<?php
$data = json_decode(file_get_contents('php://input'), true);
if($data['sleep']=='true'){
	sleep(1);
}
$num=$data[num]*6;
$link = mysqli_connect('localhost','root','','main');
mysqli_set_charset($link,'utf8');
if ($res = mysqli_query($link,"SELECT * FROM `images` ORDER BY `id` ASC LIMIT $num,6")){
    $cats=array();
    for($i=0;$i<mysqli_num_rows($res); $i++){
    $cats[$i] =  mysqli_fetch_assoc($res);
    }
      echo json_encode($cats);
    }
