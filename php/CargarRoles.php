<?php 
   include("conectar.php"); 
	
	$Roll = $_POST['Id_Roll'];

		class Rolls
	{
		public $RollId;
		public $RollName;
	}
	$link=Conectarse(); 
	$sql = "
		SELECT r.IdRollChildren As 'IdRoll', d.Name AS 'Name'
			FROM Roll as d,
				 Roll_has_Roll as r
			WHERE r.IdRollParent = '$Roll' AND
					r.IdRollChildren = d.IdRoll;";
				
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);
	
	$Index = 0;
	do{
		$Rolles[$Index] = new Rolls();
		
		$Rolles[$Index]->RollId = $row['IdRoll'];
		$Rolles[$Index]->RollName = $row['Name'];
		$Index++;
       } while ($row = mysql_fetch_array($result)) ;

	echo json_encode($Rolles);
	mysql_free_result($result); 
	
	mysql_close($link); 
?> 
