<?php 
   require("conectar.php"); 

$NoFName = $_POST['NoFName'];

function CompanyVerify($Name)
{
	$link=Conectarse(); 
	$var = null;
	$sql = "SELECT IdCompany FROM Company WHERE Name = '$Name';";
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);
	if ($row['IdCompany'])
	{
		$var = $row['IdCompany'];
	} 
	return $var;
	mysql_close($link);	
}
	if ($NoFName)
	{echo CompanyVerify($NoFName);}
?> 
