<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();

		/* String query="SELECT 'ALL' VALCODE, 'ทั้งหมด' VALDESC FROM DUAL UNION "
				+ "SELECT DISTINCT PASSING_TYPE VALCODE, PASSING_TYPE VALDESC FROM FACT_PASSING_TRANS "
				+ "ORDER BY 2 DESC "; */
				
	String query = ""
			+"SELECT 'ALL' VALCODE, 'ทั้งหมด' VALDESC FROM DUAL UNION ALL "
			+"SELECT DISTINCT PASSING_TYPE VALCODE, PASSING_TYPE VALDESC "
			+"FROM FACT_PASSING_TRANS "
			+"ORDER BY 2 ASC ";
	String columns="1,2";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
%>