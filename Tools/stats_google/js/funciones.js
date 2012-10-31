$(document).on("ready", arranque);

function arranque()
{
	 $('.tooltip').tooltipster();
	$('button').button();
	$("#rdsAgrupacion").buttonset();
	$("#rdsGrafica").buttonset();
	$("#rdsPromedios").buttonset();
	
	$('#rangeBa, #rangeBb').daterangepicker(); 
	$('#rangeBa').val(Date.parse('today').moveToFirstDayOfMonth().toString("yyyy-MM-dd"));
	$('#rangeBb').val(Date.parse('today').toString("yyyy-MM-dd"));
	
	/*
	$("#btnConcurrencias").on('click', CargarConcurrencias);
	$("#btnConexiones").on('click', CargarConexiones);
	$("#btnIps").on('click', CargarIps);
	
	
	$("#rdsAgrupacion").on('change', CambioTiempo);
	$("#rdsPromedios").on('change', CambioTiempo);
	*/
	
	  /*    
	      // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);
      */
      $('#btnConcurrencias').on('click', CargarConcurrencias)
}

function CargarConcurrencias()
{
	var	obj = new Array();
	$.post("CargarConcurrenciasII.php", 
			{	Agrupacion: $("input[name='TipoAgrupacion']:checked").val(),
				Fecha1: txtFecha_Change("rangeBa"),
				Fecha2: txtFecha_Change("rangeBb"),
				Avg: $("input[name='TipoPromedios']:checked").val()
			}, 
			function(data)
			{
				for (var i = 0; i < data.length; i++)
				{
					var obj2 = '["' + data[i].Fecha + '", ' + data[i].Conexiones + ', ' +  data[i].Conexiones2 + ']';
					if (i == 0)
					{
						obj = '[["Date", "Concurrences", "Unique IP"], ' + obj2;
					}
					else 
					{
						obj += ', ' + obj2;
					}
				}
					obj += ']';
					
					
					obj = (JSON.parse(obj));
					var data = google.visualization.arrayToDataTable(obj);

					var options = {
					  title: 'Titulo Pendiente',
					  hAxis: {title: 'Date',  titleTextStyle: {color: 'red'}
					  },
					  isStacked: false,
					  width: 900, 
					  pointSize: 5
					};

					var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
					chart.draw(data, options);
				
			}, "json");
}
function txtFecha_Change(Campo)
{
		var Fecha = new Date($("#" + Campo).val()).toString("yyyy-M-d");
		return Fecha;
}
