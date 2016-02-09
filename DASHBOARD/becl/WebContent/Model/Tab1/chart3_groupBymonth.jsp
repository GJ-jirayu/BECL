<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();
		String paramYear = request.getParameter("paramYear");
		String paramPlaza = request.getParameter("paramPlaza");
		String paramMonth = request.getParameter("paramMonth");
		String paramSystem = request.getParameter("paramSystem");
		String systempWhereStr;
		if(paramSystem.trim().equals("ALL")){
			systempWhereStr = " ";
		}else{
			systempWhereStr = "AND FPT.PASSING_TYPE = '"+paramSystem.trim()+"' ";
		}
		
			String query="SELECT DD.CALENDAR_MONTH_NO, DD.CALENDAR_MONTH_NAME, DP.PLAZA_ID, DP.PLAZA_NAME_TH, SUM(FPT.NO_OF_PASSING) SUMNO FROM FACT_PASSING_TRANS FPT "
					+"JOIN DIM_DATE DD ON DD.DATE_KEY=FPT.DATE_KEY "
					+"JOIN DIM_PLAZA DP ON FPT.PLAZA_KEY=DP.PLAZA_KEY "
					+"WHERE DD.CALENDAR_YEAR=' "+paramYear+" 'AND DP.PLAZA_ID='"+paramPlaza+"' "
					+systempWhereStr
					+"GROUP BY DD.CALENDAR_MONTH_NO, DD.CALENDAR_MONTH_NAME,DP.PLAZA_ID, DP.PLAZA_NAME_TH "
					+"ORDER BY DD.CALENDAR_MONTH_NO ASC";
		String columns="2,3,5,1,4";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
	//out.println(query);
%>

