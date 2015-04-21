<?php
session_start();




$code=$_POST['code'];


$mysqli=mysqli_connect('localhost','root','','academics');
$query = "DELETE FROM `courses`
WHERE (`code` = '$code');";

$result = mysqli_query($mysqli,$query)or die(mysqli_error($mysqli));
if($result)
    echo 1;
?>
