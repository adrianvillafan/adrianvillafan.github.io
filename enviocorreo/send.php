<?php

//librerias
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

//Load Composer's autoloader
//require 'vendor/autoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer(true);
$mail->IsSMTP();
try {
//Configuracion servidor mail
$mail->isHTML(true);
$mail->From = "adrianmarcelv@gmail.com"; //remitente
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'tls'; //seguridad
$mail->Host = "smtp.gmail.com"; // servidor smtp
$mail->Port = 25; //puerto
$mail->Username ='adrianmarcelv@gmail.com'; //nombre usuario
$mail->Password = 'tdkpelmpwriqcqcf'; //contraseña

$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
//Agregar destinatario
$mail->AddAddress($_POST['email']);
$mail->Subject = $_POST['subject'];
$mail->Body = $_POST['message'];

$mail->SMTPDebug = 2;


//Avisar si fue enviado o no y dirigir al index

$mail->send();
    
    echo "<script>location.href='../historial.php'</script>";

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}