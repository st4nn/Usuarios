<?php 
   include("VerificarCompania.php"); 
   $Name = $_GET['Name'];
    $CompanyId = CompanyVerify($Name); //Verfica que el nombre de la Compañía exista en la Base de Datos
	if (!$CompanyId)			
	{
	 echo "Company not found";		//Si no existe no crea el Usuario y debe crear la Compañía en el fómulario de Crear Usuario
	} else
	{
		echo "Todo Bello";
	}
?>
