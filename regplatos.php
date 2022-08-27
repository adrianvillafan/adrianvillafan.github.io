<?php

include 'config.php';

error_reporting(0);

session_start();

if (!isset($_SESSION['username'])) {
	header("Location: index.php");
}

if (isset($_POST['submit'])) {
	$nombre = $_POST['nombre'];
	$descripcion = $_POST['descripcion'];
	$tipo = $_POST['tipo'];
	$tiempo = $_POST['tiempo'];
	$precio = $_POST['precio'];


	$sql = "INSERT INTO platos (nombre, tipo, tiempo, precio, eliminado) VALUES ('$nombre', '$tipo', '$tiempo','$precio', '0')";
	$result = mysqli_query($conn, $sql);
	if ($result) {
		echo "<script>alert('Plato registrado correctamente')</script>";
		$nombre = "";
		$descripcion = "";
		$tipo = "";
		$tiempo = "";
		$precio = "";

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

	<header style="top: 0;
    justify-content: center;
    margin: 50px auto 0 auto;
    position: absolute;"> <?php include 'options.html'; ?> </header>

	<div class="container" style="margin-top: 150px;">
		<form action="" method="POST" class="login-email">
			<p class="login-text" style="font-size: 2rem; font-weight: 800;">¿Nuevo plato?</p>

			<div class="input-group">
				<input type="text" placeholder="Nombre" name="nombre" value="<?php echo $nombre; ?>" required>
			</div>

			<div class="input-group">
				<input type="text" placeholder="Descripción" name="descripcion" value="<?php echo $descripcion; ?>" required>
			</div>

			<div  class="input-group">
				<select style="width: 100%; height: 100%; border: 2px solid #e7e7e7; padding: 10px 20px;font-size: 1rem; border-radius: 30px; background: transparent; outline: none; transition: .3s;" class="input-group" name="tipo" value="<?php echo $tipo; ?>"><option class='form-control'>frio</option><option class='form-control'>caliente</option></select>
				
			</div>

			<div class="input-group">
				<input type="number" step="5" placeholder="Tiempo" name="tiempo" value="<?php echo $tiempo; ?>" required>
			</div>

			<div class="input-group">
				<input type="number" placeholder="Precio" name="precio" value="<?php echo $precio; ?>" required>
			</div>

			<div class="input-group">
				<button name="submit" class="btn">Registrar</button>
			</div>

		</form>
	</div>
</body>

</html>