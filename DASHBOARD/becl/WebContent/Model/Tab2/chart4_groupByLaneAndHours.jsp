<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();
		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");
		String paramDay = request.getParameter("paramDay");
		String paramSystem = request.getParameter("paramSystem");
		String systempWhereStr;
		if(paramSystem.trim().equals("ALL")){
			systempWhereStr = " ";
		}else{
			systempWhereStr = "AND FPT.PASSING_TYPE = '"+paramSystem.trim()+"' ";
		}
		//String paramYear = "2558";
		//String paramMonth = "7";
		//String paramDay = "1";
		String query="SELECT DP.PLAZA_NAME_TH, DTR.TIME_RANGE_GROUP, SUM(FPT.NO_OF_PASSING) "
				+"NO_OF FROM FACT_PASSING_TRANS FPT, DIM_DATE DD, DIM_PLAZA DP, DIM_TIME_RANGE DTR "
				+"WHERE DD.DATE_KEY = FPT.DATE_KEY AND DP.PLAZA_KEY = FPT.PLAZA_KEY AND DTR.TIME_RANGE_KEY = FPT.TIME_RANGE_KEY "
				+"AND DD.CALENDAR_YEAR = "+paramYear+" AND DD.CALENDAR_MONTH_NO = "+paramMonth+" AND EXTRACT(DAY FROM DD.CALENDAR_DATE) = "+paramDay+" AND DTR.TIME_RANGE_GROUP<>'N/A' "
				+systempWhereStr
				+"GROUP BY DP.PLAZA_NAME_TH, DTR.TIME_RANGE_GROUP "  
				+"ORDER BY DP.PLAZA_NAME_TH, DTR.TIME_RANGE_GROUP";
				
		String columns="1,2,3"; //[series, values, seriesDesc]
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
	//out.println(query);
%>