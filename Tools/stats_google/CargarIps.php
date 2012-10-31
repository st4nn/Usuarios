<?php 
   include("conectar.php"); 
   	$Fecha1 = $_POST['Fecha1'];
	$Fecha2 = $_POST['Fecha2'];
	
	$link=Conectarse();
	$sql = "
	SELECT 
		COUNT( IP ) AS 'CantIp', IP AS 'Ip'
	FROM 
		Estadisticas1
	WHERE 
		IO = 'in' AND (FECHA BETWEEN '$Fecha1' AND '$Fecha2') 
	GROUP BY (IP)
	";
	
	$result=mysql_query($sql,$link); 

$row = mysql_fetch_array($result);

		class Connections
	{
		public $CantIp;
		public $Ip;
	}
	$Index = 0;

	do 
	{ 
		$Connection[$Index] = new Connections();
		
		$Connection[$Index]->CantIp = $row['CantIp'];
		$Connection[$Index]->Ip = $row['Ip'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	echo json_encode($Connection);	
?> 


