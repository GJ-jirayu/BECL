$(document).ready(function() {
	$("a[href='#tabs2']").click(function(){
		$(".paramYear").show();
		$(".paramMonth").show();
		$(".paramPlaza").show();
		$(".paramSystem").show();
		
		$("#tabs-1, #tabs-3").hide();
		
		/*Set global parameter*/
		var paramYear = $("#paramYear").val();
		var paramMonth = $("#paramMonth").val();
		var paramPlaza = $("#paramPlaza").val();
		var paramSystem = $("#paramSystem").val();
		var paramMonthName = $("#paramMonth option:selected").text();
		var paramPlazaName = $("#paramPlaza option:selected").text();
		
		/*Get Html append to Tab-2*/
		$.ajax({
			url : "tab2-traffic-duration.html",
			type:"post",
			async:false,
			dataType:"html",
			success:function(data){
				$("#panel").empty().append(data).show();
			}
		});
		
		/*Hidden Rows*/
		$("#ChartRow_2, #ChartRow_2_P2, #ChartRow_3").hide();
		
		/*Get value and generate BarChart-1*/
		$.ajax({
			url:"../Model/Tab2/chart1_groupByDay.jsp",
			type:"post",
			dataType:"json",
			async:false,
			data:{"paramYear":paramYear, "paramMonth":paramMonth, 
				"paramPlaza":paramPlaza, "paramSystem":paramSystem},
			success:function(data){
				$("#ChartHead_Tap2-1").empty().append("ปริมาณจราจรจำแนกตามวัน เดือน "+paramMonthName+" "+paramYear);
				if(data.length == 0){
					var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
					$("#Chart_Tap2-1").empty().append(htmlStr);
					
				}else{
					/*Set Category label Ex.['JAN', 'FEB', 'MAR', 'APR']*/
					var categoryLabel = [];
					$.each(data,function(index,indexEntry){
						categoryLabel.push(indexEntry[0]);					
					});
					
					/*Set bar chart option*/ 
					var option = [];
					option['chartHeight'] = '300';
					option['barWidth'] = '20';
					option['axes-xaxis-ticks'] = categoryLabel;
					option['labelY'] = 'จำนวน (คัน)';
					option['clickable']= 'ture';
					option['pointLabels']=true;
					option['tooltip']=true;
					$("#Chart_Tap2-1").empty();
					barChart("Chart_Tap2-1",data ,option);	
					
					/*Click Event*/
					$('#Chart_Tap2-1').bind('jqplotDataClick', function (ev, seriesIndex, pointIndex, data) {
						$("#ChartRow_2, #ChartRow_3").show();
						chart2_groupByHours(data[0]);
						chart4_groupByLaneAndHours(data[0]);
					});
				}
			}
		});
		
		 
		/* Get value and generate PieChart-2 */
		var chart2_groupByHours = function(paramDay){
			$.ajax({
				url:"../Model/Tab2/chart2_groupByHours.jsp",
				type:"post",
				dataType:"json",
				async:false,
				data:{"paramYear":paramYear, "paramMonth":paramMonth,
					"paramPlaza":paramPlaza, "paramDay":paramDay, "paramSystem":paramSystem},
				success:function(data){
					$("#ChartHead_Tap2-2").empty().append("ปริมาณจราจรจำแนกตามชั่วโมง วันที่ "+paramDay+" "+paramMonthName+" "
							+paramYear+" ณ ด่าน"+paramPlazaName);
					if(data.length == 0){
						var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
						$("#Chart_Tap2-2").empty().append(htmlStr);
					
					}else{
						/* Set Data Label */
						var seriesLabel = [];
						$.each(data,function(index,indexEntry){
							seriesLabel.push(indexEntry[2]);					
						});
						
					    /* Set Pie chart option */ 
						var option = [];
						option['showDataLabels'] = 'ture';
						//option['dataLabels'] = ['one', 'two', 'three'];
						option['placement']='outside';
						option['tooltip'] = 'true';
					    option['numberRows'] = '4';
					    option['numberColumns'] = '4';
					    option['location'] = 'e';
					    
					    $("#Chart_Tap2-2").empty();
						pieChart("Chart_Tap2-2",data,option);
						
						$('#Chart_Tap2-2').bind('jqplotDataClick', function (ev, seriesIndex, pointIndex, data) {
//							console.log($.trim(data[0]));
							chart3_groupByLaneAndTime(paramDay, $.trim(data[0]));
						});
					}
				}
			});
		}
			
			
		/*Get value and generate LineChart-3*/
		var chart3_groupByLaneAndTime = function(paramDay, paramTimeRangGroup){
			$.ajax({
				url:"../Model/Tab2/chart3_groupByLaneAndTime.jsp",
				type:"post",
				dataType:"json",
				async:false,
				data:{"paramYear":paramYear, "paramMonth":paramMonth, "paramPlaza":paramPlaza,
					"paramDay":paramDay, "paramTimeRangeGroup":paramTimeRangGroup, "paramSystem":paramSystem},
				success:function(data){
					console.log(data);
					$("#ChartHead_Tap2-3").empty().append("ปริมาณจราจรแยกตามช่องทางตามช่วงเวลา "+paramTimeRangGroup+"<br/> วันที่ "+paramDay+" "+paramMonthName+" "
							+paramYear+"  ณ ด่าน"+paramPlazaName);
					if(data.length == 0){
						var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
						$("#Chart_Tap2-3").empty().append(htmlStr);
					}else{
						$('#ChartRow_2_P2').show();
						var categoryLabel = [];
						$.each(data,function(index,indexEntry){
							categoryLabel.push("ช่องทาง "+indexEntry[0]);					
						});
						
						var option = [];
						option['tooltip']=true;
						option['pointLabels']=true;
						option['axes-xaxis-label'] = ' ';
						option['placement']='outside';
						option['location'] = 's';
						option['numberColumns'] = '4';
						option['numberRows'] = '3';
					    option['legend-marginTop'] = '30px';
					    
					    $("#Chart_Tap2-3").empty();
						lineChart("Chart_Tap2-3",data,option);
						
						var top_c3 = $('div#Chart_Tap2-3 table.jqplot-table-legend').innerHeight();
						$('#top_c3').css({'margin-top':top_c3});
						$('div#Chart_Tap2-3 table.jqplot-table-legend').css({'margin-top':'40px'});
					}
				}
			});
		}

		
		/*Get value and generate HeatMap-4*/
		var chart4_groupByLaneAndHours = function(paramDay){
//			console.log("paramYear:"+paramYear+", paramMonth:"+paramMonth+", paramDay:"+paramDay);
			$.ajax({
				url:"../Model/Tab2/chart4_groupByLaneAndHours.jsp",
				type:"post",
				dataType:"json",
//				async:false,
				data:{"paramYear":paramYear, "paramMonth":paramMonth,
					"paramDay":paramDay, "paramSystem":paramSystem},
				success:function(data){
//					console.log(data);
					$("#ChartHead_Tap2-4").empty().append("ปริมาณจราจรแยกตามชั่วโมง วันที่ "+paramDay+" "+paramMonthName+" "
							+paramYear);
					if(data.length == 0){
						var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
						$("#Chart_Tap2-4").empty().append(htmlStr);
						
					}else{
						
						generateHeatmap(data);
						//console.log(dataSource);
					}
				}
			});
		}
			
		
	});
});

