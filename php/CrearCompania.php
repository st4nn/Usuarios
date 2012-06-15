<?php 
   require("conectar.php"); 

function CompanyCreate($Name, $Url, $Contact, $IdOwn)
{
	$link=Conectarse(); 
	$sql = "INSERT INTO Company
					(Name, url, Contact, IdOwn)
				VALUES
					(
					'$Name', 
					'$Url', 
					'$Contact', 
					'$IdOwn');";
	
	mysql_query($sql, $link); 
	$CompanyId = mysql_insert_id();
	
	return $CompanyId;
	mysql_close($link);	
}
	$Name = $_POST['Name'];	
	$Url = $_POST['Url']; 
	$Contact = $_POST['Contact']; 
	$IdOwn = $_POST['IdOwn']; 
	
echo CompanyCreate($Name, $Url, $Contact, $IdOwn);
?> 
