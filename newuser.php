<?php
session_start();




$contact=$_POST['number'];
$name=$_POST['name'];
$pwd=$_POST['pwd'];
$level=$_POST['type'];
$email=$_POST['email'];


$mysqli=mysqli_connect('localhost','root','','academics');
$query = "INSERT INTO `users` (`number`, `name`, `email`, `password`, `type`)
VALUES ('$contact', '$name', '$email','$pwd', '$level')";

$result = mysqli_query($mysqli,$query)or die(mysqli_error($mysqli));
if($result)
    echo 1;
?>
