<?php 
   include("conectar.php"); 
	
	$Roll = $_POST['Id_Roll'];

	$link=Conectarse(); 
	$sql = "
		SELECT r.IdRollChildren As 'IdRoll', d.Name AS 'Name'
			FROM Roll as d,
				 Roll_has_Roll as r
			WHERE r.IdRollParent = '$Roll' AND
					r.IdRollChildren = d.IdRoll;";
				
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);

	do{
        	echo '<option value="'.$row['IdRoll'].'">'. utf8_encode($row['Name']) .'</option>';
       } while ($row = mysql_fetch_array($result)) ;

	mysql_free_result($result); 
	mysql_close($link); 
?> 
