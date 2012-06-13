<?php 
   include("conectar.php"); 

 $Id = $_POST['Id'];
 $OldPassword = $_POST['OldPassword'];
 $NewPassword = $_POST['NewPassword']; 

	$link=Conectarse(); 
	$sql = "UPDATE 
				Login 
			SET
				Pass = '" . md5($NewPassword) . "'
			WHERE 
				IdLogin = '" . $Id .  "' 
			AND 
				Pass = '" . md5($OldPassword) . "';";
				
	mysql_query($sql, $link); 
	echo mysql_affected_rows();

	mysql_close($link); 
?> 
