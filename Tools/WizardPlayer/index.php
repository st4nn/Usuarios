<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>CeHis Wizard Player</title>
		
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="Tools/WizardPlayer/css/tooltips.css" />

<link rel="stylesheet" type="text/css" href="Tools/ShadowBox/shadowbox.css">
<script type="text/javascript" src="Tools/ShadowBox/shadowbox.js"></script>
<script type="text/javascript" src="Tools/WizardPlayer/funciones.js"></script>

<script type="text/javascript">
Shadowbox.init({language: "es", players: ['html']}); 
</script>

</head>
<body>

<div id="Layer1">
  <form id="form1" name="form1" method="post">
  <div class="content">
    <div class="content_fixed">
      <div class="mainbar">
        <div class="article">
          <h2><span>Generar Reproductor:</span></h2>
		  
  <table  border="0" id="tabla">
    <tr>
      <td>Reproductor</td>
      <td><select name="cboReproductor" id="cboReproductor" onchange="cambiar_reproductor(this, cboTipoServidor, txtAlto, txtAncho)">
	  <option value="null">Seleccione un Reproductor</option>
	  <option value="FFmp3">FFmp3</option>
		<option value ="JWplayer">JWplayer</option>
		</select></td>
      <td><a href="#" class="tooltip">(?)<span>Es la herramienta por la cual su audiencia recibir&aacute; el Audio<br />
        Ej: JWplayer</span></a> </td>
	   </tr>
	       <tr>
      <td>Tipo de Servidor</td>
      <td><select name="cboTipoServidor" id="cboTipoServidor" onchange="Validar_TipoServidor(this)">
        <option value ="Icecast">Icecast</option>
		<option value="SHOUTcast">SHOUTcast</option>
	</select></td>
      <td><a href="#" class="tooltip">(?)<span>El Nombre de la plataforma a través de la cual se hace la transferencia de Audio<br />
        Ej: Icecast</span></a> </td>
	   </tr>
    <tr>
      <td>Servidor</td>
      <td><input name="cboServidor" type="text" id="cboServidor" value="http://sc1.cehis.net" /></td>
      <td><a href="#" class="tooltip">(?)<span>Es la direcci&oacute;n de qui&eacute;n aloja y/o provee el servicio de audio<br />
        Ej: http://sc1.cehis.net:</span></a> </td>
    </tr>
	   <tr>
      <td>Puerto</td>
      <td><input name="txtPuerto" type="text" id="txtPuerto" onblur="Validar_Entero(this, 'Puerto', cboTipoServidor)"/>
	  <a href="#" class="tooltip"></a>	  </td>
      <td><a href="#" class="tooltip">(?)<span><br />
        8020</span></a></td>
    </tr>
    <tr>
      <td>Punto de Montaje</td>
      <td><input name="txtPuntodeMontaje" type="text" id="txtPuntodeMontaje"  onblur="Validar_PuntoMontaje(this)"/></td>
      <td><a href="#" class="tooltip">(?)<span>*Solo Aplica para Icecast <br> (Mount point) Es el Punto de Montaje por el cual esta emitiendo su se&ntilde;al <br />
        Ej: /stream</span></a> </td>
    </tr>
	  <tr>
      <td>Skins FFmp3</td>
      <td><select name="cboSkin" id="cboSkin" onchange="Tamano_Predeterminado(this, txtAlto, txtAncho)">
        <option value = "ffmp3-mcclean.xml">Mcclean</option>
		<option value = "ffmp3-tweety.xml">Tweety</option>
		<option value = "ffmp3-scradio.xml">SCRadio</option>
		<option value = "ffmp3-compact.xml">Compact</option>
		<option value = "ffmp3-repvku-100.xml">Repvku-100</option>
		<option value = "ffmp3-repvku-115x25.xml">Repvku-115</option>
		<option value = "ffmp3-darkconsole.xml">DarkConsole</option>
		<option value = "ffmp3-eastanbul.xml">Eastanbul</option>
		<option value = "ffmp3-substream.xml">Substream</option>
		<option value = "ffmp3-oldradio.xml">OldRadio</option>
		<option value = "ffmp3-oldstereo.xml">OldStereo</option>
		<option value = "ffmp3-xm.xml">Xm</option>
		<option value = "ffmp3-neon.xml">Neon</option>
		<option value = "ffmp3-neonslim.xml">NeonSlim</option>
		<option value = "ffmp3-greyslim.xml">GreySlim</option>
		<option value = "ffmp3-testskin.xml">Test/Develop</option>
		</select></td>
      <td><a href="#" class="tooltip">(?)<span>Es la cara al usuario del Reproductor<br />
        Ej: SCRadio</span></a> </td>
    </tr>
	<tr>
      <td>Skins JWplayer id</td>
      <td><select name="cboSkinJW" id="cboSkinJW" onchange="Tamano_PredeterminadoJW(this, txtAlto, txtAncho)">
        <option value = "3dpixelstyle.swf">3D Pixel Style</option>
		<option value = "atomicred.swf">Atomicred</option>
		<option value = "chelseaskin.swf">Chelsea</option>
		<option value = "comet.swf">Comet</option>
		<option value = "controlpanel.swf">Control Panel</option>
		<option value = "dangdang.swf">Dangdang</option>
		<option value = "fashion.swf">Fashion</option>
		<option value = "festival.swf">Festival</option>
		<option value = "magma.swf">Magma</option>
		<option value = "metarby10.swf">Metarby10</option>
		<option value = "neon.swf">Neon</option>
		<option value = "pearlized.swf">Pearlized</option>
		<option value = "pixelize.swf">Pixeliza</option>
		<option value = "seawave.swf">Seawave</option>
		<option value = "silverywhite.swf">Silvery White</option>
		<option value = "stylish_slim.swf">Stylish Slim</option>
		</select></td>
      <td><a href="#" class="tooltip">(?)<span>Es la cara al usuario del Reproductor<br />
        Ej: SCRadio</span></a> </td>
    </tr>
    <tr>
      <td>Ancho</td>
      <td><input name="txtAncho" type="text" id="txtAncho" value="180" onblur="Validar_Entero(this, 'Ancho', cboTipoServidor)"/></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Alto</td>
      <td><input name="txtAlto" type="text" id="txtAlto" value="60" onblur="Validar_Entero(this, 'Alto', cboTipoServidor)" /></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Volumen Inicial</td>
      <td><input name="txtVolumen" type="text" id="txtVolumen" value="50" size="10" onblur="Validar_Volumen(this)" /></td>
      <td><a href="#" class="tooltip">(?)<span>El Volumen con el cual iniciar&aacute; su reproducci&oacute;n<br />
