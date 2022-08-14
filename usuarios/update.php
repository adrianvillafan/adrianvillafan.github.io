<?php

include("../config.php");

$id=$_POST['id'];
$username=$_POST['username'];
$email=$_POST['email'];
$dni=$_POST['dni'];
$resumen=$_POST['resumen'];

$sql="UPDATE users SET username='$username',email='$email',dni='$dni' ,resumen='$resumen' WHERE id='$id'";
$query=mysqli_query($conn,$sql);

    if($query){
        Header("Location: ../welcome.php");
    }
?>