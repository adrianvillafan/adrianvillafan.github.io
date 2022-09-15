<?php


    $usuario = "root"; //en este caso root por ser localhost
    $password = "";  //contraseña por si tiene algun servicio de hosting 
    $servidor = "localhost"; //localhost por lo del xampp
    $basededatos ="login_register"; //nombre de la base de datos



$conexion = mysqli_connect  ($servidor,$usuario,"") or die ("Error con el servidor de la Base de datos"); 


$db = mysqli_select_db($conexion, $basededatos) or die ("Error conexion al conectarse a la Base de datos");



    $nombre_c=$_POST['nombre_c']; 
    $dni=$_POST['dni']; 
    $precio=$_POST['precio']; 
    $email=$_POST['email'];
    $fecha = date("Y-m-d");
    $mensajePie = "Gracias por su compra";

    $sql="INSERT INTO datos ( nombre_c , dni , precio , email) VALUES ('$nombre_c','$dni','$precio','$email')";
    

    $ejecutar=mysqli_query($conexion, $sql);

    



    //if(!$ejecutar){
    //	 echo '<script>alert("hubo algun error")</script> ';
    //     echo "<script>location.href='carrito.php'</script>";	
    //}else{
     //   echo '<script>alert("Compra realizada gracias")</script> ';
        
     //   echo "<script>location.href='carrito.php'</script>";	
    //}
     
?>

<html>
<html lang="es">
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <!-- StylejQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

        <!-- jsPDF library -->
        <script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
   
    <title>Comprobante de Venta</title>
</head>
<body>
    <div id="calor">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-10 ">
                <h1>Comprobante de Venta</h1>
            </div>
            <div class="col-xs-2">
                <img class="img img-responsive" src="A.png" alt="Logotipo">
        </div>
    </div>

    <hr>

    <div class="row">
        <div class="col-xs-10">
            <h1 class="h6"><?php echo $nombre_c ?></h1>
            <h1 class="h6"><?php echo $dni ?></h1>
            <h1 class="h6"><?php echo $email ?></h1>
        </div>
        <div class="col-xs-2 text-center">
            <strong>Fecha</strong>
            <br>
            <?php echo $fecha ?>
        </div>
    </div>

    <hr>

    <div class="row text-center" style="margin-bottom: 2rem;">
        <div class="col-xs-6">
            <h1 class="h2">Cliente</h1>
            <strong><?php echo $nombre_c ?></strong>
        </div>
        <div class="col-xs-6">
            <h1 class="h2">Remitente</h1>
            <strong>Muy Muy Barra Cevichera</strong>
        </div>
    </div>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.1/dist/html2canvas.min.js"></script> 

    <!--
      Después de eso, cargar el script que contiene nuestra lógica
    -->
    <script> 
        
                  
                
    </script>

<?php 
@session_start();
?>
<?php if(count($_SESSION['detalle'])>0){?>
    <div id="contenedor" class="row">
    <div class="col-xs-12">
	<table class="table table-condensed table-bordered table-striped">
	    <thead>
	        <tr>
	            <th>Descripcion</th>
	            <th>Cantidad</th>
	            <th>Precio</th>
				<th>Subtotal</th>
	            
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

	        </tr>
	        <?php }?>
	        <tr>
	        	<td colspan="3" class="text-right">Total</td>
	        	<td>$<?php echo $total;?></td>
	        	<td></td>
	        </tr>
	    </tbody>
	</table>
    </div>
    </div>
    <div class="row">
        <div class="col-xs-12 text-center">
            <p class="h5"><?php echo $mensajePie ?></p>
        </div>
    
        
    </div>
    <div id="elementH"></div>    
    </div>
    <div class="col-xs-12 text-center">
        <h1>Enviar mail</h1>
    
        <form method="POST" action="enviocorreo/send.php">
        <label for="subject">Asunto:
            <input type="text" name="subject" id="subject" value="Comprobante de pago Muy Muy">
        </label>
        <br>
        <label for="email">Email destinatario:
            <input type="email" name="email" value=<?php echo $email;?> id="email">
        </label>
        <br>
        
        <label for="message">Mensaje:
            <textarea type=text name="message" id="message" >
                
            <?php echo $detalle['producto'];?>

            </textarea>
        </label>
        <br>
        <input type="submit" value="Send">
        </form>
    </div>
    <?php }?>
    

</body>




