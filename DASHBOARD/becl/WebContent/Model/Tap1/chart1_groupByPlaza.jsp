<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();
		String paramYear = request.getParameter("paramYear");
		String query="SELECT FPT.PLAZA_KEY, DP.PLAZA_NAME_TH, SUM(FPT.NO_OF_PASSING) FROM FACT_PASSING_TRANS FPT "
				+ "JOIN DIM_PLAZA DP ON FPT.PLAZA_KEY = DP.PLAZA_KEY "
				+ "JOIN DIM_DATE DD ON DD.DATE_KEY = FPT.DATE_KEY "
				+ "WHERE DD.CALENDAR_YEAR = '"+paramYear+ "' "
				+ "GROUP BY FPT.PLAZA_KEY,DP.PLAZA_NAME_TH "
				+ "ORDER BY DP.PLAZA_NAME_TH ASC"; 
		String columns="2,3";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
%>