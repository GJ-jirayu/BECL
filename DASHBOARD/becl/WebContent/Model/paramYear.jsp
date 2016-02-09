<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();

		/* String query="SELECT DISTINCT CALENDAR_YEAR FROM DIM_DATE DD "
				+"INNER JOIN FACT_PASSING_TRANS FPT ON DD.DATE_KEY = FPT.DATE_KEY "
				+"WHERE CALENDAR_YEAR <> '0' AND CALENDAR_YEAR NOT LIKE '%9999%' "
				+"ORDER BY CALENDAR_YEAR DESC";  */
	
	String query = ""
			+"SELECT CALENDAR_YEAR FROM DIM_DATE DD " 
			+"WHERE CALENDAR_YEAR <> '0' AND CALENDAR_YEAR NOT LIKE '%9999%' " 
			+"AND DD.CALENDAR_YEAR <= EXTRACT(YEAR FROM SYSDATE) "
			+"GROUP BY CALENDAR_YEAR "
			+"ORDER BY CALENDAR_YEAR DESC ";
	String columns="1";
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
// 	out.print(query);
%> 