<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$Id = $_POST['Id'];
	
	$sql = "UPDATE Login 
			SET 
				state = 'Inactive'
			WHERE
				IdLogin = '$Id';";
    
	mysql_query($sql, $link);
	echo mysql_affected_rows();
	mysql_close($link);		
	
?> 
