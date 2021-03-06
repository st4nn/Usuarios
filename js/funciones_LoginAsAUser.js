﻿var Usuario;
$(document).on("ready", arranque);

function arranque()
{
	if(!localStorage.UsuarioSimulado)
	{CerrarSesion();}
	
	$("#btnMyAccount_CreatingUsersCreate_Reset").on("click", function(evento){evento.preventDefault();ResetearContenedor("CreatingUsersCreate");})
	
	$("#btnCompanyDataCancel").on("click", btnCompanyDataCancel_click);
	$("#btnCompanyDataCreate").on("click", btnCompanyDataCreate_click);
	
		$("#btnMyUsers_Delete").live("click", btnMyUsers_Delete_click);
	$("#btnMyUsers_Edit").live("click", btnMyUsers_Edit_click);
		$("#btnMyUsersEditConfirmOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_EditPermissions").live("click", function(){EditarPermisos($(this).attr("idUser"))});
		$("#MyUsersEdit_Permissions_Roll").on('change', CambiarRoll);
	
	$("#btnMyUsersEditOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_LoginAsAUser").live("click", btnMyUsers_LoginAsAUser_click);
	$("#btnMyAccount_Options_Permissions_Delete").live("click", btnMyAccount_Options_Permissions_Delete_click);
	
	

	$("#cboLanguage").on("change", CambiarIdioma);
	$("#cboToolsType").on("change", CambiarTipoCustomPlayer);
	
	$("#cboLanguage").load('php/CargarIdiomas.php');
		
	$("#CreatingUsersCreate").on("submit", CreatingUsersCreate_submit);
	
	$("#MyAccount_Options_AccessData").on("submit", MyAccount_Options_AccessData_Submit);
	$("#MyAccount_Options_PersonalInformation").on("submit", MyAccount_Options_PersonalInformation_Submit)
	
	$("#lblAccessData").on("click", function(){ResetearContenedor("MyAccount_Options_AccessData");});
	$("#lblCreatringRoll").on('click', function(){CargarFunciones(Usuario.Id);});
	$("#lblMyUsers").on("click", CargarUsuariosPropios);
	$("#lblPermissions").on("click", function(){CargarPermisos(Usuario.Id);});
	
	$("#lnkLogout").on("click", CerrarSesion);
	$("#tableMyUsersRefresh").on("click", CargarUsuariosPropios);
	$("#lnkCreatingUsers").on('click', function()
		{
			$("#MyAccount_Options_CreatingUsers").dialog(
			{
		autoOpen: false, 				
		minWidth: 620,
		title : 'Creating User'
			});
			$("#MyAccount_Options_CreatingUsers").dialog('open');
			$("#txtCreatingUsersCreate_User").focus();
		});
	
	$("#txtCreatingUsersCreate_Company").live("change", VerificarCompania);
	
	$("#divTools").tabs();
	$("#MyAccount_Options").tabs();	
	$("#Users").tabs();	
	
	$("#tabs").tabs();

	$('.password').pstrength();

	CargarUsuario();
	
	$('#tableMyUsers').dataTable();
}

