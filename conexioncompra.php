<?php


    $usuario = "root"; //en este caso root por ser localhost
    $password = "";  //contraseña por si tiene algun servicio de hosting 
    $servidor = "localhost"; //localhost por lo del xampp
    $basededatos ="login_register"; //nombre de la base de datos



$conexion = mysqli_connect  ($servidor,$usuario,"") or die ("Error con el servidor de la Base de datos"); 


$db = mysqli_select_db($conexion, $basededatos) or die ("Error conexion al conectarse a la Base de datos");



    $descripcion=$_POST['descripcion']; 
    $cantidad=$_POST['cantidad']; 
    $precio=$_POST['precio']; 
    $subtotal=$_POST['subtotal']; 

    $sql="INSERT INTO datos VALUES ('$descripcion','$cantidad','$precio','$subtotal')";
    

    $ejecutar=mysqli_query($conexion, $sql);



    if(!$ejecutar){
    	 echo '<script>alert("hubo algun error")</script> ';
         echo "<script>location.href='carrito.php'</script>";	
    }else{
        echo '<script>alert("Compra realizada gracias")</script> ';
        
        echo "<script>location.href='carrito.php'</script>";	
    }
     
?>﻿