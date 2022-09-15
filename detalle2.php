<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="platos/fonts/icomoon/style.css">

	<link rel="stylesheet" href="platos/css/owl.carousel.min.css">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="platos/css/bootstrap.min.css">

	<!-- Style -->
	<link rel="stylesheet" href="platos/css/style.css">
	<title>Carrito</title>

	<link href="libs/css/bootstrap.css" rel="stylesheet">
 <script src="libs/js/jquery.js"></script>
    <script src="libs/js/jquery-1.8.3.min.js"></script>
    <script src="libs/js/bootstrap.min.js"></script>
   	
    <script type="text/javascript" src="libs/ajax.js"></script>
    <link rel="shortcut icon" href="carro.png">
	

    <link rel="stylesheet" href="libs/js/alertify/themes/alertify.core.css" />
	<link rel="stylesheet" href="libs/js/alertify/themes/alertify.bootstrap.css" id="toggleCSS" />
    <script src="libs/js/alertify/lib/alertify.min.js"></script>

    <link rel="stylesheet" type="text/css" href="estilocompra.css">

</head>
<body>

</body>
</html>
<?php 
@session_start();
?>
<?php if(count($_SESSION['detalle'])>0){?>
	<table class="table custom-table">
	    <thead>
	        <tr>
	            <th>Descripcion</th>
	            <th>Cantidad</th>
	            <th>Precio</th>
				<th>Subtotal</th>
	            <th></th>
	        </tr>
	    </thead>
	    <tbody>
	    	<?php 
	    	$total = 0;
	    	foreach($_SESSION['detalle'] as $k => $detalle){ 
			$total += $detalle['subtotal'];
	    	?>
	        <tr>
	        	<td><?php echo $detalle['producto'];?></td>
	            <td><?php echo $detalle['cantidad'];?></td>
	            <td>$<?php echo $detalle['precio'];?></td>
				<td>$<?php echo $detalle['subtotal'];?></td>
	            <td><button type="button" class="btn btn-sm btn-danger eliminar-producto" id="<?php echo $detalle['id'];?>">Eliminar</button></td>



	        </tr>
	        <?php }?>
	        <tr>
	        	<td colspan="3" class="text-right">Total</td>
	        	<td>$<?php echo $total;?></td>
	        	<td></td>
	        </tr>
	    </tbody>
	</table>
	
		<div class="form">
			<form action="conexioncompra.php" method="POST">
<center>
<br>
<br>

<input type="text" name="nombre_c" placeholder="Nombre de Cliente" required>

<input type="text" name="dni" placeholder="DNI" required>

<input type="text" name="precio" placeholder="Precio" value=<?php echo $total;?> required>

<input type="email" name="email" placeholder="Email" required>

<br>
<br>
<input type="submit" value="Comprar">


</center>
			</form>
		</div>


<?php }else{?>
	<br>
	<br>
	<center>
<div class="panel-body"><font size="4" color="" face="Algerian"> No hay productos agregados</font></div>
<br>
<a href="index.php">
			<button type="button" class="btn btn-primary"><font size="5" color="" face="">Regresar</font></button>
</a>
    </center>			
<?php }?>

<script type="text/javascript" src="libs/ajax.js"></script>