function abrirPopup(url)
{
	popupWin = window.open(url, 'open_window');
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
function btnMyAccount_Options_Permissions_Delete_click()
{
	var IdPer = $(this).parent("td").attr("name");
	var Fila = document.getElementsByName($(this).parent("td").attr("name"));
	
	var dialogo = $('<div></div>')
		  .html("Are you sure that you wish to delete this Permission?")
		  .dialog({
			autoOpen: false,
			buttons: [
						{
							text: "Delete",
							click: function() { 
												$.post("php/BorrarPermiso.php",
														{	IdPermission : IdPer	},
														function(data)
															{
																if (parseInt(data) > 0)
																{
																	$("#" + $(Fila[2]).text()).slideUp();
																	CargarPermisos(Usuario.Id)
																	dialogo.dialog("close"); 
																}
															}
													  );
											  }
						},
						{
							text: "Cancel",
							click: function() { $(this).dialog("close"); }
						}
					  ],
			modal: true, 
			stack: true,
			title: "Confirm Delete"
		  });
	dialogo.dialog('open');
}
function btnMyUsers_Delete_click()
{
	IdUsuario = $(this).attr("idUser");
	$("#tableDeleteMyUsers td").remove()
	$.post("php/VerUsuariosPropios.php",
		{ Id : IdUsuario},
		function(data)
		{
			if (data[0].IdUser)
			{
				$("#tableDeleteMyUsers th").slideDown();
				$.each(data,function(index,value) 
				{
					if (data[index].IdUser)
					{
						var tds = "<tr id='" + data[index].IdUser + "'>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Name + "</td>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].NickName + "</td>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Mail + "</td>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].Owner + "</td>";
							  tds += "<td name='" + data[index].IdUser + "'>" + data[index].State + "</td>";
							tds += '</tr>';	
						$("#tableDeleteMyUsers").append(tds);
					}
				});
			}else
			{
				$("#tableDeleteMyUsers th").slideUp();
				var tds = "<tr>";
					  tds += "<td>No Users associate</td>";
					tds += '</tr>';	
				$("#tableDeleteMyUsers").append(tds);
			}
		}, "json");
										
	$("#MyUsers_Delete").dialog({
		autoOpen: false, 				
		minWidth: 620,
		buttons: [
			{
				text: "Delete",
				click: function() { 
										$.post("php/EliminarUsuario.php",
											{ Id : IdUsuario},
											function(data)
											{
												if (parseInt(data) == 0)
												{
													
													MostrarAlerta("MyUsers_DeleteAlert", "error", "ui-icon-alert", "Alert!", "no user has been removed");
													// No hubo ningún Cambio
												}else if (parseInt(data) > 0)
												{
													MostrarAlerta("MyUsers_DeleteAlert", "default", "ui-icon-circle-check", "Hey!", "Users have been eliminated");
														//Cambios Correctos
												} else
												{
													MostrarAlerta("MyUsers_DeleteAlert", "error", "ui-icon-alert", "Alert!", "There was an unexpected error");
														//Hubo un error
												}
											});
											$(this).dialog("close"); 
											CargarUsuariosPropios();
								  }
			},
			{
				text: "Cancel",
				click: function() { $(this).dialog("close"); 
								  }
			}
				  ]
								});
	$("#MyUsers_Delete").dialog('open');	
}
function btnMyUsers_Edit_click()
{	
	ResetearContenedor("MyUsers_Edit");
	var IdUsuario = $(this).attr("idUser");
	var Nombre = $(this).attr("UserName");
	
	var strObj = "Edit " + $(this).attr('UserName');
		$("#MyUsers_Edit").attr("IdUsuario", IdUsuario);
			$("#txtMyUsersEdit_Name").val(Nombre);
			$("#txtMyUsersEdit_DisplayName").val($(this).attr('DisplayName'));
			$("#txtMyUsersEdit_Email").val($(this).attr('Mail'));
			//$("#txtMyUsersEdit_Company").val($(this).attr('IdCompany'));
			$("#txtMyUsersEdit_State").val($(this).attr("State"));
			$("#txtMyUsersEdit_Facebook").val($(this).attr("urlFacebook"));
			$("#txtMyUsersEdit_Twitter").val($(this).attr("urlTwitter"));
			
		$("#MyUsers_Edit").dialog({
				autoOpen: false, 				
				title: "Edit " + Nombre,
				minWidth: 600,
				buttons: [
							{
								text: "Update",
								click: function() { btnMyUsersEditOk_click();
												  }
							},
							{
								text: "Cancel",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
		$("#MyUsers_Edit").dialog('open');
}
function btnMyUsersEditOk_click()
{
	if ($("#txtMyUsersEdit_Password").val() == $("#txtMyUsersEdit_ReTypePassword").val())
	{
		if ($("#txtMyAccount_NewPassword").val().length > 5 | $("#txtMyAccount_NewPassword").val()=="")
		{
			var dialogo = $('<div></div>')
				  .html("Are you sure that you wish to update the data?")
				  .dialog({
					autoOpen: false,
					buttons: [
								{
									text: "Update",
									click: function() { 
														var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
														$.post("php/ActualizarDatosUsuario.php",
																{
																	Id : IdUsuario,
																	IdOwn : Usuario.Id,
																	Name :  $("#txtMyUsersEdit_Name").val(),
																	Password : $("#txtMyUsersEdit_Password").val(),
																	State : $("#txtMyUsersEdit_State").val(),
																	NickName : $("#txtMyUsersEdit_DisplayName").val(),
																	Email : $("#txtMyUsersEdit_Email").val(),
																	urlFacebook : $("#txtMyUsersEdit_Facebook").val(),
																	urlTwitter : $("#txtMyUsersEdit_Twitter").val()
																},
																function(data)
																	{
																		if (parseInt(data) >= 0)
																		{
																			var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
																			dialogo.dialog("close"); 
																			$("#MyUsers_Edit").dialog('close');
																			CargarUsuariosPropios();
																		}
																	}
															  );
													  }
								},
								{
									text: "Cancel",
									click: function() { $(this).dialog("close"); 
														$("#MyUsers_Edit").dialog('close');
													  }
								}
							  ],
					modal: true, 
					stack: true,
					title: "confirm Update"
				  });
			dialogo.dialog('open');
		}
		else
		{
			MostrarAlerta("MyUsersEdit_Message", "error", "ui-icon-alert", "Alert!", "Minimum number of characters is 6");
			$("#txtMyAccount_NewPassword").focus();
		}
	} else
	{
		MostrarAlerta("MyUsersEdit_Message", "error", "ui-icon-alert", "Error!", "Passwords must be equal");
		$("#txtMyUsersEdit_Password").focus();
	}
}
function btnMyUsers_LoginAsAUser_click()
{
	var IdUsuario = $(this).attr("idUser");
	
	localStorage.setItem("UsuarioSimulado", '[' + JSON.stringify(
	{	"Id": IdUsuario ,
		"Name": $(this).attr('UserName'),
		"NickName": $(this).attr('DisplayName'),
		"IdCompany": $(this).attr("IdCompany"),
		"CompanyName": 	$(this).attr("IdCompany"),
		"Email": $(this).attr('Mail'),
		"urlFacebook": $(this).attr("urlFacebook"),
		"urlTwitter": $(this).attr("urlTwitter"),
		"IdInitialRoll": $(this).attr("IdInitialRoll")
	}
																) + ']');
	abrirPopup("UserLogin.html");
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
			$("#lblHome").text(data.Home);
			$("#lblTools").text(data.Tools);
			$("#lblAnalytics").text(data.Analytics);
			$("#lblMyAccount").text(data.MyAccount);
			$("#lblLogout").text(data.Logout);
			
			$("#lblCustomPlayer").text(data.CustomPlayer);
			$("#lblExportCode").text(data.ExportCode);
			
			$("#lblPersonalInformation").text(data.PersonalInformation);
			$("#lblCustomTemplate").text(data.CustomTemplate);
			
			$("#lblName").text(data.Name);
			$("#lblDisplayName").text(data.DisplayName);
			$("#lblEmail").text(data.Email);
			$("#lblCompany").text(data.Company);
			$("#btnMyAccount_Save").val(data.Save);
		}, 
		"json");	
}
function CambiarRoll()
{
	$("#UserTableFunctions :checkbox").attr('checked', false);

	$.post("php/CargarPermisosRoll.php",
			{IdRoll : $("#MyUsersEdit_Permissions_Roll").val()},
			function(data)
			{
				$.each(data,function(index,value) 
				{
					$("#chk" + data[index].IdFunction).attr('checked', true);
				});
			}, "json"
		  );
}
function CambiarTipoCustomPlayer()
{
	if ($("#cboToolsType").val())
	{
		$("#IframeCustomPlayer").load($("#cboToolsType").val());	
	}
}
function CargarFunciones(IdUsuario)
{
	$.post("php/VerPermisos.php",
		{ Id : IdUsuario},
		function(data){
			$("#TableRollFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'><input type='checkbox' id='chkTableRollFunctions_Function' class='ui-button-default ui-button ui-widget ui-corner-all' /> </td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						tds += '</tr>';	
					$("#TableRollFunctions").append(tds);
				}
			});
					},
		"json");
		
		$.post('php/CargarRoles.php',
		{Id_Roll : Usuario.IdInitialRoll},
		function(data)
		   {
			   $("#RollParent input").remove();
			   $("#RollParent label").remove();
			   $("#RollChildren input").remove();
			   $("#RollChildren label").remove();
			   
			   var tps = "<input type='radio' name='optRollParent' id='optParentRoll" + Usuario.IdInitialRoll + "' value='" + Usuario.IdInitialRoll + "'/><label id='labelRadioSet' for='optParentRoll" + Usuario.IdInitialRoll + "'>" + $("#lblWelcomeRoll span").text() + "</label>"
			   $("#RollParent").append(tps);
			   
				$.each(data,function(index,value) 
				{
					if (data[index].RollId)
					{
						var tps = "<input type='radio' name='optRollParent' id='optParentRoll" + data[index].RollId + "' value='" + data[index].RollId + "'/><label id='labelRadioSet' for='optParentRoll" + data[index].RollId + "'>" + data[index].RollName + "</label>"
						var tcs = "<input type='checkbox' name='optRollChildren' id='optChildrenRoll" + data[index].RollId + "' value='" + data[index].RollId + "'/><label id='labelRadioSet' for='optChildrenRoll" + data[index].RollId + "'>" + data[index].RollName + "</label>"
							  
						$("#RollParent").append(tps);
						$("#RollChildren").append(tcs);
					}
				});
				$("#RollParent").buttonset();
				$("#RollChildren").buttonset();
		   }, "json"	
		);
}
function CargarPermisos(IdUsuario)
{
	$.post("php/VerPermisos.php",
		{ Id : IdUsuario},
		function(data){
			$("#TableFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].AssociatedControl + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'><button title='Delete' id='btnMyAccount_Options_Permissions_Delete' class='ui-button-default ui-button ui-widget ui-corner-all'><strong><span class='ui-icon ui-icon-closethick'></span></strong></button></td>";
						  tds += "<td name='" + data[index].IdPermission + "' IdFunction='" + data[index].IdFunction + "'></td>";
						tds += '</tr>';	
					$("#TableFunctions").append(tds);
					$("#" + data[index].AssociatedControl).slideDown();
					$("#lnkLogout").slideDown();
				}
			});
					},
		"json");
}
function CargarUsuario()
{
	Usuario = JSON.parse(localStorage.UsuarioSimulado)[0];
	$("#lblWelcome span").text(Usuario.NickName);
	$("#lblWelcomeRoll span").text(Usuario.RollName);
	
	$("#txtMyAccount_Name").val(Usuario.Name);
	$("#txtMyAccount_DisplayName").val(Usuario.NickName);
	$("#txtMyAccount_Email").val(Usuario.Email);
	$("#txtMyAccount_Company").val(Usuario.CompanyName);
	$("#txtMyAccount_Facebook").val(Usuario.urlFacebook);
	$("#txtMyAccount_Twitter").val(Usuario.urlTwitter);
	
	$("#tableMyUsers td").remove();
	CargarPermisos(Usuario.Id);
	
	$.post('php/CargarRoles.php',
		{Id_Roll : Usuario.IdInitialRoll},
		function(data)
		   {
			   $("#MyUsersEdit_Permissions_Roll option").remove();
				$.each(data,function(index,value) 
				{
					if (data[index].RollId)
					{
						var tds = "<option value='" + data[index].RollId + "'>" + data[index].RollName + "</option>";
							  
						$("#MyUsersEdit_Permissions_Roll").append(tds);
					}
				});
		   }, "json"	
		);
}

