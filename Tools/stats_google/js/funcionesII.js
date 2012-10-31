$(document).on("ready", arranque);

var Tipo = "Concurrencias";
var	Res,
	Fechas,
	Horas,
	Ips,
	Conexiones,
	IOs,
	URLs,
	FechasII,
	HorasII,
	obj1,
	obj2,
	obj3;
	

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
	
	$("#btnConcurrencias").on('click', CargarConcurrencias);
	$("#btnConexiones").on('click', CargarConexiones);
	$("#btnIps").on('click', CargarIps);
	
	$("#rdsAgrupacion").on('change', CambioTiempo);
	
	$("#rdsPromedios").on('change', CambioTiempo);
}
function dibujar(Contenedor)
{
	var
    d1    = [],
    options,
    graph,
    i, x, o;
		
        d1 = obj2;
        d2 = Conexiones;

  options = {
	lines : { fill : true },
	mouse: {
	track: true,
	trackAll: true,
	trackFormatter : function(o)
		{
		var 
			data = o.series.data,
			index = data[o.index][0],
			value;
		var summaryTicks = Res;
			
			value = "Usuarios Simultaneos: " + data[o.index][1];
			
			$(this).addClass('tooltip');
			$(this).attr('tittle', data[o.index][1]);
			$(this).tooltipster();
			
			/*var date = new Date(financeData.summaryTicks[o.index].Fecha);
			value = date.getDate();*/
			
			
		$("#txtFecha span").text(summaryTicks[o.index].Fecha);
		$("#txtHora span").text(summaryTicks[o.index].Hora);
		$("#txtIp span").text(summaryTicks[o.index].Ip);
		$("#txtConexiones span").text(summaryTicks[o.index].Conexiones);
		$("#txtIO span").text(summaryTicks[o.index].IO);
		//$("#txtURL span").text(summaryTicks[o.index].URL);
		return value;
		}
	},
    xaxis : {
      mode : 'normal', 
      noTicks : 5,
      labelsAngle : 45,
      tickFormatter: function (x) 
		{
			var x = parseInt(x);
			return obj3[x];
		},
      labelsAngle: 45
    },
    yaxis : {
		tickDecimals: 0,
	},
    selection : {
      mode : 'x'
    },
    HtmlText : true,
    title : 'Time'
  };
        
  // Draw graph with default options, overwriting with passed options
  function drawGraph (opts) {

    // Clone the options, so the 'options' variable always keeps intact.
    o = Flotr._.extend(Flotr._.clone(options), opts || {});

    // Return a new graph.
    return Flotr.draw(
      container,
      [ d1, d2 ],
      o
    );
  }

  graph = drawGraph();      
        
  Flotr.EventAdapter.observe(container, 'flotr:select', function(area){
    // Draw selected area
    graph = drawGraph({
      xaxis : { 
					min : area.x1, 
					max : area.x2, 
					mode : 'time', 
					labelsAngle : 45 , 
					tickFormatter: function (x) 
					{
						var x = parseInt(x);
						return obj3[x];
					}
				},
      yaxis : { min : area.y1, max : area.y2 , tickDecimals: 0}
    });
  });
        
  // When graph is clicked, draw the graph with default area.
  Flotr.EventAdapter.observe(container, 'flotr:click', function () { graph = drawGraph(); });
  
  $("#imgCargando").slideUp();
}

function basic_bars(Contenedor, horizontal) {

  var
    horizontal = (horizontal ? true : false), // Show horizontal bars
    d1 = [],                                  // First data series
    d2 = [];                                  // Second data series

	d1 = Conexiones;
              
  // Draw the graph
  Flotr.draw(
    container,
    [d1],
    {
      bars : {
        show : true,
        horizontal : horizontal,
        shadowSize : 0,
        barWidth : 0.5
      },
      mouse : {
        track : true,
        relative : true,
        trackFormatter : function(o)
		{
			var 
				data = o.series.data,
				index = data[o.index][0],
				value;
			var summaryTicks = Res;
			
			value = "Conexiones: " + data[o.index][1];
			return value;
		}
      },
      xaxis : {
		        mode : 'time', 
				  noTicks : 5,
				  labelsAngle : 45,
				  tickFormatter: function (x) 
					{
						var x = parseInt(x);
						return FechasII[x];
					},
				  labelsAngle: 45
	   },
      yaxis : {
        min : 0,
        autoscaleMargin : 1
      }
    }
  );
  $("#imgCargando").slideUp();
}

