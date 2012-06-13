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
	
	$("#txtMyAccount_Company").on("change", VerificarCompania);
	
	$("#lnkLogout").on("click", CerrarSesion);
	
	//$("#tabs").tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
	//$("#tabs li").removeClass('ui-corner-top').addClass('ui-corner-left');
	
	$("#tabs").tabs();
	$("#divTools").tabs();	
	$("#MyAccount_Options").tabs();	
	
	$('.password').pstrength();
		
	$("#cboLanguage").load('php/CargarIdiomas.php');
	CargarUsuario();
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
function GuardarDatosUsuario()
{
		
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
						$("#AccessData_Message").removeClass("ui-state-error");
						$("#AccessData_Message_span").removeClass("ui-icon-alert");
						$("#AccessData_Message").addClass("ui-state-highlight");
						$("#AccessData_Message span").addClass("ui-icon-info");
						$("#AccessData_Message strong").text("Hey!");
						$("#AccessData_Message texto").text("The password has been changed");
						$("#AccessData_Message").fadeIn(300).delay(2600).fadeOut(600);
					}else
					{
						CambiarClave_Error("There was an error, The password entered is incorrect"); //Si la Contraseña Actual no coincide
						$("#txtMyAccount_CurrentPassword").focus();
					}
				});
			} else
			{
					CambiarClave_Error("Passwords must be equal"); //Si las contraseñas no son Iguales
					$("#txtMyAccount_NewPassword").focus();
			}
		} else
		{
			CambiarClave_Error("Minimum number of characters is 6"); //La contraseña es muy pequeña
			$("#txtMyAccount_NewPassword").focus();
		}
}
function CambiarClave_Error(texto)
{
	$("#AccessData_Message").removeClass("ui-state-highlight");
	$("#AccessData_Message span").removeClass("ui-icon-infor");
	$("#AccessData_Message").addClass("ui-state-error");
	$("#AccessData_Message span").addClass("ui-icon-alert");
	$("#AccessData_Message strong").text("Alert!");
	$("#AccessData_Message texto").text(texto);
	$("#AccessData_Message").fadeIn(300).delay(2600).fadeOut(600);
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
function btnCompanyDataCancel_click(evento)
{
	evento.preventDefault();
	$("#CompanyData").slideUp();
	$("#txtMyAccount_Facebook").focus();	
}

