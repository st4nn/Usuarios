<?php 
   require("conectar.php"); 
	$link=Conectarse(); 
	
	$i = 0;
	$Index = 0;	
	$Id = $_POST['Id'];
	
	class User
	{
		public $IdUser;
		public $Name;
		public $NickName;
		public $Mail;
		public $Owner;
		public $IdCompany;
		public $Company;
		public $urlFacebook;
		public $urlTwitter;
		public $State;
	}
	
Busqueda:

	$sql = "SELECT DISTINCT
				l.IdLogin AS 'Id', 
				d.Name AS 'Name',
				d.NickName AS 'NickName',
				d.mail AS 'Mail', 
				o.Name AS 'Owner', 
				c.Name AS 'Company',
				c.IdCompany AS 'IdCompany',
				d.urlFacebook AS 'urlFacebook',
				d.urlTwitter AS 'urlTwitter',
				l.State as 'State'
		FROM
				Login AS l, 
				UsersData AS d,
				UsersData AS o,
				Company AS c,
				UsersTransactions AS r
		WHERE
			l.IdLogin = d.IdUsersData AND 
			d.IdCompany = c.IdCompany AND
			r.Operation = 'Create' AND
			r.IdMasterUser = o.IdUsersData AND
			r.IdUser = d.IdUsersData AND
			r.IdMasterUser = '$Id';";
			
	$result = mysql_query($sql, $link);
	$row = mysql_fetch_array($result);
	
	do
	{ 
		$Users[$Index] = new User();
		
		$Users[$Index]->IdUser = $row['Id'];
		$Users[$Index]->Name = $row['Name'];
		$Users[$Index]->NickName = $row['NickName'];
		$Users[$Index]->Mail = $row['Mail'];
		$Users[$Index]->Owner = $row['Owner'];
		$Users[$Index]->IdCompany = $row['IdCompany'];
		$Users[$Index]->Company = $row['Company'];
		$Users[$Index]->urlFacebook = $row['urlFacebook'];
		$Users[$Index]->urlTwitter = $row['urlTwitter'];
		$Users[$Index]->State = $row['State'];

		if ($Users[$Index]->IdUser)
		{
			$Index++;	
		}
		
	} while($row = mysql_fetch_array($result));

			$Id = $Users[$i]->IdUser;
			
			$i++;
			if ($i <= $Index)
			{
				goto Busqueda;
			}
end:			
		
	mysql_close($link);	
	echo json_encode($Users);
?> 
