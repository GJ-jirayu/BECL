<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();

		/* String query="SELECT DISTINCT CALENDAR_MONTH_NO , CALENDAR_MONTH_NAME FROM DIM_DATE DD "
				+"INNER JOIN  FACT_PASSING_TRANS FPT ON DD.DATE_KEY = FPT.DATE_KEY "
				+"WHERE CALENDAR_MONTH_NO <> '0' AND CALENDAR_MONTH_NO <> '99' "
				+"ORDER BY CALENDAR_MONTH_NO DESC";  */
				
	String query = ""
			+"SELECT CALENDAR_MONTH_NO , CALENDAR_MONTH_NAME "
			+"FROM DIM_DATE DD "
			+"WHERE CALENDAR_MONTH_NO <> '0' " 
			+"AND CALENDAR_MONTH_NO <> '99' " 
			+"GROUP BY CALENDAR_MONTH_NO, CALENDAR_MONTH_NAME "
			+"ORDER BY CALENDAR_MONTH_NO ";
	String columns="1,2";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
%>