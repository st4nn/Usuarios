function Campos_Obligatorios(campo1, campo2, campo3, campo4, TipoServidor) 	{
				var i = "0";
				if (campo1 != "")
				{i++}
				if (campo2 != "")
				{i++} else {if (TipoServidor == "SHOUTcast") {i++}}
				if (campo3 != "")
				{i++}
				if (campo4 != "")
				{i++}
				if (i != 4) {alert("Todos los campos son Obligatorios")
					return false
					} else {return true}
												}
												
function Validar_Entero(Id_Campo, Nombre, Servidor) 	{
				var obj = Id_Campo.value;
				obj = parseInt(obj); 
				if (isNaN(obj)) { 
           	 alert ( "El campo " + Nombre + " debe ser numerico");
				Id_Campo.select();		
				Id_Campo.focus();
								} else {Id_Campo.value = obj;}

													}
													
function Validar_Volumen(Id_Campo)	{
				var obj = Id_Campo.value;
				obj = parseInt(obj); 
				if (isNaN(obj)) { 
           	 alert ( "El campo debe ser numerico");
			 Id_Campo.select();
			 Id_Campo.focus();
				 }
				 else
				 {
				if (obj > 100) 		{
			alert ( "El Volumen no puede ser superior a 100");	
			Id_Campo.value = '100';
			Id_Campo.focus();
									}
				if (obj < 0) 		{
			alert ( "El Volumen no puede ser inferior a 0");	
			Id_Campo.value = '0';
			Id_Campo.focus();
									}
			}
													}
													
function Validar_PuntoMontaje(Id_Campo) {
	if (Id_Campo.value.substr(0, 1) != "/") {Id_Campo.value = "/" + Id_Campo.value}
	if (Id_Campo.value.substr(0, 1) == "") {Id_Campo.value = "/" + Id_Campo.value}
										}
										
function limpiar(campo)	{
   campo.value = ''; 
							}
							
function cambiar_reproductor(campo, Tipo_Servidor, Alto, Ancho){
var FFMp3_Opcion = new Array('0', '1', '2', '3', '4', '5', '7', '8', '9', '10', '11', '12' , '13', '14', '15', '17', '18');
var JWplayer_Opcion =new Array('0', '1', '2', '3', '4', '6', '7', '8', '9', '12', '13', '14', '15', '17', '18');
var estado;
var i;
var j;
		if (campo.value == "FFmp3") {
			for (j=0; j<=18; j++){
			estado = false;
				for (i = 0; i <= FFMp3_Opcion.length; i++) {
				if (FFMp3_Opcion[i] == j) {estado = true;}
															}
						ocultarFila(j, estado);
								}
									}
		
		else if (campo.value == "JWplayer") {
		Alto.value = '62';
		Ancho.value = '260';
				for (j=0; j<=18; j++){
				estado = false;
					for (i = 0; i <= JWplayer_Opcion.length; i++) {
					if (JWplayer_Opcion[i] == j) {estado = true;}
																}
							ocultarFila(j, estado);
										}
											}
		else {for (j=1; j<=18; j++){ocultarFila(j, false)}}
Validar_TipoServidor(Tipo_Servidor);					
					}
					
function Iniciar(Codigo, Alto, Ancho){
if (Codigo != ""){
var operador;
if (Alto <= 30) {operador = 2.1;}
if (Alto < 60) {if (Alto > 30) {operador = 1.5;}}
if (Alto >= 60) {operador = 1.2;}

		Alto = parseInt(Alto) * operador;
		Ancho = parseInt(Ancho) * 1.2;	

		Codigo = "<p align=\"center\"> \n" + Codigo + " \n </p>";
		Shadowbox.open({
			player: 'html',
			content: Codigo,
			height: Alto, 
			width: Ancho 
						});
	} else {Codigo = "No hay ningun codigo Generado"}
				}
				
function Prev_Skins(Ruta, Alto, Ancho){
if (Codigo != ""){

	} else {Codigo = "No hay ningun codigo Generado"}
		
		Alto = parseInt(Alto) + 4;
		Ancho = parseInt(Ancho) + 4;	
		
		Shadowbox.open({
			player: 'html',
			content: Codigo,
			height: Alto, 
			width: Ancho 
						});
				}
			
