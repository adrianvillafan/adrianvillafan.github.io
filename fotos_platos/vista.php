<?php

include("../config.php");

if(!empty($_GET['id'])){
    
    if($conn->connect_error){
       die("Connection failed: " . $conn->connect_error);
    }
    
    //Extraer imagen de la BD mediante GET
    $result = $conn->query("SELECT foto FROM platos WHERE id = {$_GET['id']}");
    
    if($result->num_rows > 0){
        $imgDatos = $result->fetch_assoc();
        
        //Mostrar Imagen
        header("Content-type: image/jpg"); 
        echo $imgDatos['foto']; 
    }else{
        echo 'Imagen no existe...';
    }
}
?>