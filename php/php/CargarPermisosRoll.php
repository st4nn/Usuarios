<?php 
	$IdRoll = $_POST['IdRoll'];
   include("conectar.php"); 

	$link=Conectarse(); 
	$sql = "
		SELECT IdRoll_has_Function, IdFunction
		FROM 
			Roll_has_Function 
		WHERE
			idRoll = '$IdRoll'
		ORDER BY IdRoll;";
				
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);

			class Permissions
	{
		public $IdRecord;
		public $IdFunction;
	}
	$Index = 0;
	do 
	{ 
		$Permission[$Index] = new Permissions();
		
		$Permission[$Index]->IdRecord = $row['IdRoll_has_Function'];
		$Permission[$Index]->IdFunction = $row['IdFunction'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	echo json_encode($Permission);
?> 
