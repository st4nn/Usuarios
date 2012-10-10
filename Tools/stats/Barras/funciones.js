$(document).on("ready", arranque);

var	Res,
	Fechas,
	Conexiones,
	FechasII;

function arranque()
{
	$('button').button();
	$('#rangeBa, #rangeBb').daterangepicker(); 
	$('#rangeBa, #rangeBb').val(Date.today().toString("M-d-yyyy"));
	$("#rdsAgrupacion").buttonset();
	
	$("#btnOk").on('click', function()
	{	
		
		$.post("CargarDatos.php", {Agrupacion: $("input[name='TipoAgrupacion']:checked").val()},
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
	});
	
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
}
