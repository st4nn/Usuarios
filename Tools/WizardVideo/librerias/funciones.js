$(document).on("ready", arranque);

function arranque()
{
	$("#btnGenerar").on("click", btn_Generar);		
	$("#btnPrevisualizar").on("click", btn_Previsualizar);
	$("#txtVolumen").on("blur", txtVolumen_Change);
	$("#cboSkin").on("change", cboSkin_Change);

	 if ($.browser.msie && $.browser.version > 6)	{
		//alert("Usando Internet Explorer? no, que boleta...");
				}

}
function btn_Previsualizar(evento)
{
	evento.preventDefault();

	var AutoStartvar = $("#chkAutostart").is(':checked');
	$.post("Tools/WizardVideo/librerias/GenerarEmbed.php",  
		{
			Stream : $("#txtStream").val(),
			Titulo : $("#txtTitulo").val(),
			Color_Atras : $("#txtColorPanel").val(),
			Color_Frente : $("#txtColorBotones").val(),
			Color_Luz : $("#txtColorSombras").val(),
			Color_Pantalla : $("#txtColorPantalla").val(),
			Skin : $("#cboSkin").val(),
			Volumen: $("#txtVolumen").val(),
			Servidor: $("#txtServidor").val(),
			Autostart : AutoStartvar,
			Panel : $("#cboUbicacionPanel").val(),
			Ancho : $("#txtAlto").val(),
			Alto : $("#txtAncho").val()
		}, 
		function(data)
		{	
			data = "<p align=\"center\"> \n" + data + " \n </p>";
			Shadowbox.open	({
				player: 'html',
				content: data,
				height: $("#txtAncho").val() * 1.1,
				width: $("#txtAlto").val() * 1.1
					});
		});
}
				
function btn_Generar(evento)
{
	evento.preventDefault();
	var AutoStartvar = $("#chkAutostart").is(':checked');

	var url;
	if ($("#cboTipoCodigo").val() == "JavaScript")
	{
		url = "Tools/WizardVideo/librerias/GenerarJS.php";
	}else
	{
		url = "Tools/WizardVideo/librerias/GenerarEmbed.php"	;
	}
	$.post(url,  
		{
			Stream : $("#txtStream").val(),
			Titulo : $("#txtTitulo").val(),
			Color_Atras : $("#txtColorPanel").val(),
			Color_Frente : $("#txtColorBotones").val(),
			Color_Luz : $("#txtColorSombras").val(),
			Color_Pantalla : $("#txtColorPantalla").val(),
			Skin : $("#cboSkin").val(),
			Volumen: $("#txtVolumen").val(),
			Servidor: $("#txtServidor").val(),
			Autostart : AutoStartvar,
			Panel : $("#cboUbicacionPanel").val(),
			Ancho : $("#txtAlto").val(),
			Alto : $("#txtAncho").val()
		}, 
		function(data)
		{	
			$("#txtCodigo").val(data);
		});
}

function cboSkin_Change()
{
	if ($("#cboSkin").val() == 'default')
	{
		$("#fdsNivel1").slideDown();
	}
	else
	{
		$("#fdsNivel1").slideUp();
	}
}
function txtVolumen_Change()
{
	obj = parseInt($("#txtVolumen").val()); 
	if (isNaN(obj)) 
	{ 
		alert ( "El campo Volumen debe ser numerico");
	}
	else
	{
				if (obj > 100) 		{
			alert ( "El Volumen no puede ser superior a 100");	
			$("#txtVolumen").val('100');
									}
				if (obj < 0) 		{
			alert ( "El Volumen no puede ser inferior a 0");	
			$("#txtVolumen").val('0');
									}
			}
}
