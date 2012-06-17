<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$Id = $_POST['Id'];
	
	$sql = "SELECT DISTINCT
				l.IdLogin AS 'Id', 
				d.Name AS 'Name',
				d.NickName AS 'NickName',
				d.mail AS 'Mail', 
				c.Name AS 'Company',
				d.urlFacebook AS 'urlFacebook',
				d.urlTwitter AS 'urlTwitter',
				l.State as 'State'
		FROM
				Login AS l, 
				UsersData AS d,
				Company AS c,
				UsersTransactions AS r
		WHERE
			l.IdLogin = d.IdUsersData AND 
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
		public $State;
	}
	$Index = 0;
	do 
	{ 
		$Users[$Index] = new User();
		
		$Users[$Index]->IdUser = $row['Id'];
		$Users[$Index]->Name = $row['Name'];
		$Users[$Index]->NickName = $row['NickName'];
		$Users[$Index]->Mail = $row['Mail'];
		$Users[$Index]->Company = $row['Company'];
		$Users[$Index]->urlFacebook = $row['urlFacebook'];
		$Users[$Index]->urlTwitter = $row['urlTwitter'];
		$Users[$Index]->State = $row['State'];

		$Index++;
	} while($row = mysql_fetch_array($result));

	mysql_close($link);	
	echo json_encode($Users);
?> 
