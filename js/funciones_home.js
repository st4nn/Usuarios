﻿var Usuario;
$(document).on("ready", arranque);

function arranque()
{
	if(!localStorage.Usuario)
	{CerrarSesion();}
	
	$("#btnCompanyDataCancel").on("click", btnCompanyDataCancel_click);
	$("#btnCompanyDataCreate").on("click", btnCompanyDataCreate_click);
	$("#btnMyUsers_Delete").live("click", btnMyUsers_Delete_click);
	$("#btnMyUsersDeleteCancel").live("click", btnMyUsersDeleteCancel_click);
	$("#btnMyUsersDeleteOk").live("click", btnMyUsers_DeleteOk_click);
	$("#btnMyUsers_Edit").live("click", btnMyUsers_Edit_click);
	
	
	
	$("#btnMyUsersEditCompanyDataCreate").live("click", btnMyUsersEditCompanyDataCreate_click);
	
	
	$("#cboLanguage").on("change", CambiarIdioma);
	$("#cboToolsType").on("change", CambiarTipoCustomPlayer);
	
	$("#CreatingUsersCreate").on("submit", CreatingUsersCreate_submit);
	
	$("#MyAccount_Options_AccessData").on("submit", MyAccount_Options_AccessData_Submit);
	$("#MyAccount_Options_PersonalInformation").on("submit", MyAccount_Options_PersonalInformation_Submit)
	
	$("#MyUsers_DeleteUser").live("submit", MyUsers_DeleteUser_Submit);
	

	$("#lnkLogout").on("click", CerrarSesion);
	$("#lnkMyUsers").on("click", CargarUsuariosPropios);
	$("#tableMyUsersRefresh").on("click", CargarUsuariosPropios);
	
	
	
	$("#txtCreatingUsersCreate_Company").live("change", VerificarCompania);
	
	//
	//$("#divTools").addClass('ui-tabs-vertical ui-helper-clearfix');
	//$("#MyAccount_Options").addClass('ui-tabs-vertical ui-helper-clearfix');
	//$("#MainMenu li").removeClass('ui-corner-top').addClass('ui-corner-left');

	
	$("#divTools").tabs();
	$("#MyAccount_Options").tabs();	
	$("#tabs").tabs();

	$('.password').pstrength();
		
	$("#cboLanguage").load('php/CargarIdiomas.php');
	
	CargarUsuario();
}
function btnCompanyDataCancel_click(evento)
{
	evento.preventDefault();
	$("#CompanyData").slideUp();
	$("#txtCreatingUsersCreate_Facebook").focus();	
}
function btnCompanyDataCreate_click(evento)
{
	evento.preventDefault();
		$.post("php/CrearCompania.php",  
		{
			Name: $("#txtCreatingUsersCreate_Company").val(),
			Url: $("#txtCreatingUsersCreate_CompanyUrl").val(),
			Contact: $("#txtCreatingUsersCreate_CompanyContact").val(),
			IdOwn: Usuario.Id
		}, 
		function(data)
		{	
			data = parseInt(data);
			if (isNaN(data)) 
			{ 
				MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Error!", "The Company was not created");
			}
			else
			{ 
				MostrarAlerta("CreatingUsers_Create", "default", "ui-icon-circle-check", "Hey!", "The Company has been create");
				btnCompanyDataCancel_click(evento)
			} 
		});		
}
function btnMyUsers_Delete_click()
{	
	var Fila = document.getElementsByName($(this).parent("td").attr("name"));
	$("#MyUsers_DeleteUser").attr("title", "Deactivate " + $(Fila[0]).text());
	$("#MyUsers_DeleteUser").attr("IdUsuario", $(this).parent("td").attr("name"));
	$("#MyUsers_DeleteUser").dialog();
	$("#MyUsers_DeleteUser").dialog('open');
}
function btnMyUsersDeleteCancel_click()
{
		$('#MyUsers_DeleteUser').dialog('close');
		return false;
}
function btnMyUsers_DeleteOk_click()
{
	var IdUsuario = $('#MyUsers_DeleteUser').attr("IdUsuario");
	
	$.post("php/EliminarUsuario.php",
		{ Id: IdUsuario},
		function(data)
		{
			alert(data);
		});		
}
function btnMyUsersEditCompanyDataCreate_click()
{
		alert('mao');
}
function btnMyUsers_Edit_click()
{	
	var Fila = document.getElementsByName($(this).parent("td").attr("name"));
	
	var strObj = "Edit " + $(Fila[0]).text();
		$("#MyUsers_Edit").attr("title", "Edit " + $(Fila[0]).text());
		$("#MyUsers_Edit").dialog({
									autoOpen: false, 				
									minWidth: 600
								});
			$("#txtMyUsersEdit_Name").val($(Fila[0]).text());
			$("#txtMyUsersEdit_DisplayName").val($(Fila[1]).text());
			$("#txtMyUsersEdit_Email").val($(Fila[2]).text());
			$("#txtMyUsersEdit_Company").val($(Fila[3]).text());
			$("#txtMyUsersEdit_State").val($(Fila[8]).attr("State"));
			$("#txtMyUsersEdit_Facebook").val($(Fila[8]).attr("urlFacebook"));
			$("#txtMyUsersEdit_Twitter").val($(Fila[8]).attr("urlTwitter"));
			
		$("#MyUsers_Edit").dialog('open');
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
function CargarUsuariosPropios()
{
	$("#tableMyUsers td").remove()
		$.post("php/VerUsuariosPropios.php",
		{ Id : Usuario.Id},
		function(data)
		{
			$.each(data,function(index,value) 
			{
				if (data[index].IdUser)
				{
					var tds = "<tr id='" + data[index].IdUser + "'>";
						  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdUser + "'>" + data[index].NickName + "</td>";
						  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Mail + "</td>";
						  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Company + "</td>";
						  tds += "<td name='" + data[index].IdUser + "'>" + data[index].State + "</td>";
						  tds += "<td name='" + data[index].IdUser + "'><button class='ui-button-default ui-button ui-widget ui-corner-all'><strong><span class='ui-icon ui-icon-play'></span></strong></button></td>";
						  tds += "<td name='" + data[index].IdUser + "'><button id='btnMyUsers_Edit' class='ui-button-default ui-button ui-widget ui-corner-all'><strong><span class='ui-icon ui-icon-pencil'></span></strong></button></td>";
						  tds += "<td name='" + data[index].IdUser + "'><button id='btnMyUsers_Delete' class='ui-button-default ui-button ui-widget ui-corner-all'><strong><span class='ui-icon ui-icon-closethick'></span></strong></button></td>";
						  tds += "<td name='" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "'></td>";
						tds += '</tr>';	
					$("#tableMyUsers").append(tds);
				}
			});
		}, "json");
}
function CerrarSesion()
{
	delete localStorage.Usuario;
	window.location.replace("index.html");
}
function CreatingUsersCreate_submit(evento)
{
		evento.preventDefault();
		if ($("#txtCreatingUsersCreate_Password").val() == $("#txtCreatingUsersCreate_ReTypePassword").val())
		{
			$.post("php/CrearUsuario.php",  
			{
				Id: Usuario.Id,
				User: $("#txtCreatingUsersCreate_User").val(),
				Password: $("#txtCreatingUsersCreate_Password").val(),
				Name: $("#txtCreatingUsersCreate_Name").val(),
				NickName: $("#txtCreatingUsersCreate_DisplayName").val(),
				Email: $("#txtCreatingUsersCreate_Email").val(),
				Company: $("#txtCreatingUsersCreate_Company").val(),
				urlFacebook: $("#txtCreatingUsersCreate_Facebook").val(),
				urlTwitter: $("#txtCreatingUsersCreate_Twitter").val(),
				NoFName : "false"
			}, 
			function(data)
			{
				var Id = parseInt(data);
				if (isNaN(Id)) //No lo Creó
				{ 
					MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Alert!", data);
				}
				else //Si lo Creó
				{ 
					MostrarAlerta("CreatingUsers_Create", "default", "ui-icon-circle-check", "Hey!", "The User has been create");
				} 
			});	
		} else
		{
			MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Error!", "Passwords must be equal");
		}
		
}
function MostrarAlerta(NombreContenedor, TipoMensaje, Icono, Strong, Mensaje)
{
	/*NombreContenedor : Id del Div que contiene el MessageAlert
	 * TipoMensaje : {highlight, error, default}
	 * Icono : Icono que acompaña el mensaje ver listado en bootstrap
	 * Mensaje del AlertMessage*/
	 
	$("#" + NombreContenedor).removeClass(function() {return $(this).prev().attr('class');});
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
						//Si no validó el Password Ingresado
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

function MyUsers_DeleteUser_Submit()
{
	
}
function VerificarCompania(evento)
{
		$.post("php/VerificarCompania.php",  
		{
			NoFName: $("#txtCreatingUsersCreate_Company").val()
		}, 
		function(data)
		{	
			data = parseInt(data);
			if (isNaN(data)) 
			{ 
				$("#txtCreatingUsersCreate_CompanyContact").val($("#txtCreatingUsersCreate_Name").val())
				$("#CompanyData").slideDown();
				$("#txtCreatingUsersCreate_CompanyUrl").focus();
			}
			else
			{ 
				btnCompanyDataCancel_click(evento);
			} 
		});		
}
