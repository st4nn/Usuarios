<?php 
   require("VerificarCompania.php"); 

 $Id = $_POST['Id'];
 
 $User = $_POST['User'];
 $Password = md5($_POST['Password']);
 
 $Name = $_POST['Name']; 
 $NickName = $_POST['NickName'];
 $Email = $_POST['Email'];
 $Company = $_POST['Company'];
 $urlFacebook = $_POST['urlFacebook'];
 $urlTwitter = $_POST['urlTwitter'];
 $IdInitialRoll = $_POST['IdRoll'];
 
 $CompanyId = CompanyVerify($Company); //Verfica que el nombre de la Compañía exista en la Base de Datos
	if (!$CompanyId)			
	{
		echo "Company not found";		//Si no existe no crea el Usuario y debe crear la Compañía en el fómulario de Crear Usuario
	}else
	{
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO Login 
				(User, Pass, State)
			VALUES
				(
			'$User',   
			'$Password',
			'Active'
				);";
				
	$result = mysql_query($sql, $link); 			
		if ($result)
		{
			$UserId = mysql_insert_id();			
			$sql = "INSERT INTO UsersData
						(IdUsersData, Name, NickName, mail, IdCompany, urlFacebook, urlTwitter, IdInitialRoll)
					VALUES
						(
						'$UserId', 
						'$Name', 
						'$NickName', 
						'$Email', 
						'$CompanyId', 
						'$urlFacebook', 
						'$urlTwitter', 
						'$IdInitialRoll');";		
	
			mysql_query($sql, $link);
				
				$Fecha = date('Y-m-d'); 
				
			$sql = "INSERT INTO UsersTransactions
						(IdUser, IdMasterUser, Operation, Date)
					VALUES
						(
						'$UserId', 
						'$Id', 
						'Create',
						'$Fecha')";		
						
			mysql_query($sql, $link); 
			echo $UserId;
		} else
		{
				if (mysql_errno() == 1062)
				{
					echo "The user already exists";
				} else
				{
					echo "The User was not created";	
				}
		}
		mysql_close($link); 
	}
?> 
