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
		$GROUPBY = "$Funcion($Campo), DAY(Fecha), MONTH(FECHA)";
		if ($Avg == "true")
		{
			$GROUPBY = "HOUR(Hora)";	
			$Order = $GROUPBY;
		}
	}
	elseif ($Agrupacion =="Dia")
	{
		$GROUPBY = "DAY(Fecha), MONTH(FECHA)";
		if ($Avg == 'true')
		{
			$GROUPBY = "DATE_FORMAT(Fecha, '%W')";	
			$Order = $GROUPBY;
		}
	}
	elseif ($Agrupacion =="Mes")
	{
		$GROUPBY = "MONTH(FECHA)";
		if ($Avg == 'true')
		{
			$GROUPBY = "MONTH(Fecha)";	
			$Order = "DATE_FORMAT(Fecha, '%m')";
		}
	}
	
	$link=Conectarse();
	$sql = "
	SELECT 
		SUM(Conexiones) AS 'ConexionesTotales', 
		COUNT(DISTINCT (ip)) AS 'IpUnicas'
	FROM
		Estadisticas1
	WHERE 
		Fecha BETWEEN '$Fecha1' AND '$Fecha2'
	GROUP BY $GROUPBY
	ORDER BY $Order
	";
	
	$result=mysql_query($sql,$link); 
	
	$sql = "
	SELECT
		MONTH( Fecha ) AS 'IdMes', 
		SUM( Conexiones ) AS 'ConexionesXmes'
	FROM 
		estadisticas1
	WHERE 
		Fecha BETWEEN '$Fecha1' AND '$Fecha2'
		AND io = 'in '
	GROUP BY  MONTH(Fecha) 
	";
	
	$result2=mysql_query($sql,$link); 
	


$row = mysql_fetch_array($result);
$row2 = mysql_fetch_array($result2);

		class ClaseDatos
	{
		public $ConexionesTotales;
		public $IpUnicas;
		public $IdMes;
		public $ConexionesXmes;
	}
	$Index = 0;
	

	
	do 
	{ 
		$Datos[$Index] = new ClaseDatos();
		
		$Datos[$Index]->ConexionesTotales = $row['ConexionesTotales'];
		$Datos[$Index]->IpUnicas = $row['IpUnicas'];	
		$Datos[$Index]->IdMes = $row['Fecha'];
		$Datos[$Index]->ConexionesXmes = $row['Hora'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	
	echo json_encode($Datos);
?>
