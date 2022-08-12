<?php

include("../config.php");

$idplato=$_GET['id'];

$sql="UPDATE platos SET eliminado ='1' WHERE id='$idplato'";
$query=mysqli_query($conn,$sql);

    if($query){
        Header("Location: ../platos.php");
    }
?>
