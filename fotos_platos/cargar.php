<?php

include("../config.php");

$fotico = $_POST['id'];

if(isset($_POST["submit"])){
    $revisar = getimagesize($_FILES["image"]["tmp_name"]);
    if($revisar !== false){
        $image = $_FILES['image']['tmp_name'];
        $imgContenido = addslashes(file_get_contents($image));
        
        // Cerciorar la conexion
        if($conn->connect_error){
            die("Connection failed: " . $conn->connect_error);
        }
        
        //Insertar imagen en la base de datos
        
        $insertar = $conn->query("UPDATE platos SET foto = '$imgContenido' WHERE id = {$_GET['id']}");
        // COndicional para verificar la subida del fichero
        if($insertar){
            Header("Location: ../platos.php");
        }else{
            echo "Ha fallado la subida, reintente nuevamente.";
        } 
        // Sie el usuario no selecciona ninguna imagen
    }else{
        echo "Por favor seleccione imagen a subir.";
    }
}
?>