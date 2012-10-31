$(document).on("ready", arranque);

var	Res,
	info;

function arranque()
{
	$('button').button();
	$('#rangeBa, #rangeBb').daterangepicker(); 
	$('#rangeBa, #rangeBb').val(Date.today().toString("M-d-yyyy"));
	$("#rdsAgrupacion").buttonset();
	
	$("#btnOk").on('click', function()
	{	
		
		$.post("CargarIps.php", 
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
	});
	
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
    mouse : { track : true, trackFormatter: function (x) 
					{
						var x = parseInt(x);
						return "Conexiones: " + x;
					}},
    legend : {
      position : 'se',
      backgroundColor : '#D2E8FF'
    }
  });
}

