<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$Id = $_GET['Id'];
	
	$sql = "SELECT
				p.IdPermission AS 'IdPermission',
				p.IdFunction AS 'IdFunction',
				f.Name AS 'Name',
				f.Description AS 'Description',
				f.AssociatedControl AS 'AssociatedControl'
			FROM
				Permissions AS p,
				Function AS f
			WHERE
				p.IdFunction = f.IdFunction AND
				p.IdLogin = '$Id';";
    
    
	$result = mysql_query($sql, $link);
	$row = mysql_fetch_array($result);
	
		class Permissions
	{
		public $IdPermission;
		public $IdFunction;
		public $Name;
		public $Description;
		public $AssociatedControl;
	}
	$Index = 0;
	
	do 
	{ 
		$Permission[$Index] = new Permissions();
		
		$Permission[$Index]->IdPermission = $row['IdPermission'];
		$Permission[$Index]->IdFunction = $row['IdFunction'];
		$Permission[$Index]->Name = $row['Name'];
		$Permission[$Index]->Description = $row['Description'];
		$Permission[$Index]->AssociatedControl = $row['AssociatedControl'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	echo json_encode($Permission);
?> 
