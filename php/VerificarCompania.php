<?php 
   require("conectar.php"); 
function CompanyVerify($Name)
{
//	$Name = $_POST['Name'];
							
	$link=Conectarse(); 
	$var = null;
	$sql = "SELECT IdCompany FROM Company WHERE Name = '$Name';";
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);
	if ($row['IdCompany'])
	{
		$var = $row['IdCompany'];
	} 
	echo $var;
	mysql_close($link);	
}
 
?> 