function generateHeatmap(data){
	var dataSource = [];
	$.each(data,function(index,indexEntry){
		var item = {};
		item['rowid'] =  indexEntry[0];
		item['columnid'] =  indexEntry[1];
		item['value'] =  indexEntry[2];
		
		dataSource.push(item);
	});
	
	$("#Chart_Tap2-4").empty();
	/*Heatmap chart showing score*/ 
	FusionCharts.ready(function () {
	    var salesHMChart = new FusionCharts({
	        type: 'heatmap',
	        renderAt: 'Chart_Tap2-4',
	        width: '100%',
	        height: '400',
	        dataFormat: 'json',
	        dataSource:  {
	            "chart": {
	                //"caption": "Top Smartphone Ratings",
	                //"subcaption": "By Features",
	                //"xAxisName":"Features",
	                //"yAxisName":"Model",
	                "showplotborder": "1",
	                "xAxisLabelsOnTop": "1",
	                "plottooltext":"<div id='nameDiv' style='font-size: 12px; border-bottom: 1px dashed #666666; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block; color: #888888;' >$rowLabel :</div>{br}Rating : <b>$dataValue</b>{br}$columnLabel : <b>$tlLabel</b>{br}<b>$trLabel</b>",

	                 //Cosmetics
	                "baseFontColor" : "#333333",
	                "baseFont" : "Helvetica Neue,Arial",
	                "captionFontSize" : "14",
	                "subcaptionFontSize" : "14",
	                "subcaptionFontBold" : "0",
	                "showBorder" : "0",
	                "bgColor" : "#ffffff",
	                "showShadow" : "0",
	                "usePlotGradientColor" :"0",
	                "canvasBgColor" : "#ffffff",
	                "canvasBorderAlpha" : "0",
	                "legendBgAlpha" : "0",
	                "legendBorderAlpha" : "0",
	                "legendShadow" : "0",
	                "legendItemFontSize" : "10",
	                "legendItemFontColor" : "#666666",
	                "toolTipColor" : "#ffffff",
	                "toolTipBorderThickness" : "0",
	                "toolTipBgColor" : "#000000",
	                "toolTipBgAlpha" : "80",
	                "toolTipBorderRadius" : "2",
	                "toolTipPadding" : "5",
	                
	            },
	            "dataset": [
	                {
	                    "data": dataSource
	                }
	            ],
	            "colorrange": {
	                "gradient": "0",
	                "minvalue": "0",
	                "code": "E24B1A",
	                "startlabel": "Poor",
	                "endlabel": "Good",
	                "color": [
	                    {
	                    	"code": "6DA81E",
	                        "minvalue": "0",
	                        "maxvalue": "199",
	                        "label": "น้อยกว่า 200"
	                    },
	                    {
	                        "code": "F6BC33",
	                        "minvalue": "200",
	                        "maxvalue": "400",
	                        "label": "ระหว่าง 200-400"
	                    },
	                    {
	                    	"code": "E24B1A",
	                        "minvalue": "400",
	                        "maxvalue": "9999",
	                        "label": "มากกว่า 400"
	                    }
	                ]
	            }
	        }
	    });
	    salesHMChart.render();						
	});
}