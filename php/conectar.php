<?php 
function Conectarse() 
{ 
   if (!($link=mysql_connect("cehis.net","broncoce","jhonathan.21"))) 
   { 
      echo "Error conectando a la base de datos."; 
      exit(); 
   } 
   if (!mysql_select_db("broncoce_bronco",$link)) 
   { 
      echo "Error seleccionando la base de datos."; 
      exit(); 
   } 
   return $link; 
} 
?>
