<?php 
@session_start();



if (!isset($_SESSION['username'])) {
    header("Location: index.php");
}

require_once 'plato.php';
require_once 'config.php';

$objProducto = new Plato();
$resultado_producto = $objProducto->get();
?>

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

    <script src="libs/js/jquery.js"></script>
    <script src="libs/js/jquery-1.8.3.min.js"></script>
    <script src="libs/js/bootstrap.min.js"></script>
   	
    <script type="text/javascript" src="libs/ajax.js"></script>
    <script src="libs/js/alertify/lib/alertify.min.js"></script>

    <link rel="stylesheet" href="libs/js/alertify/themes/alertify.core.css" />
	<link rel="stylesheet" href="libs/js/alertify/themes/alertify.bootstrap.css" id="toggleCSS" />

   
    
</head>


<body>

    <div class="container">
 		
 		<div>
			<center ><?php include 'options.html'; ?>  </center>
		</div>
		<center>
          
 		<div class="row">


			<div class="col-md-4">	
				<div><font color="white" size="6" face="Algerian">Producto:</font>
				<select style="max-width: 100%;" name="cbo_producto" id="cbo_producto" class="col-md-2 form-control">
					<option value="0">Seleccione un producto</option>
					<?php foreach($resultado_producto as $producto):?>
						<option value="<?php echo $producto['id']?>"><?php echo $producto['nombre']?></option>
                      
					<?php endforeach;?>
				</select>
				</div>
			</div>




			<div class="col-md-4">
				<div><font color="white" size="6" face="Algerian">Cantidad:</font>
				  <input style="max-width: 100%;" id="txt_cantidad" name="txt_cantidad" type="text" class="col-md-2 form-control" placeholder="Ingrese cantidad" autocomplete="off" />
				</div>
			</div>




			<div class="col-md-1">
				<div style="margin-top: 45px;">
				<button type="button" class="btn btn-primary btn-agregar-producto">AGREGAR</button>
				</div>
			</div>
			<div class="col-md-1">
				<a href="carrito.php">
				<div style="margin-top: 45px;">
				<button type="button" class="btn btn-danger ">REFRESH</button>
				</div>
			    </a>
			</div>
			<div class="col-md-1">
				<a href="detalle.php">
				<div style="margin-top: 45px;">
				<button type="button" class="btn btn-primary ">DETALLES</button>
				</div>
			    </a>
			</div>



		</div>
		</center>
		<br>
		<center>
		<div class="panel panel-info">
			 <div class="panel-heading">
		        <h3 class="panel-title"><font color="white" size="6" face="Algerian" >Productos</font></h3>
		      </div>
			<div class="panel-body detalle-producto">
				<?php if(count($_SESSION['detalle'])>0){?>
					<table class="table custom-table" >
					    <thead>
					        <tr>
					            <th>Descripcion </th>
					            <th>Cantidad </th>
					            <th>Precio </th>
					            <th>Subtotal</th>
					            <th></th>
					        </tr>
					    </thead>
					    <tbody>
					    	<?php 
					    	foreach($_SESSION['detalle'] as $k => $detalle){ 
					    	?>
					        <tr>
					        	<td><?php echo $detalle['producto'];?> </td>
					            <td><?php echo $detalle['cantidad'];?> </td>
					            <td>$<?php echo $detalle['precio'];?> </td>
					            <td>$<?php echo $detalle['subtotal'];?> </td>
					            <td><button type="button" class="btn btn-sm btn-danger eliminar-producto" id="<?php echo $detalle['id'];?>">Eliminar</button></td>
					        </tr>
					        <?php }?>
					    </tbody>
					</table>
				<?php }else{?>
				<div class="panel-body"><font color="white" size="3" face="Algerian" > No hay productos agregados </font></div>
				<?php }?>
			</div>
		</div>
	</center>
 	</div>
 	<center>
 	<div class="col-md-12">
				<a href="detalle2.php">
				<div style="margin-top: 45px;">
				<button type="button" class="btn btn-success "><font size="8" face="Algerian">COMPRAR</font></button>
				</div>
			    </a>
			</div>
	</center>

    <script type="text/javascript" src="libs/ajax.js"></script>

</body>
</html>



