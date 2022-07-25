<?php

include 'config.php';

error_reporting(0);

session_start();

if (!isset($_SESSION['username'])) {
	header("Location: index.php");
}

if (isset($_POST['submit'])) {
	$nombre = $_POST['nombre'];
	$tipo = $_POST['tipo'];
	$tiempo = $_POST['tiempo'];


	$sql = "INSERT INTO platos (nombre, tipo, tiempo, eliminado) VALUES ('$nombre', '$tipo', '$tiempo', '0')";
	$result = mysqli_query($conn, $sql);
	if ($result) {
		echo "<script>alert('Plato registrado correctamente')</script>";
		$nombre = "";
		$tipo = "";
		$tiempo = "";
	} else {
		echo "<script>alert('Ha ocurrido un error, vuelve a intentarlo')</script>";
	}
}

?>

<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

	<link rel="stylesheet" type="text/css" href="style.css">

	<title>Registro</title>
</head>

<body>

	<header> <?php include 'options.html'; ?> </header>

	<div class="container">
		<form action="" method="POST" class="login-email">
			<p class="login-text" style="font-size: 2rem; font-weight: 800;">¿Nuevo plato?</p>

			<div class="input-group">
				<input type="text" placeholder="Nombre" name="nombre" value="<?php echo $nombre; ?>" required>
			</div>

			<div class="input-group">
				<input type="tipo" placeholder="Tipo" name="tipo" value="<?php echo $tipo; ?>" required>
			</div>

			<div class="input-group">
				<input type="tipo" placeholder="Tiempo" name="tiempo" value="<?php echo $tiempo; ?>" required>
			</div>

			<div class="input-group">
				<button name="submit" class="btn">Registrar</button>
			</div>

		</form>
	</div>
</body>

</html>