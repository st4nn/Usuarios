<?php 
   include("conectar.php"); 
$Idioma = $_POST['Idioma'];

class Idioma
{
 var $Id;
 var $Welcome; 
 var $Home;
 var $Tools;
 var $Analytics;
 var $MyAccount;
 var $Logout;
 
 var $CustomPlayer;
 var $ExportCode;
 
 var $PersonalInformation;
 var $CustomTemplate;
 
 var $Name;
 var $DisplayName;
 var $Email;
 var $Company;
 var $Save;
 
 
 
 function __construct($Id, $Welcome, $Home, $Tools, $Analytics, $MyAccount, $Logout, $CustomPlayer, $ExportCode, $PersonalInformation, $CustomTemplate, $Name, $DisplayName, $Email, $Company, $Save)
	   {
	      $this->Id = $Id;
	      $this->Welcome = $Welcome;
	      $this->Home = $Home;
	      $this->Tools = $Tools;
	      $this->Analytics = $Analytics;
	      $this->MyAccount = $MyAccount;
	      $this->Logout = $Logout;
	      
	      $this->CustomPlayer = $CustomPlayer;
	      $this->ExportCode = $ExportCode;
	      
	      $this->PersonalInformation = $PersonalInformation;
	      $this->CustomTemplate = $CustomTemplate;
	      
	      $this->Name = $Name;
		  $this->DisplayName = $DisplayName;
		  $this->Email = $Email;
		  $this->Company = $Company;
		  $this->Save = $Save;
	   }
}
	
	$link=Conectarse(); 
	$sql = "
		SELECT *
		FROM 
			Language
		WHERE
			IdLanguage = '$Idioma';";
				
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);

if ($row)
{
	$EtiquetasLenguage = new Idioma(  utf8_encode($row['IdLanguage']), 
							utf8_encode($row['Welcome']),
							utf8_encode($row['Home']),
							utf8_encode($row['Tools']),
							utf8_encode($row['Analytics']),
							utf8_encode($row['MyAccount']),
							utf8_encode($row['Logout']),
							utf8_encode($row['CustomPlayer']),
							utf8_encode($row['ExportCode']),
							utf8_encode($row['PersonalInformation']),
							utf8_encode($row['CustomTemplate']),
							utf8_encode($row['Name']),
							utf8_encode($row['DisplayName']),
							utf8_encode($row['Email']),
							utf8_encode($row['Company']),
							utf8_encode($row['Save'])
							);
}else
{
	$EtiquetasLenguage = null;
}
	echo json_encode($EtiquetasLenguage);
	mysql_free_result($result); 
	mysql_close($link);
?> 
