<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$Id = $_POST['Id'];
	
	$sql = "SELECT DISTINCT
				d.IdUsersData AS 'Id', 
				d.Name AS 'Name',
				d.NickName AS 'NickName',
				d.mail AS 'Mail', 
				c.Name AS 'Company', 
				d.urlFacebook AS 'urlFacebook',
				d.urlTwitter AS 'urlTwitter'
		FROM
				UsersData AS d,
				Company AS c,
				UsersTransactions AS r
		WHERE
			d.IdCompany = c.IdCompany AND
			r.Operation = 'Create' AND
			r.IdUser = d.IdUsersData AND
			r.IdMasterUser = '$Id';";
    
	$result = mysql_query($sql, $link);
	$row = mysql_fetch_array($result);
	
		class User
	{
		public $IdUser;
		public $Name;
		public $NickName;
		public $Mail;
		public $Company;
		public $urlFacebook;
		public $urlTwitter;
	}
	$Index = 0;
	do 
	{ 
		$Users[$Index] = new User();
		/*$Users->IdUser = $row['Id'];
		$Users->Name[$Index] = $row['Name'];
		$Users->NickName[$Index] = $row['NickName'];
		$Users->Mail[$Index] = $row['Mail'];
		$Users->Company[$Index] = $row['Company'];
		$Users->urlFacebook[$Index] = $row['urlFacebook'];
		$Users->urlTwitter[$Index] = $row['urlTwitter'];*/
		
		$Users[$Index]->IdUser = $row['Id'];
		$Users[$Index]->Name = $row['Name'];
		$Users[$Index]->NickName = $row['NickName'];
		$Users[$Index]->Mail = $row['Mail'];
		$Users[$Index]->Company = $row['Company'];
		$Users[$Index]->urlFacebook = $row['urlFacebook'];
		$Users[$Index]->urlTwitter = $row['urlTwitter'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	echo json_encode($Users);
	
?> 
