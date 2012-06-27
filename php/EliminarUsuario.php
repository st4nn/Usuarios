<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$i = 0;
	$Index = 0;	
	$Id = $_POST['Id'];
	$IdOwn = $Id;
	
	class Users
	{
		public $IdUser;
	}
	
do
{

	$sql = "SELECT DISTINCT
				IdUser
		FROM
				UsersTransactions 
		WHERE
			Operation = 'Create' AND
			IdMasterUser = '$Id';";
			
	$result = mysql_query($sql, $link);
	$row = mysql_fetch_array($result);
	
	do
	{ 
		$User[$Index] = new Users();
		
		$User[$Index]->IdUser = $row['IdUser'];
		
		if ($User[$Index]->IdUser)
		{
			$Index++;	
		}
		
	} while($row = mysql_fetch_array($result));

				$Id = $User[$i]->IdUser;
					$i++;
				
} while ($i <= $Index);
		$User[$Index] = new Users();
		$User[$Index]->IdUser = $IdOwn;
	
	$Afectadas = 0;
	for($i=0;$i<=$Index;$i++)
	{
		$sql = "DELETE FROM UsersTransactions WHERE idUsersTransactions <> '0' AND IdMasterUser = '" . $User[$i]->IdUser . "' ;";
		mysql_query($sql, $link);
		$sql = "DELETE FROM Permissions WHERE IdPermission <> '0' AND IdLogin = '" . $User[$i]->IdUser . "' ;";
		mysql_query($sql, $link);
		$sql = "DELETE FROM UsersData WHERE IdUsersData = '" . $User[$i]->IdUser . "' ;";
		mysql_query($sql, $link);
		$Afectadas += mysql_affected_rows();
		$sql = "DELETE FROM Login WHERE IdLogin = '" . $User[$i]->IdUser . "' ;";
		$Afectadas += mysql_affected_rows();
		mysql_query($sql, $link);
	}
		
	mysql_close($link);	
	echo $Afectadas;
?> 
