<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();
		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");
 		String paramPlaza = request.getParameter("paramPlaza");
 		String paramSystem = request.getParameter("paramSystem");
		String systempWhereStr;
		if(paramSystem.trim().equals("ALL")){
			systempWhereStr = " ";
		}else{
			systempWhereStr = "AND FPT.PASSING_TYPE = '"+paramSystem.trim()+"' ";
		}
			String query="SELECT 'ช่อง '||FPT.LANE_ID, ROUND(SUM(FPT.NO_OF_PASSING) / COUNT(DISTINCT LANE_ID)), DD.CALENDAR_MONTH_NO,DP.PLAZA_NAME_TH FROM FACT_PASSING_TRANS FPT "
					+"JOIN DIM_DATE DD ON DD.DATE_KEY=FPT.DATE_KEY  JOIN DIM_PLAZA DP ON DP.PLAZA_KEY=FPT.PLAZA_KEY "
					+"WHERE DD.CALENDAR_YEAR="+paramYear+" AND DD.CALENDAR_MONTH_NO="+paramMonth+" AND DP.PLAZA_ID="+paramPlaza+" "
					+systempWhereStr
					+"GROUP BY FPT.LANE_ID,DD.CALENDAR_MONTH_NAME, DD.CALENDAR_MONTH_NO, DP.PLAZA_NAME_TH "
					+"ORDER BY FPT.LANE_ID ASC"; 
		String columns="1,3,2";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
%>