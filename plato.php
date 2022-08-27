<?php  

class Plato
{
	function get(){
		$sql = "SELECT * FROM platos WHERE eliminado = 0";
		global $cnx;
		return $cnx->query($sql);
	}
	
	function getById($id){
		$sql = "SELECT * FROM platos WHERE id=$id";
		global $cnx;
		return $cnx->query($sql);
	}
}