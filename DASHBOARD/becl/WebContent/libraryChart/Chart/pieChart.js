var pieChart = function(chartId,data,option){

	 //var value= eval("("+data+")");
	/*
	if(option['themeCustom']){
		theme=option['themeCustom'];
		}else{
		theme=option['theme'];
		}
	*/
	
	
	// #############get id on hover for get id for use tooltip#########################
	$(".chart").hover(function(){
		//alert(this.id);
		$(".idChart").remove();
		$("body").append("<div class=\"idChart\" style=\"display:none\">"+this.id+"</div>");
	});

	
	if(option['themeCustom']!=undefined){
		theme=option['themeCustom'];
		//$(".theme").remove();
		$("body").append("<div id=theme"+chartId+" class=\"themeTooltip\" style=\"display:none\">"+option['themeCustom']+"</div>");
	}else{
	
		theme=option['theme'];
		//$(".theme").remove();
		$("body").append("<div id=theme"+chartId+" class=\"themeTooltip\" style=\"display:none\">"+option['theme']+"</div>");
	}
	// #############get id on hover for get id for use tooltip#########################
	
	
	        //[[\"Heavy Industry\",12],[\"Retail\",9]]
	var value = "";
	value+="[";
	
	$.each(data,function(index,indexEntry){
		if(index==0){
			value+="[";
			value+="\""+indexEntry[0]+"\""+","+indexEntry[1];
			
		}else{
			value+=",[";
			value+="\""+indexEntry[0]+"\""+","+indexEntry[1];
		}
		value+="]";
	});
	value+="]";
	var valueObj= eval("("+value+")");
	
	
	            var plot1 = jQuery.jqplot (chartId, [valueObj],
	            		
	              {
	            	seriesColors: ["#3f5b70","#f7ce00","#f09221","#f25f4b","#00c6af","#009488","#005b56","#8b1144","#d01d07","#fd6300","#66c1ed","#2468b3","#55358a","#9262b8","#d18be3","#ffadf5","#ff2d78","#d6235d","#ab1940","#8fca4a"
	            	               ,"#5aae4c","#79ab4a","#879f09","#9d5b10","#6e6666","#1f9887","#900f75","#ffcd2c","#f9e99f","#b04f46","#bed62f","#b19f58","#8a6754","#be9032","#83332f","#ffeb6b","#674d82","#f09082","#ffeabb","#fdfed4"],
	            	title: option['title'],
	                seriesDefaults: {
	                  renderer: jQuery.jqplot.PieRenderer,
	                  rendererOptions: {
	                	sliceMargin: 4, 
	                    showDataLabels: option['showDataLabels'],
	                    dataLabels: option['dataLabels'],
	                    dataLabelPositionFactor:option['dataLabelPositionFactor'],
	                    padding:option['padding'],
	                  }
	                },
	                highlighter: {
	                	  show: option['tooltip'],
	                	  formatString:'%s , %d', 
	                	  tooltipLocation:'sw', 
	                	  useAxesFormatters:false,
	                	  tooltipContentEditor:tooltipContentEditorByCate //tooltipContentEditorByCate
	                	},
	                legend: { 
//	                		show:true, 
//	                		location: option['location'], 
//	                		placement: option['placement'],
//	                		numberRows: option['numberRows']
		                show:true,
		                renderer: $.jqplot.EnhancedLegendRenderer,
		                location: option['location'] ,
		                placement :option['placement'],
		                marginTop : "10px",
			                rendererOptions: {
			                       numberRows: option['numberRows'],
			                       numberColumns: option['numberColumns']
			                }
	                	},
	                	axesDefaults: {
	                        show: false,

	                        showTicks: false,
	                        showTickMarks: false

	                    }
	              }
	              
	            );
	            //$("#"+chartId+">.jqplot-data-label").css({"font-size":option['pointLabelsFont']});
	            $("#"+chartId+">.jqplot-data-label").css({"font-size":option['pointLabelsFont'],"color":option['pointLabelsColor']});
	            //$(".jqplot-highlighter-tooltip").css({"background":option['theme'][0],"color":option['tooltipTextColor'],"opacity":"1"});
	           
	            
	            /*Set Background Tooltip*/
	    	    $('#'+chartId).bind('jqplotDataMouseOver', function (ev, seriesIndex, pointIndex, data) {
	            	$("#"+chartId+" .jqplot-highlighter-tooltip").css({"backgroundColor":plot1.series[seriesIndex].seriesColors[pointIndex]});
	    	    	
	            });
	    	    
//	    	    $('table.jqplot-table-legend').css({"display":"inline-block"});
};