<!DOCTYPE html>

<html>
<head>
<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="platos/fonts/icomoon/style.css">

	<link rel="stylesheet" href="platos/css/owl.carousel.min.css">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="platos/css/bootstrap.min.css">

	<!-- Style -->
	<link rel="stylesheet" href="platos/css/style.css">
	<title>Carrito</title>

</head>
<body>

</body>
</html>
<?php 
@session_start();
?>
<?php if(count($_SESSION['detalle'])>0){?>
	<br>
	<center>
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
</center>
<?php }else{?>
	<br>
	<br>
	<center>
<div class="panel-body"><font color="white" size="4" color="" face="Algerian"> No hay productos agregados</font></div>
<br>
<a href="carrito.php">
			<button type="button" class="btn btn-primary"><font size="5" color="" face="">Volver</font></button>
</a>
    </center>			
<?php }?>

<script type="text/javascript" src="libs/ajax.js"></script>