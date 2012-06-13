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
<script type='text/javascript' src='https://s3.amazonaws.com/cehis.net-streamingplayer/player5-7/jwplayer.js'></script>
<div id='mediaspace'>This text will be replaced</div>
<script type='text/javascript'>
  jwplayer('mediaspace').setup({
    'flashplayer': 'https://s3.amazonaws.com/cehis.net-streamingplayer/player5-7/player.swf',
    'author': 'CeHis.net Streaming Provider',
    'file': '" . $Stream . "',
    'title': '" . $Titulo .  "',
    'backcolor': '" . $Color->Atras . "',
    'frontcolor': '" . $Color->Frente . "',
    'lightcolor': '" . $Color->Luz . "',
    'screencolor': '" . $Color->Pantalla . "',
    'skin': 'http://bronco.cehis.net/wizardvideo/skins/$Skin.zip',
    'volume': '" . $Volumen . "',
    'plugins': 'viral-2',
    'streamer': '" . $Servidor . "',    
    'autostart': '" . $Autostart . "',
    'controlbar': '" . $Panel . "',
    'width': '" . $Ancho . "',
    'height': '" . $Alto . "'
  });
</script>
<!-- Fin codigo CeHis/net -->";

echo $cadena;
?>
