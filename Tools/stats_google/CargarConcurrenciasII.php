<?php 
//http://localhost/usuarios/Tools/stats/CargarConcurrenciasII.php?Agrupacion=Dia&Fecha1=2012-09-01&Fecha2=2012-10-01&Avg=False
   include("conectar.php"); 
	$Agrupacion = $_POST['Agrupacion'];
	$Fecha1 = $_POST['Fecha1'];
	$Fecha2 = $_POST['Fecha2'];
	$Avg = $_POST['Avg'];
	
	$Order = "Id";
	
	if ($Agrupacion == "Hora")
	{
		$Campo = "Hora";
		$Funcion = "HOUR";
		$Label = "CONCAT( HOUR( Hora ) ,  ':00', ' ', Fecha )";
		$GROUPBY = "$Funcion($Campo), DAY(Fecha), MONTH(FECHA)";
		if ($Avg == "true")
		{
			$Funcion = "AVG";
			$Campo = "Conexiones";
			$GROUPBY = "HOUR(Hora)";	
			$Order = $GROUPBY;
			$Label = "CONCAT( HOUR( Hora ) ,  ':00')";
		}
	}
	elseif ($Agrupacion =="Dia")
	{
		$Campo = "Fecha";
		$Funcion = "DAY";
		$Label = "Fecha";
		$GROUPBY = "DAY(Fecha), MONTH(FECHA)";
		if ($Avg == 'true')
		{
			$Funcion = "AVG";
			$Campo = "Conexiones";
			$GROUPBY = "DATE_FORMAT(Fecha, '%W')";	
			$Label = "DATE_FORMAT(Fecha, '%W')";
			$Order = $GROUPBY;
		}
	}
	elseif ($Agrupacion =="Mes")
	{
		$Campo = "Fecha";
		$Funcion = "MONTH";
		$Label = "DATE_FORMAT(Fecha, '%M')";
		$GROUPBY = "MONTH(FECHA)";
		if ($Avg == 'true')
		{
			$Funcion = "AVG";
			$Campo = "Conexiones";
			$GROUPBY = "MONTH(Fecha)";	
			$Label = "DATE_FORMAT(Fecha, '%M')";
			$Order = "DATE_FORMAT(Fecha, '%m')";
		}
	}
	
	$link=Conectarse();
	$sql = "
	SELECT 
		Ip,
		Fecha,
		Hora,
		max(Conexiones) as 'Conexiones',
		IO,
		URL,
		$Funcion($Campo) AS 'Fecha2', 
			AVG( Conexiones ) AS 'Conexiones2',
		$Label AS FechaII
	FROM
		Estadisticas1
	WHERE 
		Fecha BETWEEN '$Fecha1' AND '$Fecha2'
	GROUP BY $GROUPBY
	ORDER BY $Order
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
		
		public $Conexiones2;
		public $Fecha2;
		public $FechaII;
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
		
		$Connection[$Index]->Conexiones2 = $row['Conexiones2'];
		$Connection[$Index]->Fecha2 = $row['Fecha2'];
		$Connection[$Index]->FechaII = $row['FechaII'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	
	echo json_encode($Connection);
?>
