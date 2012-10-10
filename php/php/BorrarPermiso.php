<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$IdPermission = $_POST['IdPermission'];
		
	$sql = "DELETE FROM Permissions WHERE IdPermission = '$IdPermission'";
	mysql_query($sql, $link);
	echo mysql_affected_rows();
	
	mysql_close($link);	
?> 
