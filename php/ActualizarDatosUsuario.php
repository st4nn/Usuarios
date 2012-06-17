<?php 
   include("conectar.php"); 

 $Id = $_POST['Id'];
 $Name = $_POST['Name']; 
 $State = $_POST['State']; 
 $NickName = $_POST['NickName'];
 $Email = $_POST['Email'];
 $urlFacebook = $_POST['urlFacebook'];
 $urlTwitter = $_POST['urlTwitter'];
 
	$link=Conectarse(); 

	$sql = "
		UPDATE UsersData SET
			Name = '$Name', 
			NickName = '$NickName', 
			mail = '$Email', 
			urlFacebook = '$urlFacebook', 
			urlTwitter = '$urlTwitter' 
		WHERE
			IdUsersData = '$Id';";
				
	mysql_query($sql, $link); 
	echo mysql_affected_rows();
	mysql_close($link); 
?> 
