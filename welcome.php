<?php

include 'config.php';

session_start();

/*$users = "SELECT * FROM users";
$resultado_usu = mysqli_query($conn, $users);
$row1 = mysqli_fetch_assoc($resultado_usu);
$_SESSION['username'] = $row1['username'];
$_SESSION['email'] = $row1['email'];*/

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
		padding-top: 2rem;
	}

	body {

		width: 100%;
		min-height: 100vh;
		background-image: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(bg.jpg);
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
    position: absolute;"><?php include 'options.html'; ?> </header>

	<section style="padding-top: 7%">
			<style>
			* {
				margin: 0;
				padding: 0
			}

			body {
				background-color: #000
			}

			.card {
				width: 350px;
				background-color: #efefef;
				border: none;
				cursor: pointer;
				transition: all 0.5s;
			}

			.image img {
				transition: all 0.5s
			}

			.card:hover .image img {
				transform: scale(1.5)
			}

			.btn {
				height: 140px;
				width: 140px;
				border-radius: 50%
			}

			.name {
				font-size: 22px;
				font-weight: bold
			}

			.idd {
				font-size: 14px;
				font-weight: 600
			}

			.idd1 {
				font-size: 12px
			}

			.number {
				font-size: 22px;
				font-weight: bold
			}

			.follow {
				font-size: 12px;
				font-weight: 500;
				color: #444444
			}

			.btn1 {
				height: 40px;
				width: 150px;
				border: none;
				background-color: #000;
				color: #aeaeae;
				font-size: 15px
			}

			.text span {
				font-size: 13px;
				color: #545454;
				font-weight: 500
			}

			.icons i {
				font-size: 19px
			}

			hr .new1 {
				border: 1px solid
			}

			.join {
				font-size: 14px;
				color: #a0a0a0;
				font-weight: bold
			}

			.date {
				background-color: #ccc
			}
		</style>

		<div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
			<div class="card p-4">
				<div class=" image d-flex flex-column justify-content-center align-items-center"> <button
						class="btn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100"
							width="100" style="display: inline;" /></button> <span><i class="fa fa-copy"></i></span><span class="name mt-3"><?php echo "<h1>Bienvenido " . $_SESSION['username'] . "</h1>"; ?></span> <span
						class="idd"><?php echo $_SESSION['email']; ?></span>
					<div class="d-flex flex-row justify-content-center align-items-center gap-2"> <span
							class="idd1"><?php echo $_SESSION['dni']; ?></span> </div>
					<!--<div class="d-flex flex-row justify-content-center align-items-center mt-3"> <span class="number">1069 <span
								class="follow">Followers</span></span> </div>-->
								<br/>
					<div class=" d-flex mt-2"> <button class="btn1 btn-dark">Edit Profile</button> </div>
					<div class="text mt-3"> <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital
							artwork.<br><br> Artist/ Creative Director by Day #NFT minting@ with FND night. </span> </div>
					<div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i
								class="fa fa-twitter"></i></span> <span><i class="fa fa-facebook-f"></i></span> <span><i
								class="fa fa-instagram"></i></span> <span><i class="fa fa-linkedin"></i></span> </div>
					<div class=" px-2 rounded mt-4 date "> <span class="join">Joined <?php echo $_SESSION['fecha_reg']; ?></span> </div>
				</div>
			</div>
		</div>
	</section>



	<footer style="width: 100%;
	top: 120%;
	position: absolute;
	padding-top: 8rem;"> <?php include 'footer.html'; ?> </footer>

</body>

</html>