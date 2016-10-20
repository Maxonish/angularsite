<?php
$link = mysqli_connect('localhost','root','','main');
mysqli_set_charset($link,'utf8');
$res = mysqli_query($link,"SELECT * FROM `images` ORDER BY `id` ASC");
    $num =  mysqli_num_rows($res)/6;
    echo ceil($num);
