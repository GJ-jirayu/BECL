
var barChart=function(chartId,data,option){
	//themeBarChart="";
	
	if(option['cateRotate']==""){
		option['cateRotate']=0;
	}
	
	// #############get id on hover for get id for use tooltip#########################
	$(".chart").hover(function(){
		//alert(this.id);
		$(".idChart").remove();
		$("body").append("<div class=\"idChart\" style=\"display:none\">"+this.id+"</div>");
	});

	
	if(option['themeCustom']!=undefined){
		themeBarChart=option['themeCustom'];
		//$(".theme").remove();
		$("body").append("<div id=theme"+chartId+" class=\"themeTooltip\" style=\"display:none\">"+option['themeCustom']+"</div>");
	}else{
	
		themeBarChart=option['theme'];
		//$(".theme").remove();
		$("body").append("<div id=theme"+chartId+" class=\"themeTooltip\" style=\"display:none\">"+option['theme']+"</div>");
	}
	// #############get id on hover for get id for use tooltip#########################
	
	
	if(option['pointLabelsDicimal']==true){
		dicimal="%.2f";
	}else{
		dicimal="%d";
	}
	//checkOption end
	Array.prototype.getUnique = function(){
		   var u = {}, a = [];
		   for(var i = 0, l = this.length; i < l; ++i){
		      if(u.hasOwnProperty(this[i])) {
		         continue;
		      }
		      a.push(this[i]);
		      u[this[i]] = 1;
		   }
		   return a;
		}

		var cateArray= new Array();
		var cateArrayUnique= new Array();
		var seriesArray=new Array();
		var seriesArrayUnique=new Array();
		var series="";
		
		
		$.each(data,function(index,indexEntry){
			//alert(indexEntry[2]);
			cateArray[index]=indexEntry[0];
			seriesArray[index]=indexEntry[1];
		});
		cateArrayUnique=cateArray.getUnique();
		seriesArrayUnique=seriesArray.getUnique();

		series+="[";
		$.each(seriesArrayUnique,function(index,indexEntry){
			if(index==0){
			series+="{label:'"+indexEntry+"'}";
			}else{
			series+=",{label:'"+indexEntry+"'}";
			}
			
		});
		series+="]";

		var cateLength=cateArrayUnique.length-1;
		var slotArray= new Array();//get array all
		var slotArray2= new Array();//get array for data is not empty
		
		for(var i=0;i<seriesArrayUnique.length;i++){
			
			
			slotArray[i] = new Array();
			slotArray2[i] = new Array();
			
			
			for(var j=0;j<cateArrayUnique.length;j++){
				slotArray[i][j]=cateArrayUnique[j];
				//alert(cateArrayUnique[j]);
				
				$.each(data,function(index,indexEntry){
					if((cateArrayUnique[j]==indexEntry[0])&&(seriesArrayUnique[i]==indexEntry[1])){
						//alert(cateArrayUnique[j]+"-"+indexEntry[2]);
						slotArray2[i][j]=indexEntry[2];
					}
				});
			}
		}

		var value="";
		value+="[[";
		var checkUndefinedValue=0;
		//manage import data value  and check undefined value
		for(var i=0;i<slotArray.length;i++){
					//alert(slotArray[i]);
				for(var j=0;j<slotArray[i].length;j++){
					if(slotArray2[i][j]==undefined){
						checkUndefinedValue=0; 
					}else{
						checkUndefinedValue=slotArray2[i][j];
					}
					
					if(i==0){
						if(j==0){
						value+=+checkUndefinedValue;
						}else{
						value+=","+checkUndefinedValue;	
						}
					}else{
						if(cateLength==cateArrayUnique.length-1){
							value+=",["+checkUndefinedValue;
						}else{
							value+=","+checkUndefinedValue;
						}
					}
					
					if(cateLength==0){
						value+="]";
						cateLength=cateArrayUnique.length;
					}
					cateLength--;
				}
		}
		value+="]";
		
	    var ticks =cateArrayUnique;
	    var obValue=eval("("+value+")");
	    var obSeries=eval("("+series+")");
	    var plot1 = $.jqplot(chartId, obValue, {
	    	animate: true,
	    	height:option['chartHeight'],
	        seriesDefaults:{
	            renderer:$.jqplot.BarRenderer,
	            rendererOptions: {fillToZero: true,
	            				 barWidth: option['barWidth'],
	            				 barPadding: option['barPadding'],
	            				 //barDirection: 'horizontal'
	            				 },
	            pointLabels: { show: option['pointLabels'] },
	        },
	       
	        stackSeries: option['stackSeries'],
	        title: option['title'],
	        series:obSeries,
	        
	        axes: {
	            xaxis: {
	            	label:option['axes-xaxis-label'],
	            	labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
	                renderer: $.jqplot.CategoryAxisRenderer,
	                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
	                tickOptions: {
	                	formatString:dicimal, 
	                	formatter: $.jqplot.euroFormatter,
	                	fontFamily: option['fontFamily'],
	                	fontSize: option['fontSize'],
	                	textColor:option['textColor'],
	                	angle: option['angle'],
      		        },
      		        ticks: ticks,
	                min:0,
	                max:option['max'],
	            },
	            yaxis: {
	            	labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
	            	labelOptions: {
//	        			 			fontFamily: option['fontFamily'],
//	        		                fontSize: option['fontSize'],
//	        		                textColor:option['textColor']
						            fontFamily: 'Georgia, Serif',
					                fontSize: '18px',
					                textColor:'#000'
	        		},	        
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
	            	tickOptions:{
	            		 		formatString:dicimal,
	            		 		formatter: $.jqplot.euroFormatter,
	    	                	fontFamily: option['fontFamily'],
	    	                	fontSize: option['fontSize'],
	    	                	textColor:option['textColor'],
	            		        },
	       	         label: option['labelY'],
	            	 min:0,
	            	 max:option['max'],	        		 
	            },
	        },
	        
	        /*legend:{ 
                show:true,
                    renderer: $.jqplot.EnhancedLegendRenderer,
                    location: option['location'] ,
                    placement :option['placement'],
                    marginTop : "10px",
                    rendererOptions: {
                        numberRows: option['numberRows'],
                    }
                 },*/
                 
	        seriesColors: themeBarChart,
	        highlighter:{
	            show:option['tooltip'],
	            tooltipContentEditor:tooltipContentEditor,
	            grid: {background: '#000', gridLineColor: '#222', borderColor: '#222'}
	        },
	    });
	    
	    if(option['clickable']==true){
	    		    
		    $("#"+chartId).on('jqplotDataHighlight', function () {
		    	   $("#"+chartId+" > .jqplot-event-canvas").css( 'cursor', 'pointer' );
		    	});
	    }
	    $("#"+chartId+">.jqplot-yaxis-tick").css({"color":"#000000"});
	    $("#"+chartId+">.jqplot-point-label").css({"font-size":option['pointLabelsFont'],"color":option['pointLabelsColor']});
	    $("#"+chartId+">.jqplot-highlighter-tooltip").css({"font-size":option['tooltipFontSize']});
	    $("#"+chartId+">.jqplot-point-label").css({
	    	"-webkit-transform":"rotate("+option['pointLabelsRotate']+"deg)",
	    	"-moz-transform":"rotate("+option['pointLabelsRotate']+"deg)",
	    	"-transform":"rotate("+option['pointLabelsRotate']+"deg)",
	    	"-ms-transform":"rotate("+option['pointLabelsRotate']+"deg)",
	    	});
	    
	    /*Set Background Tooltip*/
	    $('#'+chartId).bind('jqplotDataMouseOver', function (ev, seriesIndex, pointIndex, data) {
	    	//console.log(plot1.negativeSeriesColors[seriesIndex]);
        	$(".jqplot-highlighter-tooltip").css({"backgroundColor":plot1.negativeSeriesColors[seriesIndex]});
        });
	};
	  