<?php
 class Color
{
	public $Atras;
	public $Frente;
	public $Luz;
	public $Pantalla;
}
$Color = new Color();

$Stream = $_POST['Stream'];
$Titulo = $_POST['Titulo'];

$Color->Atras = $_POST['Color_Atras'];
$Color->Frente = $_POST['Color_Frente'];
$Color->Luz = $_POST['Color_Luz'];
$Color->Pantalla = $_POST['Color_Pantalla'];
$Skin = $_POST['Skin'];

$Volumen = $_POST['Volumen'];
$Servidor = $_POST['Servidor'];
$Autostart = $_POST['Autostart'];
$Panel = $_POST['Panel'];
$Ancho = $_POST['Ancho'];
$Alto = $_POST['Alto'];

$cadena =
"<!-- Inicia codigo CeHis/net -->
<embed src='https://s3.amazonaws.com/cehis.net-streamingplayer/player5-7/player.swf' 
height='" . $Alto . "' 
width='" . $Ancho . "' 
bgcolor='" . $Color->Atras . "' 
allowscriptaccess='always' 
allowfullscreen='true' 
flashvars='&author=CeHis.net Streaming Provider" . 
"&file=" . $Stream . "
&backcolor=" . $Color->Atras . 
"&frontcolor=" . $Color->Frente . 
"&lightcolor=" . $Color->Luz .
"&screencolor=" . $Color->Pantalla .
"&skin=http://bronco.cehis.net/wizardvideo/skins/$Skin.zip
&volume=" . $Volumen .
"&plugins=viral-2h
&streamer=$Servidor &title=$Titulo&viral.pluginmode=FLASH
&autostart=" . $Autostart .
"&controlbar=" . $Panel . 
"&width=" . $Ancho . 
"&height=" . $Alto . "'/>
<!-- Fin codigo CeHis/net -->";

echo $cadena;
?>
