<?php 
   include("../conectar.php"); 
	$Agrupacion = $_POST['Agrupacion'];
	
	if ($Agrupacion == "Hora")
	{
		$Campo = "Hora";
		$Funcion = "HOUR";
		$Label = "CONCAT( HOUR( Hora ) ,  ':00' )";
	}
	elseif ($Agrupacion =="Dia")
	{
		$Campo = "Fecha";
		$Funcion = "DAY";
		$Label = "Fecha";
	}
	elseif ($Agrupacion =="Mes")
	{
		$Campo = "Fecha";
		$Funcion = "MONTH";
		$Label = "MONTH(Fecha)";
	}
	
	$link=Conectarse();
	$sql = "
	SELECT 
		$Funcion($Campo) AS 'Fecha', 
		COUNT( Conexiones ) AS 'Conexiones',
		$Label AS FechaII
	FROM Estadisticas1
	WHERE 
		IO = 'in'
	GROUP BY $Funcion($Campo) 
	";
	
	$result=mysql_query($sql,$link); 

$row = mysql_fetch_array($result);

		class Connections
	{
		public $Fecha;
		public $Conexiones;
		public $FechaII;
	}
	$Index = 0;

	do 
	{ 
		$Connection[$Index] = new Connections();
		
		$Connection[$Index]->Fecha = $row['Fecha'];
		$Connection[$Index]->Conexiones = $row['Conexiones'];
		$Connection[$Index]->FechaII = $row['FechaII'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	echo json_encode($Connection);	
?> 


