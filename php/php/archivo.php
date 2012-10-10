<?php 
  $ar=fopen("datos.txt","a") or 
    die("Problemas en la creacion"); 
  fputs($ar,'Nombre'); 
  fputs($ar,"\n"); 
  fputs($ar,'comentarios'); 
  fputs($ar,"\n"); 
  fputs($ar,"--------------------------------------------------------"); 
  fputs($ar,"\n"); 
  fclose($ar); 
  echo "Los datos se cargaron correctamente."; 
  ?> 
