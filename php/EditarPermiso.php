<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$obj = substr($_POST['Functions'], 0, -1);
	$IdUsuario = $_POST['IdUser'];
	$IdInitialRoll = $_POST['IdInitialRoll'];
	
	$Functions = explode('@', $obj);
	
	$sql = "DELETE FROM Permissions WHERE IdPermission <> 0 AND IdLogin = '$IdUsuario';";	
	mysql_query($sql, $link);
	$Values = "";
	foreach($Functions as $IdFunction)
					{
								$Values .= "('$IdFunction', '$IdUsuario'), ";
					}
			$Values = substr($Values, 0, -2); 
		$sql = "INSERT INTO Permissions (idFunction, IdLogin) VALUES $Values;";
		mysql_query($sql, $link);
		
	echo mysql_affected_rows();
	
		$sql = "UPDATE UsersData SET IdInitialRoll = '$IdInitialRoll' WHERE IdUsersData ='$IdUsuario'";
		mysql_query($sql, $link);
?> 