function CargarUsuariosPropios()
{
	$("#tableMyUsers").dataTable().fnClearTable();
		$.post("php/VerUsuariosPropios.php",
		{ Id : Usuario.Id},
		function(data)
		{
			$.each(data,function(index,value) 
			{
				if (data[index].IdUser)
				{
					$('#tableMyUsers').dataTable().fnAddData( [
										data[index].Name,
										data[index].NickName,
										data[index].Mail,
										data[index].Owner,
										data[index].State,
										data[index].RollName,
										"<button title='Login as User' id='btnMyUsers_LoginAsAUser' class='ui-button-default ui-button ui-widget ui-corner-all'  idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRoll='" + data[index].IdInitialRoll + "'><strong><span class='ui-icon ui-icon-play'></span></strong></button>",
										"<button title='Edit' id='btnMyUsers_Edit' class='ui-button-default ui-button ui-widget ui-corner-all' idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRoll='" + data[index].IdInitialRoll + "'><strong><span class='ui-icon ui-icon-pencil'></span></strong></button>",
										"<button title='Edit Permissions' id='btnMyUsers_EditPermissions' class='ui-button-default ui-button ui-widget ui-corner-all' idUser='" + data[index].IdUser + "'><strong><span class='ui-icon ui-icon-unlocked'></span></strong></button>",
										"<button title='Delete' id='btnMyUsers_Delete' class='ui-button-default ui-button ui-widget ui-corner-all' idUser='" + data[index].IdUser + "'><strong><span class='ui-icon ui-icon-closethick'></span></strong></button>"
															  ] 
															);
				}
			});
		}, "json");
		
}
function CerrarSesion()
{
	delete localStorage.UsuarioSimulado;
	//window.location.replace("index.html");
	window.close();
	
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
				IdRoll: $("#cboCreatingUsersCreate_Roll").val(),
				NoFName: "false"
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
					EditarPermisos(Id);
					MostrarAlerta("CreatingUsers_Create", "default", "ui-icon-circle-check", "Hey!", "The User has been create");
					ResetearContenedor("CreatingUsersCreate");
				} 
			});	
		} else
		{
			MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Error!", "Passwords must be equal");
		}
}
function EditarPermisos(IdUsuario)
{
$.post("php/VerPermisos.php",
		{ Id : Usuario.Id},
		function(data){
			$("#UserTableFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'><input name='chkPermissionState' type='checkbox' id='chk" + data[index].IdFunction + "' AssociatedControl='" + data[index].AssociatedControl + "' IdFunction='" + data[index].IdFunction + "'/></td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "' IdFunction='" + data[index].IdFunction + "'></td>";
						tds += '</tr>';	
					$("#UserTableFunctions").append(tds);
				}
			});
			$.post("php/VerPermisos.php",
								{ Id : IdUsuario},
								function(data2)
								{
									$.each(data2,function(index2,value2)
									{
										$("#chk" + data2[index2].IdFunction).attr("checked", "checked");
									});
								}, "json");
					},
		"json");
		
		$("#MyUsersEdit_Permissions").dialog({
		autoOpen: false, 
		minWidth: 620,
		title: "Edit Permissions",
		buttons: [
			{
				text: "Ok",
				click: function() { 
									var tabla = document.getElementById("UserTableFunctions");
									var numFilas = tabla.rows.length;
									var Controles = "";
									var elementos = tabla.getElementsByTagName("input")
									for (i = 0; i < numFilas; i++)
									{
										if($(elementos[i]).is(':checked'))
										{
											Controles += $(elementos[i]).attr("IdFunction") + "@";
										}
									}
									$.post("php/EditarPermiso.php",
											{Functions: Controles, IdUser: IdUsuario},
											function(data)
											{
													$("#MyUsersEdit_Permissions").dialog("close");
											}
										  );
								  }
			},
			{
				text: "Cancel",
				click: function() { $(this).dialog("close"); 
								  }
			}
				  ]
								});
	$("#MyUsersEdit_Permissions").dialog('open');	
	
	$.post('php/CargarRoles.php',
		{Id_Roll : Usuario.IdInitialRoll},
		function(data)
		   {
			   $("#MyUsersEdit_Permissions_Roll option").remove();
				$.each(data,function(index,value) 
				{
					if (data[index].RollId)
					{
						var tds = "<option value='" + data[index].RollId + "'>" + data[index].RollName + "</option>";
							  
						$("#MyUsersEdit_Permissions_Roll").append(tds);
					}
				});
		   }, "json"	
		);
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
						ResetearContenedor("MyAccount_Options_AccessData");
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
				IdOwn : Usuario.Id,
				Name : $("#txtMyAccount_Name").val(), 
				NickName : $("#txtMyAccount_DisplayName").val(), 
				Email : $("#txtMyAccount_Email").val(), 
				urlFacebook : $("#txtMyAccount_Facebook").val(),  
				urlTwitter : $("#txtMyAccount_Twitter").val(),
				Password : '',
				State : 'Active'
			},
			function(data)
			{
					if (parseInt(data) == "1")
					{
						MostrarAlerta("PersonalInformation_Message", "default", "ui-icon-circle-check", "Hey!", "The changes were applied successfully");
						var data = {"Id":Usuario.Id,
									"Name": $("#txtMyAccount_Name").val(),
									"NickName": $("#txtMyAccount_DisplayName").val(),
									"IdCompany": Usuario.IdCompany,
									"CompanyName": Usuario.CompanyName,
									"Email": $("#txtMyAccount_Email").val(),
									"urlFacebook": $("#txtMyAccount_Facebook").val(),
									"urlTwitter": $("#txtMyAccount_Twitter").val()};
						localStorage.setItem("Usuario", '[' + JSON.stringify(data) + ']');
					} else
					{
						MostrarAlerta("PersonalInformation_Message", "error", "ui-icon-alert", "Alert!", "The changes are not applied");
					}
			});
}
function ResetearContenedor(IdContenedor)
{
		  $('#' + IdContenedor).find(':input').each(function() {
			if ($(this).attr('type') != 'submit')
			  {
                $(this).val('');
              }
			});
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
function obj()
{
//MyUsers_Functions_AssociatedControl	
	Controles = document.getElementsByTagName("li");
	$(Controles).each(
		function(index) 
		{
			if ($(Controles[index]).css("display") != "none")
			{
				var Options = "<option value='" + $(Controles[index]).attr("id") + "'>";
						  Options += $(Controles[index]).text();
						  Options += "</option>";
					$("#MyUsers_Functions_AssociatedControl").append(Options);
			}
		});
}