function generar(campo, autoplay, volumen, alto, ancho, servidor, skin, skinJW, puerto, puntodemontaje, mensajedebienvenida, titulo, reproductor, buffering, TipoServidor){ 
ocultarFila(16, true);
var codigo;
		if (Campos_Obligatorios(puerto, puntodemontaje, ancho, alto, TipoServidor) != false)
	{
			if (reproductor=="FFmp3"){
			if (TipoServidor == "SHOUTcast") {puntodemontaje = "/;"}
			
	var tit = "";
		for (i = 0; i < titulo.length; i++) {
		var tmpCadena = titulo.substr(i, 1);
		tit = tit + "%" + encodeToHex(tmpCadena);
		}
	titulo = tit;
	tit = "";
	var i;
		for (i = 0; i < mensajedebienvenida.length; i++) {
		var tmpCadena = mensajedebienvenida.substr(i, 1);
		tit = tit + "%" + encodeToHex(tmpCadena);
		}
	mensajedebienvenida = tit;
		
codigo = "<!-- Inicio Codigo CeHis.net Streaming player --> \n" +
		"<object height='" + alto + "' width='" + ancho + "'> \n" +
		"<param name='movie' value='https://s3.amazonaws.com/cehis.net-streamingplayer/ffmp3-0.4.0/ffmp3-config.swf'> \n" +
		"<param name='flashvars' value='url=" + servidor + ":" + puerto + puntodemontaje + "&lang=sp&codec=mp3&volume=" + volumen + "&autoplay=" + autoplay + "&traking=false&jsevents=false&buffering=" + buffering + "&skin=https://s3.amazonaws.com/cehis.net-streamingplayer/ffmp3-0.4.0/skins/" + skin + "&title=" + titulo + "&welcome=" + mensajedebienvenida + "'> \n" +
		"<param name='wmode' value='transparent'> \n" +
		"<param name='allowscriptaccess' value='always'> \n" +
		"<param name='scale' value='scale'> \n" +
		"<embed allowscriptaccess='always' \n" +
		"bgcolor='#FFFFFF' \n" +
		"flashvars='url=" + servidor + ":" + puerto + puntodemontaje + "&lang=sp&codec=mp3&volume=" + volumen + "&autoplay=" + autoplay + "&traking=false&jsevents=false&buffering=" + buffering + "&skin=https://s3.amazonaws.com/cehis.net-streamingplayer/ffmp3-0.4.0/skins/" + skin + "&title=" + titulo + "&welcome=" + mensajedebienvenida + "' \n" +
		"height='" + alto + "' \n" +
		"scale='scale' \n" +
		"src='https://s3.amazonaws.com/cehis.net-streamingplayer/ffmp3-0.4.0/ffmp3-config.swf' \n" +
		"type='application/x-shockwave-flash' \n" +
		"width='" + ancho + "' \n" +
		"wmode='transparent'> \n" +
		"</object> \n" +
		"<!-- Fin Codigo CeHis.net Streaming player --> " ;
 
			}
		
		if (reproductor == "JWplayer") {
			if (TipoServidor == "SHOUTcast") {puntodemontaje = "/;stream.mp3%3Ftype%3D.mp3"
			reproductor = "player5-7/player.swf";
			}
			if (TipoServidor == "Icecast") {puntodemontaje += "%3Ftype%3D.flv";
			reproductor = "player4.7/player4.7.swf";
			}
		codigo = "<!-- Inicia Codigo CeHis.Net --> \n " +
		"<object width='" + ancho + "' height='" + alto + "'> \n" +
		"<param name='movie' value='https://s3.amazonaws.com/cehis.net-streamingplayer/" + reproductor + "'> \n" +
		"<param name='allowfullscreen' value='true'> \n" +
		"<param name='allowscriptaccess' value='always'> \n" +
		"<param name='wmode' value='transparent'> \n" +
		"<param name='flashvars' value='file=" + servidor + ":" + puerto  + puntodemontaje + "&skin=https://s3.amazonaws.com/cehis.net-streamingplayer/player4.7/skins/" + skinJW + "&bufferlength=" + buffering + "&volume=" + volumen + "&autostart=" + autoplay + "'> \n" +
		"<embed \n" +
		"type='application/x-shockwave-flash' \n" + 
		"src='https://s3.amazonaws.com/cehis.net-streamingplayer/" + reproductor + "' \n" +
		"width='" + ancho + "' \n" +
		"height='"+ alto + "' \n" +
		"bgcolor='undefined' \n" +
		"allowscriptaccess='always' \n" +
		"allowfullscreen='true' \n" + 
		"wmode='transparent' \n" +
		"flashvars='file=" + servidor + ":" + puerto  + puntodemontaje + "&skin=https://s3.amazonaws.com/cehis.net-streamingplayer/player4.7/skins/" + skinJW + "&bufferlength=" + buffering + "&volume=" + volumen + "&autostart=" + autoplay + "'> \n" +
		"</object> \n" +
		"<!-- Fin Codigo CeHis.net Streaming player --> "
										}
campo.value = codigo;									
alert('Codigo Generado');
	}
	ocultarFila(16, false);
}

function encodeToHex(str) {
		var result = "";
		for (var i = 0; i < str.length; i++) {
			result += str.charCodeAt(i).toString(16);
		}
		return result;
}

