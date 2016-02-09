/**
 * @param paramPlaza
 * @param paramPlazaName
 * @param paramSystem
 */



$(document).ready(function() {
	$("a[href='#tabs1']").click(function(){
		$(".paramYear").show();
		$(".paramMonth").hide();
		$(".paramPlaza").hide();
		$(".paramSystem").show();
		
		var paramYear = $("#paramYear").val();
		var paramMonth = $("#paramMonth").val();
		var paramPlaza = $("#paramPlaza").val();
		var paramSystem = $("#paramSystem").val();
		var paramMonthName = $("#paramMonth option:selected").text();
		var paramPlazaName = $("#paramPlaza option:selected").text();
		
		$.ajax({
			url : "becl-traffic-year.html",
			type:"get",
			async:false,
			dataType:"html",
			success:function(data){
				$("#panel").empty().html(data).show();
			}
		});

		$("#box3, #box4").hide();		
		$.ajax({
			url:"../Model/Tab1/chart1_groupByPlaza.jsp",
			type:"post",
			dataType:"json",
			data:{"paramYear":paramYear, "paramSystem":paramSystem},
			success:function(data){
				$(".Charttext_Tap1-1").append("ปริมาณจราจรแยกตามด่าน ณ ปี "+paramYear);
				if(data.length == 0){
					var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
					$("#Chart_Tap1-1").append(htmlStr);
				}else{
					var option=[];
					option['pointLabels'] = 'ture';
					option['showDataLabels'] = 'ture';
					option['placement']='outside';
					option['location']='e';
					option['numberRows'] = '8';
					option['numberColumns']='4';
					option['tooltip'] = 'ture';
					option['tooltipTextColor']='yellow';
					$('#Chart_Tap1-1').empty();
					pieChart("Chart_Tap1-1", data, option);
					
					/*Click Event*/
					$('#Chart_Tap1-1').bind('jqplotDataClick', function (ev, seriesIndex, pointIndex, dataChart1) {
						$("#box3").show();
						$("#box4").hide();
						chart3_groupBymonth(data[pointIndex][2],data[pointIndex][0],paramSystem);
						
					});
				}
			}
		});
		
		function chart3_groupBymonth(paramPlaza, paramPlazaName, paramSystem){
			$.ajax({
				url:"../Model/Tab1/chart3_groupBymonth.jsp",
				type:"post",
				dataType:"json",
				data:{"paramYear":paramYear, "paramPlaza":paramPlaza, "paramSystem":paramSystem},
				success:function(data){
					console.log(data);
					$(".Charttext_Tap1-3").empty().append("ปริมาณจราจรรายเดือน ณ ด่าน"+paramPlazaName+" ปี "+paramYear);
					if(data.length == 0){
						var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
						$("#Chart_Tap1-3").append(htmlStr);
					}else{
						var option=[];
						option['placement']='outside';
						option['location']='s';
						option['numberColumns']='4';
						option['barWidth'] = '30';
						option['pointLabels']=true;
						option['tooltip']=true;
						option['labelY'] = 'จำนวน (คัน)';
						$('#Chart_Tap1-3').empty();
						barChart("Chart_Tap1-3",data,option);
						
						/*Click Event*/
						$('#Chart_Tap1-3').bind('jqplotDataClick', function (ev, seriesIndex, pointIndex, datas) {
							$("#box4").show()
							console.log(data[pointIndex][3],data[pointIndex][0]);
							chart4_groupBylane(data[pointIndex][1],data[pointIndex][3],data[pointIndex][4],data[pointIndex][0]);
						});
					}
				}
			});
		}
			
			function chart4_groupBylane(paramPlaza, paramMonth, paramPlazaName, paramMonthName){
				$.ajax({
					url:"../Model/Tab1/chart4_groupBylane.jsp",
					type:"post",
					dataType:"json",
					data:{"paramYear":paramYear, "paramMonth":paramMonth, "paramPlaza":paramPlaza, "paramSystem":paramSystem},
					success:function(data){
						console.log(data);
						$(".Charttext_Tap1-4").empty().append("ปริมาณจราจรตามช่องทาง ณ ด่าน"+paramPlazaName+" เดือน"+paramMonthName+" ปี "+paramYear);
						if(data.length == 0){
							var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
							$("#Chart_Tap1-4").append(htmlStr);
						}else{
							var option=[];
							option['placement']='outside';
							option['location']='s';
							option['numberColumns']='4';
							option['clickable']= 'ture';
							option['barWidth'] = '30';
							option['pointLabels']=true;
							option['tooltip']=true;
							option['labelY'] = 'จำนวน (คัน)';
							$('#Chart_Tap1-4').empty();
							barChart("Chart_Tap1-4",data,option);
						}
					}
				});
			}
		
		$.ajax({
			url:"../Model/Tab1/chart2_Top10.jsp",
			type:"post",
			dataType:"json",
			data:{"paramYear":paramYear, "paramSystem":paramSystem},
			success:function(data){
				//console.log(data);
				$(".Charttext_Tap1-2").empty().append("Top 10 ปริมาณจราจรตามด่าน-ช่องทาง ณ ปี "+paramYear);
				if(data.length == 0){
					var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
					$("#Chart_Tap1-2").append(htmlStr);
				}else{					
					var option=[];
					option['pointLabels']=true;
					option['tooltip']=true;
					option['angle'] = '-45';
					option['labelY'] = 'จำนวน (คัน)';
					option['fontFamily']='Georgia, Serif';
					option['chartHeight'] = '300';
					option['barWidth'] = '30';
					option['fontSize'] = '14px';
//					option['textColor']='#000';
					$('#Chart_Tap1-2').empty();
					barChart("Chart_Tap1-2",data,option);
				}
			}
		});
	});
});

	