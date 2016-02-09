<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.becl.service.connectionJNDI jndi = new th.co.becl.service.connectionJNDI();
		String paramYear = request.getParameter("paramYear");
		String paramSystem = request.getParameter("paramSystem");
		String systempWhereStr;
		if(paramSystem.trim().equals("ALL")){
			systempWhereStr = " ";
		}else{
			systempWhereStr = "AND FPT.PASSING_TYPE = '"+paramSystem.trim()+"' ";
		}
			/* String query="SELECT * FROM "
					  	+"(SELECT FPT.LANE_ID ||'-'|| DP.PLAZA_NAME_TH ,'top10' as l, SUM(FPT.NO_OF_PASSING) SUMNO FROM FACT_PASSING_TRANS FPT "
						+"JOIN DIM_PLAZA DP ON DP.PLAZA_KEY=FPT.PLAZA_KEY "
						+"JOIN DIM_DATE DD ON DD.DATE_KEY=FPT.DATE_KEY "
						+"WHERE DD.CALENDAR_YEAR = ' "+paramYear+"' "
						+systempWhereStr
						+"GROUP BY FPT.LANE_ID ||'-'|| DP.PLAZA_NAME_TH "
						+"ORDER BY SUMNO DESC) "
						+"WHERE ROWNUM <= 10"; */
	String query = ""
			+"SELECT a.LANE_ID  ||'-'  || DP.PLAZA_NAME_TH, "
			+"  'top10' AS top10, "
			+"  a.NO_OF_PASSING "
			+"FROM "
			+"  (SELECT FPT.PLAZA_KEY, "
			+"    FPT.LANE_ID , "
			+"    SUM (NO_OF_PASSING) NO_OF_PASSING "
			+"  FROM FACT_PASSING_TRANS FPT "
			+"  WHERE EXISTS "
			+"    (SELECT * "
			+"    FROM DIM_DATE DD "
			+"    WHERE CALENDAR_YEAR = '"+paramYear.trim()+"' "
			+"    AND DD.DATE_KEY     = FPT.DATE_KEY "
			+"    ) "
			+   systempWhereStr
			+"  GROUP BY FPT.PLAZA_KEY, "
			+"    FPT.LANE_ID "
			+"  ORDER BY NO_OF_PASSING DESC "
			+"  ) A "
			+"INNER JOIN DIM_PLAZA DP "
			+"ON (A.PLAZA_KEY = DP.PLAZA_KEY) "
			+"WHERE ROWNUM   <= 10 ";
	String columns="1,2,3";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
// 	out.println(query);
%>