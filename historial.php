<?php 
session_start();

include("config.php");
$datos = "SELECT * FROM datos";

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

    <title>Datos</title>
  </head>

  <style>

    .container {
        max-width: 768px;
       
        
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

              <th scope="col">
                <label class="control control--checkbox">
                  <input type="button" , href="" />
                  <div class="control__indicator"></div>
                </label>
              </th>
              <th scope="col">Nombre</th>
              <th scope="col">Cant.</th>
              <th scope="col">Precio und.</th>
              <th scope="col">Precio Total</th>
            </tr>
          </thead>

          <?php $resultado = mysqli_query($conn, $datos);
          while($row=mysqli_fetch_assoc($resultado) and $row['eliminado']==0) { ?>

          <tbody>
            <tr scope="row">
              <th scope="row">
                <label class="control control--checkbox">
                  <input type="checkbox"/>
                  <div class="control__indicator"></div>
                </label>
              </th>
              <td>
                <?php echo $row['descripcion'];?>
              </td>
              <td>
                <?php echo $row['cantidad'];?>
                <!-- <small class="d-block">Far far away, behind the word mountains</small> -->
              </td>
              <td>
                $<?php echo $row['precio'];?>
              </td>
              <td>
                $ <?php echo $row['subtotal'];?>
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