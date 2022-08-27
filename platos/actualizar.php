<?php 
    include("../config.php");

$idplato=$_GET['id'];

$sql="SELECT * FROM platos WHERE id='$idplato'";
$query=mysqli_query($conn,$sql);

$row=mysqli_fetch_array($query);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/style.css" rel="stylesheet">
        <title>Actualizar</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        
    </head>
    <body>
                <div class="container mt-5">
                    <form action="update.php" enctype="multipart/form-data" method="POST">
                    
                                <input type="hidden" name="id" value="<?php echo $row['id']  ?>">
                                
                                <input type="text" class="form-control mb-3" name="nombre" placeholder="nombre" value="<?php echo $row['nombre']  ?>">
                                <input type="text" class="form-control mb-3" name="descripcion" placeholder="descripcion" value="<?php echo $row['descripcion']  ?>">
                                <input type="text" class="form-control mb-3" name="tipo" placeholder="tipo" value="<?php echo $row['tipo']  ?>">
                                <input type="text" class="form-control mb-3" name="tiempo" placeholder="tiempo" value="<?php echo $row['tiempo']  ?>">
                                <input type="text" class="form-control mb-3" name="precio" placeholder="precio" value="<?php echo $row['precio']  ?>">
                                
                                
                            <input type="submit" class="btn btn-primary btn-block" value="Actualizar">
                    </form>
                    
                </div>
    </body>
</html>