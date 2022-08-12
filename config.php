<?php 

$manejador="mysql";
$server = "localhost";
$user = "root";
$pass = "";
$database = "login_register";

$conn = mysqli_connect($server, $user, $pass, $database);

$cadena="$manejador:host=$server;dbname=$database";
$cnx = new PDO($cadena,$user,$pass);

if (!$conn) {
    die("<script>alert('Connection Failed.')</script>");
}

?>