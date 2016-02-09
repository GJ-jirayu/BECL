$(document).ready(function() {
	$("a[href='#tabs3']").click(function() {
		$(".paramYear").show();
		$(".paramMonth").hide();
		$(".paramPlaza").hide();
		$(".paramSystem").hide();

		var paramYear = $("#paramYear").val();
		var paramMonth = $("#paramMonth").val();
		var paramPlaza = $("#paramPlaza").val();
		var paramMonthName = $("#paramMonth option:selected").text();
		var paramPlazaName = $("#paramPlaza option:selected").text();

		/* Get Html append to Tab-3 */
		$.ajax({
			url : "tap3-selling-easyPass.html",
			type : "get",
			async : false,
			dataType : "html",
			success : function(data) {
			$("#panel").empty().html(data).show();
			}
		});

		/* Hidden boxs */
		$("#tab3_box3, #tab3_box4, #tab3_box5, #tab3_box6").hide();

		/* Get value and generate pieChart-1 */
		$.ajax({
			url : "../Model/Tab3/chart1_Sell_Years.jsp",
			type : "post",
			dataType : "json",
			data : {"paramYear" : paramYear},
			success : function(data) {
					$("#Charttext_Tap3-1").append("ยอดขาย Easy Pass ปี "+ paramYear+ " และย้อนหลัง 2 ปี (จำนวนบัตร)");
					if (data.length == 0) {
						var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
						$("#Chart_Tap3-1").append(htmlStr);
					} else {
						var option = [];
						option['pointLabels'] = 'ture';
						option['showDataLabels'] = 'ture';
						option['tooltip'] = 'true';
						option['placement'] = 'outside';
						option['location'] = 's';
						option['numberColumns']='3';
						$('#Chart_Tap3-1').empty();
						pieChart("Chart_Tap3-1",data,option);

						/* Click Event */
						$('#Chart_Tap3-1').bind('jqplotDataClick',function(ev,seriesIndex,pointIndex,dataChart1) {
							$("#tab3_box3").show();
							chart3_groupBymonth(paramYear);
						});
						var tap3_1 = $('div#Chart_Tap3-1 table.jqplot-table-legend').innerHeight();
						$('.tap3_1').css({'margin-top' :tap3_1});
					}
				}
			});

	// Get value and generate barChart-2
		$.ajax({
			url : "../Model/Tab3/chart2_Refill_Years.jsp",
			type : "post",
			dataType : "json",
//			async : false,
			data : {"paramYear" : paramYear},
			success : function(data) {
				$("#Charttext_Tap3-2").empty().append("ยอดเติมเงินปี "+ paramYear + " และย้อนหลัง 2 ปี (จำนวนบัตร)");
					if (data.length == 0) {
						var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
						$("#Chart_Tap3-2").append(htmlStr);
					} else {
						var option = [];
						option['stackSeries'] = true;
						option['tooltip'] = 'true';
						option['pointLabels'] = true;
//						option['placement'] = 'outside';
						option['location'] = 'ne';
						option['barWidth'] = '30';
						option['numberColumns'] = '3';
						option['numberRows'] = '1';
						option['labelY'] = 'จำนวน (คัน)';
						option['showLegend'] = true;
						$('#Chart_Tap3-2').empty();
						barChartStack("Chart_Tap3-2",data,option);

						/* Click Event */
						$('#Chart_Tap3-2').bind('jqplotDataClick',function(ev,seriesIndex,pointIndex,dataChart1) {
							$("#tab3_box4").show();
							chart4_groupBymonth(paramYear);
						});
						$('div#Chart_Tap3-2').css({'top':'30px'});
						$('div#Chart_Tap3-2 table.jqplot-table-legend').css({'top':'-35px','right':'0px'});
					}
				}
			});

	// Get value and generate pieChart-3
	var chart3_groupBymonth = function(paramYear) {
		$.ajax({
			url : "../Model/Tab3/chart3_Sell_Months.jsp",
			type : "post",
			dataType : "json",
//			async : false,
			data : {"paramYear" : paramYear,"paramMonth" : paramMonth},
			success : function(data) {
				$("#Charttext_Tap3-3").empty().append("ยอดขาย Easy Pass แยกตามเดือน ปี "+ paramYear+ " (จำนวนบัตร)");
					if (data.length == 0) {
						var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
						$("#Chart_Tap3-3").append(htmlStr);
					} else {
						var option = [];
						option['tooltip'] = 'ture';
						option['pointLabels'] = 'ture';
						option['showDataLabels'] = 'ture';
						option['placement'] = 'outside';
						option['location'] = 's';
						option['numberRows'] = '3';
						option['numberColumns'] = 4;
						$('#Chart_Tap3-3').empty();
						pieChart("Chart_Tap3-3",data,option);

						/* Click Event */
						$('#Chart_Tap3-3').bind('jqplotDataClick',function(ev,seriesIndex,pointIndex,dataChart3) {
//						console.log(data);	
						$("#tab3_box5").show();

						chart5_groupByplaza(paramYear, data[pointIndex][2], data[pointIndex][0]);
						});

						var tap3_3 = $('div#Chart_Tap3-3 table.jqplot-table-legend').innerHeight();
						$('.tap3_3').css({'margin-top':tap3_3});			
					}
				}
			});
		}

	// Get value and generate barChart-4
	var chart4_groupBymonth = function(paramYear) {
		$.ajax({
			url : "../Model/Tab3/chart4_Refill_Months.jsp",
			type : "post",
			dataType : "json",
//			async : false,
			data : {"paramYear" : paramYear},
			success : function(data) {
				// console.log(data);
				$("#Charttext_Tap3-4").empty().append("ยอดเติมเงินรายเดือน ปี "+ paramYear+ "");
						if (data.length == 0) {
							var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
							$("#Chart_Tap3-4").append(htmlStr);
						} else {
							var option = [];
							option['stackSeries'] = true;
							option['tooltip'] = true;
							option['pointLabels'] = false;
//							option['placement'] = 'outside';
							option['location'] = 'ne';
							option['barWidth'] = '20';
							option['numberColumns'] = '4';
							option['labelY'] = 'จำนวน (คัน)';
							option['angle'] = '-45';
							option['showLegend'] = true;
							$('#Chart_Tap3-4').empty();
							barChartStack("Chart_Tap3-4",data,option);

							/* Click Event */
							$('#Chart_Tap3-4').bind('jqplotDataClick',function(ev,seriesIndex,pointIndex,dataChart4) {
								console.log(data);
								$("#tab3_box6").show();

								chart6_groupByplaza(paramYear,data[pointIndex][3], data[pointIndex][0]);
							});
							$('div#Chart_Tap3-4').css({'top':'30px'});
							$('div#Chart_Tap3-4 table.jqplot-table-legend').css({'top':'-35px','right':'0px'});
						}
					}
				});
			}
	// Get value and generate pieChart-5
	var chart5_groupByplaza = function(paramYear, paramMonth, paramMonthName) {
		$.ajax({
			url : "../Model/Tab3/chart5_Sell_Plaza.jsp",
			type : "post",
			dataType : "json",
//			async : false,
			data : {"paramYear" : paramYear,"paramMonth" : paramMonth},
			success : function(data) {
//				 console.log(data);
				$("#Charttext_Tap3-5").empty().append("ยอดขาย Easy Pass แยกตามด่าน เดือน"+paramMonthName+" ปี "+ paramYear+ " (จำนวนบัตร)");
						if (data.length == 0) {
							var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
							$("#Chart_Tap3-5").append(htmlStr);
						} else {
							var option = [];
							option['pointLabels'] = 'ture';
							option['showDataLabels'] = 'ture';
							option['placement'] = 'outside';
							option['location'] = 's';
							option['numberRows'] = '8';
							option['numberColumns'] = '4';
							option['tooltip'] = 'ture';
							$('#Chart_Tap3-5').empty();
							pieChart("Chart_Tap3-5",data,option);

							var tap3_5 = $('div#Chart_Tap3-5 table.jqplot-table-legend').innerHeight();
							$('.tap3_5').css({'margin-top':tap3_5});
							$('div#Chart_Tap3-5 table.jqplot-table-legend').css({'margin-top' : '15px'});
						}
					}
				});
			}

	// Get value and generate pieChart-6
	var chart6_groupByplaza = function(paramYear, paramMonth, paramMonthName) {
		$.ajax({
			url : "../Model/Tab3/chart6_Refill_Months.jsp",
			type : "post",
			dataType : "json",
//			async : false,
			data : {"paramYear" : paramYear,"paramMonth" : paramMonth},
			success : function(data) {
//				 console.log(data);
				$("#Charttext_Tap3-6").empty().append("ยอดเติมเงินแยกตามด่าน เดือน"+paramMonthName+" ปี "+ paramYear);
						if (data.length == 0) {
							var htmlStr = "<h3 style=\"color:red; text-align:center;\"> No Data Found!! </h3>";
							$("#Chart_Tap3-6").append(htmlStr);
						} else {
							var option = [];
							option['pointLabels'] = 'ture';
							option['showDataLabels'] = 'ture';
							option['placement'] = 'outside';
							option['location'] = 's';
							option['numberRows'] = '8';
							option['numberColumns'] = '4';
							option['tooltip'] = 'ture';
							$('#Chart_Tap3-6').empty();
							pieChart("Chart_Tap3-6",data,option);

							var tap3_6 = $('div#Chart_Tap3-6 table.jqplot-table-legend').innerHeight();
							$('.tap3_6').css({'margin-top':tap3_6});
							$('div#Chart_Tap3-6 table.jqplot-table-legend').css({'margin-top' : '15px'});
						}
					}
				});
			}
		});
	});