<?php 
   include("conectar.php"); 
$User = $_POST['Usuario'];
$Pass = md5($_POST['Clave']);

class UserData
{
 var $Id;
 var $Name; 
 var $NickName;
 var $IdCompany;
 var $CompanyName;
 var $Email;
 var $urlFacebook;
 var $urlTwitter;
 var $IdInitialRoll;
 var $RollName;
 
 function __construct($Id, $Name, $NickName, $IdCompany, $CompanyName, $Email, $urlFacebook, $urlTwitter, $IdInitialRoll, $RollName)
	   {
	      $this->Id = $Id;
	      $this->Name = $Name;
	      $this->NickName = $NickName;
	      $this->IdCompany = $IdCompany;
	      $this->CompanyName = $CompanyName;
	      $this->Email = $Email;
	      $this->urlFacebook = $urlFacebook;
	      $this->urlTwitter = $urlTwitter;
	      $this->IdInitialRoll = $IdInitialRoll;
	      $this->RollName = $RollName;
	   }
}
	
	$link=Conectarse(); 
	$sql = "
		SELECT 
			l.IdLogin as 'Id', 
			d.Name as 'Name',
			d.NickName as 'NickName',
			d.IdCompany as 'IdCompany',
			c.Name as 'CompanyName',
			d.mail as 'Email',
			d.urlFacebook as 'urlFacebook',
			d.urlTwitter as 'urlTwitter',
			d.IdInitialRoll as 'IdInitialRoll',
			r.Name as 'RollName'
		FROM 
			Login AS l, UsersData AS d , Company AS c, Roll AS r
		WHERE
			r.idRoll = d.IdInitialRoll AND
			l.IdLogin = d.IdUsersData AND 
			d.IdCompany = c.IdCompany AND 
			State = 'Active' AND 
			l.User = '$User' AND l.Pass = '$Pass';";
				
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);

if ($row)
{
	$User = new UserData(  utf8_encode($row['Id']), 
							utf8_encode($row['Name']),
							utf8_encode($row['NickName']),
							utf8_encode($row['IdCompany']),
							utf8_encode($row['CompanyName']),
							utf8_encode($row['Email']),
							utf8_encode($row['urlFacebook']),
							utf8_encode($row['urlTwitter']),
							utf8_encode($row['IdInitialRoll']),
							utf8_encode($row['RollName'])
							);
}else
{
	$User = new UserData('','','','','','','','','','');
}
	echo json_encode($User);
	mysql_free_result($result); 
	mysql_close($link); 
?> 
