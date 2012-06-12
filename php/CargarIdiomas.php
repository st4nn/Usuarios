<?php 
   include("conectar.php"); 

	$link=Conectarse(); 
	$sql = "
		SELECT IdLanguage, Language
		FROM 
			Language ORDER BY IdLanguage;";
				
	$result=mysql_query($sql, $link); 
	$row = mysql_fetch_array($result);

	do{
        	echo '<option value="'.$row['IdLanguage'].'">'. utf8_encode($row['Language']) .'</option>';
	} while ($row = mysql_fetch_array($result)) ;

	mysql_free_result($result); 
	mysql_close($link); 
?> 
