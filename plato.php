<?php  

class Plato
{
	function get(){
		$sql = "SELECT * FROM platos";
		global $cnx;
		return $cnx->query($sql);
	}
	
	function getById($id){
		$sql = "SELECT * FROM platos WHERE id=$id";
		global $cnx;
		return $cnx->query($sql);
	}
}