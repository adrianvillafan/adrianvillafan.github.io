<?php 
session_start();

include("config.php");
$platos = "SELECT * FROM platos";

if (!isset($_SESSION['username'])) {
    header("Location: index.php");
}
?>

<!doctype html>
<html lang="es">
  <head>
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

    <title>Platos</title>
  </head>

  <style>

    .container {
        max-width: 768px;
        padding-top: 8rem;
       
        
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

    <header style="top: 0;
    justify-content: center;
    margin: 50px auto 0 auto;
    position: absolute;" > <?php include 'options.html'; ?> </header>
    <br>
  

  <div class="content">
    
    <div class="container">      

      <div style="max-height: 550px;" class="table-responsive custom-table-responsive">

        <table class="table custom-table">
          <thead>
            <tr>  

              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Tiempo</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>

          <?php $resultado = mysqli_query($conn, $platos);
          while($row=mysqli_fetch_assoc($resultado) and $row['eliminado']==0) { ?>

          <tbody>
            
              
              <td>
                
                  <div>	
                      <label for="image" class="btn btn-secondary">
                      <a href="fotos_platos/fotoplato.php?id=<?php echo $row['id'];?>">
                        <img src='fotos_platos/vista.php?id=<?php echo $row['id'];?>' style="display: inline; max-height:125px; border-radius: 50%; padding: 6px 0 0 0px; margin:0;" />
                      </a>
                      
                      </label>
                  </div>
                    
              </td>
              <td>
                <?php echo $row['nombre'];?>
              </td>
              <td>
                <?php echo $row['tipo'];?>
                <small class="d-block"><?php echo $row['descripcion'];?></small>
              </td>
              <td>
                <?php echo $row['tiempo'];?> min.
              </td>
              <td>
                $ <?php echo $row['precio'];?>
              </td>
              <td>
                <a href="platos/actualizar.php?id=<?php echo $row['id'] ?>" class="btn btn-info">Editar</a>
              </td>
              <td>
                <a href="platos/delete.php?id=<?php echo $row['id'] ?>" class="btn btn-danger">Eliminar</a>
              </td>
            </tr>
            
            <tr class="spacer"><td colspan="100"></td></tr>

          
          </tbody>

          <?php } mysqli_free_result($resultado);?>
        </table>
      </div>


    </div>

  </div>
  
  
  <footer style="width: 100%;
top: 120%;
position: absolute;
padding-top: 8rem;"> <?php include 'footer.html'; ?> </footer>  

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>