function formatNumber(num) {
	if (num == null) {
		num = 0;
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	} else {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
}

$(document)
		.ready(
				function() {
					$('.subnav').affix({
						offset : {
							top : $('.navtop').height()
						}
					})

					$(".paramYear .input-group").show();
					// $(".paramMonth .input-group").hide();
					// $(".paramPlaza .input-group").hide();

					$(".paramYear").show();
					// $(".paramMonth").show();
					// $(".paramNull").hide();

					// $(".paramPlaza").hide();
					// $(".paramNull2").show();
					
					/*Set Current Year & Month*/
					var currentDate = new Date();
					var currentYear = currentDate.getFullYear()+543;
					var currentMonth = (currentDate.getMonth()+1);
					//console.log("currentYear:"+currentYear+", currentMonth:"+currentMonth);
					
					/* START: Get User Pentaho */
					function cerateParamUser() {
						$.ajax({
							url : "../Model/paramUser.jsp",
							type : "get",
							dataType : "json",
							async : false,
							success : function(data) {
								var htmlParamUser = data;

								// htmlParamYear = indexEntry[0];
								$("#UserID").html(htmlParamUser); // id for
								// Index.html
							}
						});
					}
					 cerateParamUser();
					/* END: Get User Pentaho */

					
					
					/* START: Generate paramYear */
					function cerateParamYear() {
						$.ajax({
						url : "../Model/paramYear.jsp",
						type : "get",
						dataType : "json",
						async : false,
						success : function(data) {
//							console.log();
							var htmlParamYear = "";
							// htmlParamYear
							htmlParamYear += "<select class=\"selectpicker form-control\" data-live-search=\"true\" id=\"paramYear\" style=\"padding:0px 12px;\" >";
							// loop [json]data into <option>
							$.each(data,function(index,indexEntry) {
								//console.log(index+":"+indexEntry[0]);
								//if (index == 0) {
								if (indexEntry[0] == currentYear) {
									htmlParamYear += "<option selected=\"selected\">";
									htmlParamYear += indexEntry[0];
									htmlParamYear += "</option>";
								} else {
									htmlParamYear += "<option>";
									htmlParamYear += indexEntry[0];
									htmlParamYear += "</option>";
								}
							});
							htmlParamYear += "</select>";
							$("#paramYearList").html(htmlParamYear);
							
						// $("#paramYear").kendoDropDownList();
						// // value
						// cerateParamMonth($("#paramYear").val());
						}
					});
				}
				cerateParamYear();
				/* END: Generate paramYear */

				
				
				/* START: Generate paramMonth */
				function cerateParamMonth(paramYear) {
					$.ajax({
					url : "../Model/paramMonth.jsp",
					type : "get",
					dataType : "json",
					data : {"paramYear" : $("#paramYear").val() },
					async : false,
					success : function(data) {
						var htmlParamMonth = "";
						htmlParamMonth += "<select class=\"selectpicker form-control\" data-live-search=\"true\" id=\"paramMonth\" style=\"padding:0px 12px;\" >";
						// loop [json]data into <option>
						$.each(data, function(index, indexEntry) {
							//console.log(indexEntry);
							if (indexEntry[0] == currentMonth) {
								htmlParamMonth += "<option selected=\"selected\" value=\" "+ indexEntry[0]+ " \" >";
								htmlParamMonth += indexEntry[1];
								htmlParamMonth += "</option>";
							} else {
								htmlParamMonth += "<option value=\" "+indexEntry[0]+ " \">";
								htmlParamMonth += indexEntry[1];
								htmlParamMonth += "</option>";
							}
						});
						htmlParamMonth += "</select>";
						$("#paramMonthList").html(htmlParamMonth); 

					}
				});
			}
			cerateParamMonth(paramYear);
			/* END: Generate paramMonth */

			
			
			/* START: Generate paramPalza (ด่าน) */
			function cerateParamPlaza(paramMonth) {
				$.ajax({
					url : "../Model/paramPlaza.jsp",
					type : "get",
					dataType : "json",
					// data:{"paramMonth":$("#paramMonth").val()},
					async : false,
					success : function(data) {
					var htmlParamPlaza = "";
					htmlParamPlaza += "<select class=\"selectpicker form-control\" data-live-search=\"true\" id=\"paramPlaza\" style=\padding:0px 12px;\" >";
					// loop [json]data into <option>
					$.each(data,function(index, indexEntry) {
						if (index == 0) {
							htmlParamPlaza += "<option selected=\"selected\" value=\" "
																		+ indexEntry[0]
																		+ " \" >";
																htmlParamPlaza += indexEntry[2];
																htmlParamPlaza += "</option>";
															} else {
																htmlParamPlaza += "<option value=\" "
																		+ indexEntry[0]
																		+ " \">";
																htmlParamPlaza += indexEntry[2];
																htmlParamPlaza += "</option>";
															}
														});
										htmlParamPlaza += "</select>";
										$("#paramPlazaList").html(
												htmlParamPlaza); // id for
										// Index.html
									}
								});
					}
					cerateParamPlaza(paramMonth);
					// end paramPlaza
					
					/* START: Generate paramSystem (ระบบ) */
					function cerateParamSystem() {
						$.ajax({
							url : "../Model/paramSystem.jsp",
							type : "get",
							dataType : "json",
							// data:{"paramSystem":$("#paramSystem").val()},
							async : false,
							success : function(data) {
							var htmlParamSystem = "";
							htmlParamSystem += "<select class=\"selectpicker form-control\" data-live-search=\"true\" id=\"paramSystem\" style=\padding:0px 12px;\" >";
							// loop [json]data into <option>
							$.each(data,function(index, indexEntry) {
								if (index == 0) {
									htmlParamSystem += "<option selected=\"selected\" value=\" "
																				+ indexEntry[0]
																				+ " \" >";
																		htmlParamSystem += indexEntry[1];
																		htmlParamSystem += "</option>";
																	} else {
																		htmlParamSystem += "<option value=\" "
																				+ indexEntry[0]
																				+ " \">";
																		htmlParamSystem += indexEntry[1];
																		htmlParamSystem += "</option>";
																	}
																});
												htmlParamSystem += "</select>";
												$("#paramSystemList").html(
														htmlParamSystem); 
											}
										});
							}
							cerateParamSystem();
							// end paramSystem
					
					$("li#liTap1").addClass('active');
					$("form#formAction").submit(function() {
						$("div#navbar-ex-collapse ul").each(function() {
							if ($("li", this).eq(0).hasClass("active")) {
								$("[href='#tabs1']").trigger("click");
								return false;
							} else if ($("li", this).eq(1).hasClass("active")) {
								$("[href='#tabs2']").trigger("click");
								return false;
							} else if ($("li", this).eq(2).hasClass("active")) {
								$("[href='#tabs3']").trigger("click");
								return false;
							} else {
								false;
							}
						});
						return false;
					});

					setTimeout(function() {
						$("a[href='#tabs1']").trigger("click");
					}, 500);
				});