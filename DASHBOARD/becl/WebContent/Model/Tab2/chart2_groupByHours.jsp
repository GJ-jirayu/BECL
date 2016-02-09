<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();
		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");
		String paramPlaza = request.getParameter("paramPlaza");
		String paramDay = request.getParameter("paramDay");
		String paramSystem = request.getParameter("paramSystem");
		String systempWhereStr;
		if(paramSystem.trim().equals("ALL")){
			systempWhereStr = " ";
		}else{
			systempWhereStr = "AND FPT.PASSING_TYPE = '"+paramSystem.trim()+"' ";
		}
		/* String paramYear = "2558";
		String paramMonth = "7";
		String paramPlaza = "201"; 
		String paramDay = "1";*/ 
		String query="SELECT DTR.TIME_RANGE_GROUP, SUM(FPT.NO_OF_PASSING) NO_OF FROM FACT_PASSING_TRANS FPT, DIM_DATE DD, DIM_TIME_RANGE DTR "
				+"WHERE FPT.DATE_KEY = DD.DATE_KEY AND DTR.TIME_RANGE_KEY = FPT.TIME_RANGE_KEY AND DD.CALENDAR_YEAR = '"+paramYear+"' AND DD.CALENDAR_MONTH_NO = '"+paramMonth+"' AND EXTRACT(DAY FROM DD.CALENDAR_DATE) = '"+paramDay+"' " 
				+"AND DTR.TIME_RANGE_GROUP <> 'N/A' AND EXISTS ( SELECT DP.PLAZA_ID FROM DIM_PLAZA DP "
				+"WHERE FPT.PLAZA_KEY = DP.PLAZA_KEY AND DP.PLAZA_ID = '"+paramPlaza+"' ) "
				+systempWhereStr
				+"GROUP BY DTR.TIME_RANGE_GROUP "
				+"ORDER BY DTR.TIME_RANGE_GROUP";
				
		String columns="1,2"; //[series, values, seriesDesc]
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
	
%>