function clipboardCopy(txt) { 
    if (window.clipboardData) { 
        window.clipboardData.clearData(); 
        window.clipboardData.setData("Text", txt); 
    } 
    else if (window.netscape) { 
        try { 
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
        } 
        catch (e) { 
            alert("Un script no puede Cortar / Copiar / Pegar automáticamente por razones de seguridad.\n"+ 
                  "Para hacerlo necesitas activar 'signed.applets.codebase_principal_support' en about:config'"); 
            return false; 
        } 
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard); 
        if (!clip) 
            return; 
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable); 
        if (!trans) 
            return; 
        trans.addDataFlavor('text/unicode'); 
        var str = new Object(); 
        var len = new Object(); 
        var str = Components.classes['@mozilla.org/supports-tring;1'].createInstance(Components.interfaces.nsISupportsString); 
        var copytext = txt; 
        str.data = copytext; 
        trans.setTransferData("text/unicode",str,copytext.length*2); 
        var clipid = Components.interfaces.nsIClipboard; 
        if (!clip) 
            return false; 
        clip.setData(trans,null,clipid.kGlobalClipboard); 
    } 
}				

function Tamano_Predeterminado(Control, Alto, Ancho){

if (Control.value == "ffmp3-mcclean.xml"){
Alto.value = 60;
Ancho.value = 180;}

if (Control.value == "ffmp3-tweety.xml"){
Alto.value = 62;
Ancho.value = 189;}

if (Control.value == "ffmp3-scradio.xml"){
Alto.value = 100;
Ancho.value = 160;}

if (Control.value == "ffmp3-compact.xml"){
Alto.value = 46;
Ancho.value = 191;}

if (Control.value == "ffmp3-repvku-100.xml"){
Alto.value = 25;
Ancho.value = 100;}

if (Control.value == "ffmp3-repvku-115x25.xml"){
Alto.value = 25;
Ancho.value = 115;}

if (Control.value == "ffmp3-darkconsole.xml"){
Alto.value = 62;
Ancho.value = 190;}

if (Control.value == "ffmp3-eastanbul.xml"){
Alto.value = 26;
Ancho.value = 467;}

if (Control.value == "ffmp3-substream.xml"){
Alto.value = 30;
Ancho.value = 180;}

if (Control.value == "ffmp3-oldradio.xml"){
Alto.value = 132;
Ancho.value = 205;}

if (Control.value == "ffmp3-oldstereo.xml"){
Alto.value = 130;
Ancho.value = 318;}

if (Control.value == "ffmp3-xm.xml"){
Alto.value = 66;
Ancho.value = 234;}

if (Control.value == "ffmp3-neon.xml"){
Alto.value = 76;
Ancho.value = 240;}

if (Control.value == "ffmp3-neonslim.xml"){
Alto.value = 32;
Ancho.value = 501;}

if (Control.value == "ffmp3-greyslim.xml"){
Alto.value = 35;
Ancho.value = 494;}

if (Control.value == "ffmp3-testskin.xml"){
Alto.value = 61;
Ancho.value = 189;}
								}		

function Tamano_PredeterminadoJW(Control, Alto, Ancho){

if (Control.value == "3dpixelstyle.swf"){
Alto.value = 62;
Ancho.value = 250;}

if (Control.value == "atomicred.swf"){
Alto.value = 40;
Ancho.value = 250;}

if (Control.value == "chelseaskin.swf"){
Alto.value = 50;
Ancho.value = 250;}

if (Control.value == "comet.swf"){
Alto.value = 57;
Ancho.value = 250;}

if (Control.value == "controlpanel.swf"){
Alto.value = 50;
Ancho.value = 250;}

if (Control.value == "dangdang.swf"){
Alto.value = 30;
Ancho.value = 250;}

if (Control.value == "fashion.swf"){
Alto.value = 40;
Ancho.value = 250;}

if (Control.value == "festival.swf"){
Alto.value = 41;
Ancho.value = 250;}

if (Control.value == "magma.swf"){
Alto.value = 43;
Ancho.value = 250;}

if (Control.value == "metarby10.swf"){
Alto.value = 40;
Ancho.value = 250;}

if (Control.value == "neon.swf"){
Alto.value = 130;
Ancho.value = 250;}

if (Control.value == "pearlized.swf"){
Alto.value = 41;
Ancho.value = 250;}

if (Control.value == "pixelize.swf"){
Alto.value = 72;
Ancho.value = 250;}

if (Control.value == "seawave.swf"){
Alto.value = 40;
Ancho.value = 250;}

if (Control.value == "silverywhite.swf"){
Alto.value = 54;
Ancho.value = 250;}

if (Control.value == "stylish_slim.swf"){
Alto.value = 36;
Ancho.value = 250;}
								}									

function ocultarFila(num,ver) {
num = parseInt(num);
  dis= ver ? '' : 'none';
  tab=document.getElementById('tabla');
  tab.getElementsByTagName('tr')[num].style.display=dis;
							}

function Validar_TipoServidor(Id_Campo){

if (Id_Campo.value == "SHOUTcast") {
	ocultarFila(4, false);
								} else {ocultarFila(4, true);}
										}