function basic_pie(Contenedor) {

  var graph;
    
  graph = Flotr.draw(container, info, {
    HtmlText : false,
    grid : {
      verticalLines : false,
      horizontalLines : false
    },
    xaxis : { showLabels : false },
    yaxis : { showLabels : false },
    pie : {
      show : true, 
      explode : 6
    },
    mouse : { track : true},
    legend : {
      position : 'se',
      backgroundColor : '#D2E8FF'
    }
  });
  $("#imgCargando").slideUp();
}
function CambioTiempo()
{
	$("#imgCargando").slideDown();
	if (Tipo == "Concurrencias")
	{ CargarConcurrencias();	}
	if (Tipo == "Conexiones")
	{ CargarConexiones();	}
	if (Tipo == "Ips")
	{ CargarIps();	}
}
function CargarConcurrencias()
{
	Tipo = "Concurrencias";
	
		if ($("input[name='TipoAgrupacion']:checked").val() != "Hora")
	{
		$("#txtHora").slideUp();
	}
	else
	{
		$("#txtHora").slideDown();
	}
	
	$("#convencionesConcurrencias").slideDown();
	$.post("CargarConcurrenciasII.php", 
			{	Agrupacion: $("input[name='TipoAgrupacion']:checked").val(),
				Fecha1: txtFecha_Change("rangeBa"),
				Fecha2: txtFecha_Change("rangeBb"),
				Avg: $("input[name='TipoPromedios']:checked").val()
			}, 
			function(data)
			{
				Res = data;
				
					Fechas = '[';
					Horas = '[';
					Ips = '[';
					Conexiones = '[';
					IOs = '[';
					URLs = '[';
					FechasII = '[';
					HorasII = '[';
					
					obj1 = '[';
					obj2 = '[';
					obj3 = '[';
					
				
				for (var i = 0; i < Res.length; i++)
				{
					if (i == 0)
					{
						Fechas += "[" + i + ', "' + Res[i].Fecha + '"]';
						Horas += "[" + i + ', "' + Res[i].Hora + '"]';
						Ips += "[" + i + ', "' + Res[i].Ip + '"]';
						Conexiones += "[" + i + ', ' + Res[i].Conexiones + "]";
						IOs += "[" + i + ', "' + Res[i].IO + '"]';
						URLs += "[" + i + ', "' + Res[i].URL + '"]';
						FechasII += '["' + Res[i].Fecha + '"]';
						HorasII += '["'  + Res[i].Hora + '"]';
						
						obj1 += '["' + Res[i].Fecha2 + '"]';
						obj2 += "[" + i + ', ' + Res[i].Conexiones2 + "]";
						obj3 += '["' + Res[i].FechaII + '"]';
					}
					else
					{
						Fechas += ", [" + i + ', "' + Res[i].Fecha + '"]';
						Horas += ", [" + i + ', "' + Res[i].Hora + '"]';
						Ips += ", [" + i + ', "' + Res[i].Ip + '"]';
						Conexiones += ", [" + i + ', ' + Res[i].Conexiones + "]";
						IOs += ", [" + i + ', "' + Res[i].IO + '"]';
						URLs += ", [" + i + ', "' + Res[i].URL + '"]';
						FechasII += ', ["' + Res[i].Fecha + '"]';
						HorasII += ', ["' + Res[i].Hora + '"]';
						
						obj1 += ', ["' + Res[i].Fecha2 + '"]';
						obj2 += ", [" + i + ', ' + Res[i].Conexiones2 + "]";
						obj3 += ', ["' + Res[i].FechaII + '"]';
					}
				}
						Fechas += ']';	
						Horas += ']';
						Ips += ']';
						Conexiones += ']';
						IOs += ']';
						URLs += ']';
						FechasII += ']';	
						HorasII += ']';	
						
						obj1 += ']';	
						obj2 += ']';	
						obj3 += ']';	
						
						Fechas = JSON.parse(Fechas);
						Horas = JSON.parse(Horas);
						Ips = JSON.parse(Ips);
						Conexiones = JSON.parse(Conexiones);
						IOs = JSON.parse(IOs);
						URLs = JSON.parse(URLs);
						FechasII = JSON.parse(FechasII);
						HorasII = JSON.parse(HorasII);
						
						obj1 = JSON.parse(obj1);
						obj2 = JSON.parse(obj2);
						obj3 = JSON.parse(obj3);
						
				dibujar($("#container"));
			}, "json");
}

function CargarConexiones()
{
	Tipo = "Conexiones";
	$("#convencionesConcurrencias").slideUp();
	$.post("CargarConexiones.php", {Agrupacion: $("input[name='TipoAgrupacion']:checked").val(), 
									Fecha1: txtFecha_Change("rangeBa"),
									Fecha2: txtFecha_Change("rangeBb")},
		function(data)
			{
				Res = data;
				
					Fechas = '[';
					Conexiones = '[';
					FechasII = '[';
					
				
				for (var i = 0; i < Res.length; i++)
				{
					if (i == 0)
					{
						Fechas += "[" + i + ', "' + Res[i].Fecha + '"]';
						Conexiones += "[" + i + ', ' + Res[i].Conexiones + "]";
						FechasII += '["' + Res[i].FechaII + '"]';
					}
					else
					{
						Fechas += ", [" + i + ', "' + Res[i].Fecha + '"]';
						Conexiones += ", [" + i + ', ' + Res[i].Conexiones + "]";
						FechasII += ', ["' + Res[i].FechaII + '"]';
					}
				}
						Fechas += ']';	
						Conexiones += ']';
						FechasII += ']';	
						
						Fechas = JSON.parse(Fechas);
						Conexiones = JSON.parse(Conexiones);
						FechasII = JSON.parse(FechasII);
						
				basic_bars($("#container"), false);
			}, "json");
}

function CargarIps()
{
	Tipo = "Ips";
	$("#convencionesConcurrencias").slideUp();
	$.post("CargarIps.php", 
		{	
			Fecha1: txtFecha_Change("rangeBa"),
			Fecha2: txtFecha_Change("rangeBb")
		}, 
		function(data)
			{
				Res = data;
					
				for (var i = 0; i < Res.length; i++)
				{
					if (i==0)
					{
						info = '[{ data : [[ 0, ' + Res[i].CantIp + ']], label : "' + Res[i].Ip + '"}';
					}
					else
					{
						info += ', { data : [[ 0, ' + Res[i].CantIp + ']], label : "' + Res[i].Ip + '"}';
					}
				}
				info += "]";
				info = eval(info);
				basic_pie($("#container"));
			}, "json");
}
function txtFecha_Change(Campo)
{
		var Fecha = new Date($("#" + Campo).val()).toString("yyyy-M-d");
		return Fecha;
}
