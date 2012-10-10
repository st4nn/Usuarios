<?php 
   include("../../php/conectar.php"); 
	$Agrupacion = $_POST['Agrupacion'];
	$Fecha1 = $_POST['Fecha1'];
	$Fecha2 = $_POST['Fecha2'];
	
	if ($Agrupacion == "Hora")
	{
		$Campo = "Hora";
		$Funcion = "HOUR";
		$Label = "CONCAT( HOUR( Hora ) ,  ':00', ' ', Fecha )";
		$GROUPBY = "$Funcion($Campo), DAY(Fecha), MONTH(FECHA)";
	}
	elseif ($Agrupacion =="Dia")
	{
		$Campo = "Fecha";
		$Funcion = "DAY";
		$Label = "Fecha";
		$GROUPBY = "DAY(Fecha), MONTH(FECHA)";
	}
	elseif ($Agrupacion =="Mes")
	{
		$Campo = "Fecha";
		$Funcion = "MONTH";
		$Label = "DATE_FORMAT(Fecha, '%M')";
		$GROUPBY = "MONTH(FECHA)";
	}
	
	$link=Conectarse();
	$sql = "
	SELECT 
		$Funcion($Campo) AS 'Fecha', 
		COUNT( Conexiones ) AS 'Conexiones',
		$Label AS FechaII
	FROM Estadisticas1
	WHERE 
		IO = 'in' AND (Fecha BETWEEN '$Fecha1' AND '$Fecha2') 
	GROUP BY $GROUPBY
	ORDER BY Id
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


