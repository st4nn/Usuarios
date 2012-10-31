<?php 
//http://localhost/usuarios/Tools/stats/CargarConcurrenciasII.php?Agrupacion=Dia&Fecha1=2012-09-01&Fecha2=2012-10-01&Avg=False
   include("conectar.php"); 
	
	$Fecha1 = $_POST['Fecha1'];
	$Fecha2 = $_POST['Fecha2'];
	
	$Order = "Id";
	
	$link=Conectarse();
	$sql = "
	SELECT 
		HOUR(HORA) AS 'Fecha',
		max(Concurrencias) AS 'maxConcurrencias',
		AVG( Concurrencias ) AS 'avgConcurrencias',
		Sum( Concurrencias ) AS 'sumConcurrencias',
		(COUNT( Concurrencias )/2) AS 'countConcurrencias',
		COUNT(DISTINCT( ip )) AS 'IpUnicas'
	FROM
		Estadisticas1
	WHERE 
		Fecha BETWEEN '$Fecha1' AND '$Fecha2'
	GROUP BY HOUR(HORA), DAY(Fecha)
	ORDER BY Id
	";
	
	$result=mysql_query($sql,$link); 

	$row = mysql_fetch_array($result);

		class Connections
	{
		public $Fecha;
		public $maxConcurrencias;
		public $avgConcurrencias;
		public $sumConcurrencias;
		public $IpUnicas;
		public $countConcurrencias;
	}
	$Index = 0;
	
	do 
	{ 
		$Connection[$Index] = new Connections();

		$Connection[$Index]->Fecha = $row['Fecha'];
		$Connection[$Index]->maxConcurrencias = $row['maxConcurrencias'];
		$Connection[$Index]->avgConcurrencias = $row['avgConcurrencias'];
		$Connection[$Index]->sumConcurrencias = $row['sumConcurrencias'];
		$Connection[$Index]->IpUnicas = $row['IpUnicas'];
		$Connection[$Index]->countConcurrencias = $row['countConcurrencias'];
				
		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	
	echo json_encode($Connection);
?>
