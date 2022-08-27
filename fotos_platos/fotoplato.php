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
        <link href="../platos/css/style.css" rel="stylesheet">
        <title>Actualizar</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        
    </head>
    <body>
                <div class="container mt-5">
                    <form method="POST" action="cargar.php?id=<?php echo $row['id'];?>" enctype="multipart/form-data">
                    
                                <input type="hidden" name="id" value="<?php echo $row['id'];?>">
                                <div>	
                                    <label for="image" class="btn btn-secondary">
                                    <input type="hidden" name="id" value="<?php echo $row['id'];?>">  
                                    <input class="btn btn-secondary" type="file" id="image" name="image" style="opacity: 0;display: none;">
                                    <img src='vista.php?id=<?php echo $row['id'];?>' style="display: inline; max-height:125px; border-radius: 50%; padding: 6px 0 0 0px; margin:0;" />
                                    </label>
                                </div>
                                
                            <input type="submit" name="submit" class="btn btn-primary btn-block" value="Actualizar">
                    </form>
                    
                </div>
    </body>
</html>