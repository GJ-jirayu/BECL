<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();
		String paramYear = request.getParameter("paramYear");
		String query="SELECT DD.CALENDAR_YEAR, DD.CALENDAR_MONTH_NAME, SUM(FPT.NO_OF_POS_TRANS), DD.CALENDAR_MONTH_NO  FROM FACT_POS_TRANS FPT "
				+"JOIN DIM_DATE DD ON FPT.DATE_KEY = DD.DATE_KEY "
				+"JOIN DIM_PLAZA DP ON DP.PLAZA_KEY=FPT.PLAZA_KEY "
				+"JOIN DIM_ACTIVITY DA ON DA.ACTIVITY_KEY=FPT.ACTIVITY_KEY "
				+"WHERE DA.ACTIVITY_ID=1 AND DD.CALENDAR_YEAR = "+paramYear+" "
				+"GROUP BY DD.CALENDAR_YEAR,DD.CALENDAR_MONTH_NAME,DD.CALENDAR_MONTH_NO "
				+"ORDER BY DD.CALENDAR_YEAR ASC";
				
		String columns="2,3,4";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
%>