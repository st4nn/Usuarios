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
 
 $CompanyId = CompanyVerify($Company); //Verfica que el nombre de la Compañía exista en la Base de Datos
	if (!$CompanyId)			
	{
		echo "Company not found";		//Si no existe no crea el Usuario y debe crear la Compañía en el fómulario de Crear Usuario
	}else
	{
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO Login 
				(User, Pass)
			VALUES
				(
			'$User',   
			'$Password'
				);";
				
	$result = mysql_query($sql, $link); 			
		if ($result)
		{
			$UserId = mysql_insert_id();			
			$sql = "INSERT INTO UsersData
						(IdUsersData, Name, NickName, mail, IdCompany, urlFacebook, urlTwitter)
					VALUES
						(
						'$UserId', 
						'$Name', 
						'$NickName', 
						'$Email', 
						'$CompanyId', 
						'$urlFacebook', 
						'$urlTwitter')";		
	
			mysql_query($sql, $link);
		
			$sql = "INSERT INTO UsersTransactions
						(IdUser, IdMasterUser, Operation)
					VALUES
						(
						'$UserId', 
						'$Id', 
						'Create')";		
						
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