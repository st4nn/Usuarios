var Usuario;
$(document).on("ready", arranque);

function arranque()
{
	if(!localStorage.Usuario)
	{CerrarSesion();}
	
	$("#btnCompanyDataCancel").on("click", btnCompanyDataCancel_click);
	
	$("#cboLanguage").on("change", CambiarIdioma);
	$("#cboToolsType").on("change", CambiarTipoCustomPlayer);
	
	$("#MyAccount_Options_AccessData").on("submit", MyAccount_Options_AccessData_Submit);
	$("#MyAccount_Options_PersonalInformation").on("submit", MyAccount_Options_PersonalInformation_Submit)

	$("#lnkLogout").on("click", CerrarSesion);
	
	$("#txtMyAccount_Company").on("change", VerificarCompania);
	
	//
	//$("#divTools").addClass('ui-tabs-vertical ui-helper-clearfix');
	//$("#MyAccount_Options").addClass('ui-tabs-vertical ui-helper-clearfix');
	//$("#MainMenu li").removeClass('ui-corner-top').addClass('ui-corner-left');

	
	$("#divTools").tabs();
	$("#MyAccount_Options").tabs();	
	//$("#tabs").addClass('ui-tabs-vertical ui-helper-clearfix');
	$("#tabs").tabs();
	
	$('.password').pstrength();
		
	$("#cboLanguage").load('php/CargarIdiomas.php');
	CargarUsuario();
}
function btnCompanyDataCancel_click(evento)
{
	evento.preventDefault();
	$("#CompanyData").slideUp();
	$("#txtMyAccount_Facebook").focus();	
}
function CambiarIdioma()
{
		$.post("php/CambiarIdioma.php",  
		{
			Idioma: $("#cboLanguage").val()
		}, 
		function(data)
		{	
			$("#lblWelcome").text(data.Welcome + " " + Usuario.Name);
			$("#lnkHome").text(data.Home);
			$("#lnkTools").text(data.Tools);
			$("#lnkAnalytics").text(data.Analytics);
			$("#lnkMyAccount").text(data.MyAccount);
			$("#lnkLogout").text(data.Logout);
			
			$("#lnkCustomPlayer").text(data.CustomPlayer);
			$("#lnkExportCode").text(data.ExportCode);
			
			$("#lnkPersonalInformation").text(data.PersonalInformation);
			$("#lnkCustomTemplate").text(data.CustomTemplate);
			
			$("#lblName").text(data.Name);
			$("#lblDisplayName").text(data.DisplayName);
			$("#lblEmail").text(data.Email);
			$("#lblCompany").text(data.Company);
			$("#btnMyAccount_Save").val(data.Save);
		}, 
		"json");	
}
function CambiarTipoCustomPlayer()
{
	if ($("#cboToolsType").val())
	{
		$("#IframeCustomPlayer").load($("#cboToolsType").val());	
	}
}
function CargarUsuario()
{
	Usuario = JSON.parse(localStorage.Usuario)[0];
	$("#lblWelcome span").text(Usuario.Name);
	
	$("#txtMyAccount_Name").val(Usuario.Name);
	$("#txtMyAccount_DisplayName").val(Usuario.NickName);
	$("#txtMyAccount_Email").val(Usuario.Email);
	$("#txtMyAccount_Company").val(Usuario.CompanyName);
	$("#txtMyAccount_Facebook").val(Usuario.urlFacebook);
	$("#txtMyAccount_Twitter").val(Usuario.urlTwitter);
}
function CerrarSesion()
{
	delete localStorage.Usuario;
	window.location.replace("index.html");
}
function MostrarAlerta(NombreContenedor, TipoMensaje, Icono, Strong, Mensaje)
{
	/*NombreContenedor : Id del Div que contiene el MessageAlert
	 * TipoMensaje : {highlight, error, default}
	 * Icono : Icono que acompaña el mensaje ver listado en bootstrap
	 * Mensaje del AlertMessage*/
	 
	$("#" + NombreContenedor).removeClass("*");
	$("#" + NombreContenedor + " span").removeClass("*");
	$("#" + NombreContenedor).addClass("ui-state-" + TipoMensaje);
	$("#" + NombreContenedor + " span").addClass(Icono);
	$("#" + NombreContenedor + " strong").text(Strong);
	$("#" + NombreContenedor + " texto").text(Mensaje);
	$("#" + NombreContenedor).fadeIn(300).delay(2600).fadeOut(600);
}
function MyAccount_Options_AccessData_Submit(evento)
{
		evento.preventDefault();
		if ($("#txtMyAccount_NewPassword").val().length > 5)
		{
			if ($("#txtMyAccount_NewPassword").val() == $("#txtMyAccount_ReTypePassword").val())
			{
				$.post("php/CambiarClave.php",  
				{
					Id : Usuario.Id,
					OldPassword : $("#txtMyAccount_CurrentPassword").val(),
					NewPassword :  $("#txtMyAccount_NewPassword").val() 
				}, 
				function(data)
				{
					if (parseInt(data) == "1") //Si el cambio fué exitoso
					{
						MostrarAlerta("AccessData_Message", "default", "ui-icon-circle-check", "Hey!", "The password has been changed");
					}else
					{
						//Si las contraseñas no son Iguales
						MostrarAlerta("AccessData_Message", "error", "ui-icon-alert", "Error!", "The password entered is incorrect");
						$("#txtMyAccount_CurrentPassword").focus();
					}
				});
			} else
			{
					//Si las contraseñas no son Iguales
					MostrarAlerta("AccessData_Message", "error", "ui-icon-alert", "Alert!", "Passwords must be equal");
					$("#txtMyAccount_NewPassword").focus();
			}
		} else
		{
			//La contraseña es muy pequeña
			MostrarAlerta("AccessData_Message", "error", "ui-icon-alert", "Alert!", "Minimum number of characters is 6");
			$("#txtMyAccount_NewPassword").focus();
		}
}
function MyAccount_Options_PersonalInformation_Submit(evento)
{
		evento.preventDefault();
		$.post("php/ActualizarDatosUsuario.php",
			{
				Id : Usuario.Id,
				Name : $("#txtMyAccount_Name").val(), 
				NickName : $("#txtMyAccount_DisplayName").val(), 
				Email : $("#txtMyAccount_Email").val(), 
				urlFacebook : $("#txtMyAccount_Facebook").val(),  
				urlTwitter : $("#txtMyAccount_Twitter").val()
			},
			function(data)
			{
					if (parseInt(data) == "1")
					{
						MostrarAlerta("PersonalInformation_Message", "default", "ui-icon-circle-check", "Hey!", "The changes were applied successfully");
					} else
					{
						MostrarAlerta("PersonalInformation_Message", "error", "ui-icon-alert", "Alert!", "The changes are not applied");
					}
			});
}





function VerificarCompania()
{
		$.post("php/VerificarCompania.php",  
		{
			Name: $("#txtMyAccount_Company").val()
		}, 
		function(data)
		{	
			data = parseInt(data);
			if (isNaN(data)) 
			{ 
				$("#CompanyData").slideDown();
				$("#txtMyAccount_CompanyUrl").focus();
			}
			else
			{ 
				btnCompanyDataCancel_click();
			} 
		});		
}
