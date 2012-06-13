<?php 
   include("conectar.php"); 

class UserData
{
 var $Id;
 var $Name; 
 var $NickName;
 var $CompanyName;
 var $Email;
 var $urlFacebook;
 var $urlTwitter;
 
 function __construct($Id, $Name, $NickName, $CompanyName, $Email, $urlFacebook, $urlTwitter)
	   {
	      $this->Id = $Id;
	      $this->Name = $Name;
	      $this->NickName = $NickName;
	      $this->CompanyName = $CompanyName;
	      $this->Email = $Email;
	      $this->urlFacebook = $urlFacebook;
	      $this->urlTwitter = $urlTwitter;
	   }
}
$User = new UserData(  $_POST['Id']), 
						$_POST['Name']),
						$_POST['NickName']),
						$_POST['CompanyName']),
						$_POST['Email']),
						$_POST['urlFacebook']),
						$_POST['urlTwitter'])
							);
							
	$link=Conectarse(); 
	sql = "SELECT IdCompany FROM Company WHERE Name = '" . $User->CompanyName .  "';";
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);
	if ($row)
	{
		$User->CompanyName = $row['IdCompany'];
	} else
	{
		
	}
	
	$sql = "
		UPDATE UsersData SET
		Name = " . $User->Name . ", 
		NickName = " . $User->NickName . ", 
		mail = " . $User->Email . ", 
		IdCompany = " . $User->CompanyName . ", 
		urlFacebook = " . $User->urlFacebook . ", 
		urlTwitter = " . $User->urlTwitter . " 
		WHERE
			IdUsersData = '" . $User->Id . "'";
				
	$result=mysql_query($sql, $link); 
	
	mysql_close($link); 
?> 
