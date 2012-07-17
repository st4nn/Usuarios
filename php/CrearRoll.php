<?php 
   require("conectar.php"); 

 $RollName = $_POST['Name'];
 $RollDescription = $_POST['Description'];
 $Functions = $_POST['Functions'];
 
 $Obj = explode('@', $Functions);
 
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO Roll 
				(Name, Description)
			VALUES
				(
			'$RollName',   
			'$RollDescription'
				);";
	
	$result = mysql_query($sql, $link);
	$RollId = mysql_insert_id();
	
		if ($result)
		{
			$Values = "";
			foreach($Obj as $IdFunction)
					{
								$Values .= "('$RollId', '$IdFunction'), ";
					}
			$Values = substr($Values, 0, -2); 
			
			$sql = "INSERT INTO Roll_has_Function
						(idRoll, idFunction)
					VALUES $Values;";
	
			mysql_query($sql, $link);
				
		} else
		{
					echo "The User was not created";	
		}
		mysql_close($link); 
?> 
