<?php 
   require("conectar.php"); 

 $RollName = $_POST['Name'];
 $RollDescription = $_POST['Description'];
 $Functions = $_POST['Functions'];
 
 $Obj = explode('@', $Functions);
 
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO Roll 
				(Name, Description)
			VALUES
				(
			'$RollName',   
			'$RollDescription'
				);";
				
	$result = mysql_query($sql, $link);
	
		if ($result)
		{
			
			$Values = "";
			foreach($Obj as $IdFunction)
					{
								$Values .= "('$IdFunction', '$IdUsuario'), ";
					}
			$Values = substr($Values, 0, -2); 
			
			
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
