<?php 
   include("../../php/conectar.php"); 

	$Fecha1 = $_POST['Fecha1'];
	$Fecha2 = $_POST['Fecha2'];
	
	$link=Conectarse();
	$sql = "
	SELECT 
		Ip,
		Fecha,
		Hora,
		Conexiones,
		IO,
		URL
	FROM
		Estadisticas1
	WHERE 
		Fecha BETWEEN '$Fecha1' AND '$Fecha2'
	ORDER BY Id
	";
	
	$result=mysql_query($sql,$link); 

$row = mysql_fetch_array($result);

		class Connections
	{
		public $Fecha;
		public $Hora;
		public $Ip;
		public $Conexiones;
		public $IO;
		public $URL;
	}
	$Index = 0;
	
	do 
	{ 
		$Connection[$Index] = new Connections();
		
		$Connection[$Index]->Fecha = $row['Fecha'];
		$Connection[$Index]->Hora = $row['Hora'];
		$Connection[$Index]->Ip = $row['Ip'];
		$Connection[$Index]->Conexiones = $row['Conexiones'];
		$Connection[$Index]->IO = $row['IO'];
		$Connection[$Index]->URL = $row['URL'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	
	echo json_encode($Connection);
?>
