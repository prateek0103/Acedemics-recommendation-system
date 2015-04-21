<?php
session_start();
$username = $_POST['number'];
$password = $_POST['pwd'];

$status=0;

$mysqli=mysqli_connect('localhost','root','','academics');

$query="SELECT * FROM `users` WHERE `number` = '$username' AND `password` = '$password';";
$result = mysqli_query($mysqli,$query)or die(mysqli_error($mysqli));
$num_row = mysqli_num_rows($result);

		$row=mysqli_fetch_array($result);
		if( $num_row==1) {
            switch($row['type']){
                case 1: echo 1; //user
            break;
            
            case 2: echo 2; //admin
            break;
            
            default: echo 3; //error
            break;
		}}
else
{
echo 3;
    exit(3);
}
		

$query="INSERT INTO `log` (`time`, `user`, `action`)
VALUES (now(), '$username', 'LoggedIn');";
$result = mysqli_query($mysqli,$query)or die(mysqli_error($mysqli));
?>
