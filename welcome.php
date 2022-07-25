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
	<!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="platos/fonts/icomoon/style.css">

    <link rel="stylesheet" href="platos/css/owl.carousel.min.css">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="platos/css/bootstrap.min.css">
    
    <!-- Style -->
    <link rel="stylesheet" href="platos/css/style.css">

	<title>Inicio</title>
</head>

<style>

.container {
	max-width: 768px;
	/*padding-top: 25rem;*/
}

body {

width: 100%;
min-height: 100vh;
background-image: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(bg.jpg);
background-position: center;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;

}
</style>

<body>
	<header> <?php include 'options.html'; ?> </header>
	
	<section style="padding-top: 16rem">
    	<h2> <?php echo "<h1>Bienvenido de nuevo " . $_SESSION['username'] . "</h1>"; ?> </h2>
		<?php include 'perfil.html'; ?>
	</section>



	<footer style="width: 100%;
	top: 120%;
	position: absolute;
	padding-top: 8rem;"> <?php include 'footer.html'; ?> </footer>  
    
</body>

</html>