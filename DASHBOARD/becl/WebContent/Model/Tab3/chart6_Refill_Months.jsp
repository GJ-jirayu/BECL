<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();
		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");
// 		String paramYear = "2558";
		//String paramMonth = "9";
		
		String query="SELECT DP.PLAZA_NAME_TH, SUM(FPT.POS_TRANS_AMOUNT), DD.CALENDAR_MONTH_NO FROM FACT_POS_TRANS FPT "
				+"JOIN DIM_DATE DD ON DD.DATE_KEY=FPT.DATE_KEY "
				+"JOIN DIM_PLAZA DP ON DP.PLAZA_KEY=FPT.PLAZA_KEY " 
				+"JOIN DIM_ACTIVITY DA ON DA.ACTIVITY_KEY=FPT.ACTIVITY_KEY "
				+"WHERE DA.ACTIVITY_ID=2 AND DD.CALENDAR_YEAR="+paramYear+" AND DD.CALENDAR_MONTH_NO= "+paramMonth+" "
				+"GROUP BY DP.PLAZA_NAME_TH ,DD.CALENDAR_MONTH_NO "
				+"ORDER BY DP.PLAZA_NAME_TH ASC";
				
		String columns="1,2,3";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
%>