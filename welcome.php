<?php 

session_start();

if (!isset($_SESSION['username'])) {
    header("Location: index.php");
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

	<link rel="stylesheet" type="text/css" href="style.css">

	<title>Inicio</title>
</head>
<body>
    <?php echo "<h1>Bienvenido de nuevo " . $_SESSION['username'] . "</h1>"; ?>
	
	<footer>
	<a href="logout.php">Cerrar Sesion</a>
	</footer>
    
</body>

</html>