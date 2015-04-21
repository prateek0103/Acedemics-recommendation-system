<?php
session_start();




$code=$_POST['code'];
$name=$_POST['name'];
$desc=$_POST['desc'];


$mysqli=mysqli_connect('localhost','root','','academics');
$query = "INSERT INTO `courses` (`code`, `name`, `desc`)
VALUES ('$code', '$name', '$desc')";

$result = mysqli_query($mysqli,$query)or die(mysqli_error($mysqli));
if($result)
    echo 1;
?>
