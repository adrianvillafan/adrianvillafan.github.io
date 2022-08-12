<?php

include("../config.php");

$id=$_POST['id'];
$nombre=$_POST['nombre'];
$tipo=$_POST['tipo'];
$precio=$_POST['precio'];
$tiempo=$_POST['tiempo'];

$sql="UPDATE platos SET nombre='$nombre',tipo='$tipo',precio='$precio' ,tiempo='$tiempo' WHERE id='$id'";
$query=mysqli_query($conn,$sql);

    if($query){
        Header("Location: ../platos.php");
    }
?>