var&iacute;a de 0 a 100</span></a> </td>
    </tr>
    <tr>
      <td>Titulo</td>
      <td><input name="txtTitulo" type="text" id="txtTitulo" /></td>
	  
      <td><a href="#" class="tooltip">(?)<span>El Nombre que aparecer&aacute; en su Reproductor</span></a> </td>
    </tr>
    <tr>
      <td>Mensaje de Bienvenida </td>
      <td><input name="txtMensajeDeBienvenida" type="text" id="txtMensajeDeBienvenida" value=" " /></td>
      <td><a href="#" class="tooltip">(?)<span>El mensaje inicial que veran la audiencia en el reproductor</span></a> </td>
    </tr>
    <tr>
      <td>Autoplay</td>
      <td><input type="checkbox" name="chkAutoplay" value="checkbox" /></td>
      <td><a href="#" class="tooltip">(?)<span>Indica si el Audio se reproduce al cargar la p&aacute;gina o el usuario debe iniciar la reproducci&oacute;n</span></a> </td>
    </tr>
	<tr>
      <td>Buffering</td>
      <td><input name="txtBuffering" type="text" id="txtBuffering" value="5" onblur="Validar_Entero(this, 'Buffering', cboTipoServidor)"/></td>
      <td><a href="#" class="tooltip">(?)<span>Tiempo (en segundos) que dura en cargar la señal antes de reproducirse</span></a> </td>
    </tr>
	<tr>
	  <td>&nbsp;</td>
	  <td>&nbsp;</td>
	  <td>&nbsp;</td>
	  </tr>
	<tr>
	  <td colspan="3"><div align="center">
	    <input type="button" name="btnGenerar" id="btnGenerar" value="Generar" onclick="generar(txtCodigo, chkAutoplay.checked, txtVolumen.value, txtAlto.value, txtAncho.value, cboServidor.value, cboSkin.value, cboSkinJW.value, txtPuerto.value, txtPuntodeMontaje.value, txtMensajeDeBienvenida.value, txtTitulo.value, cboReproductor.value, txtBuffering.value, cboTipoServidor.value)" />
			    <input type="button" name="btnPrevisualizar" value="Previsualizar" onclick= "Iniciar(txtCodigo.value, txtAlto.value, txtAncho.value)"/>
	    </div></td>
	  </tr>
	<tr>
	  <td colspan="3"><div align="center"><img src="images/cargando.gif" width="30" height="30" /></div></td>
	  </tr>
	<tr>
	  <td colspan="3"><div align="center">
	    <textarea name="txtCodigo" cols="60" rows="5" id="txtCodigo"></textarea>
	    </div></td>
	  </tr>
	<tr>
	  <td colspan="3"><div align="center">
	    <input type="button" name="btnLimpiar" value="Limpiar" onclick= "limpiar(txtCodigo)"/>
	    <input type="button" name="btnCopiar" value="Copiar al Portapapeles" onclick= "clipboardCopy(txtCodigo.value)" />
	    </div></td>
	  </tr>
   </table>
          <p class="infopost"><script type="text/javascript">
								var i;
								for (i = 1; i<=18; i++)	{
								ocultarFila(i, false);
														}
								</script>
          </p>
        </div>
    </div>
  </form>
  </div>
</body>
</html>
