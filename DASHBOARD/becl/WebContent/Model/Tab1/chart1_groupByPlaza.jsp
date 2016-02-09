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
		
		/* String query="SELECT FPT.PLAZA_KEY, DP.PLAZA_NAME_TH, SUM(FPT.NO_OF_PASSING), DP.PLAZA_ID FROM FACT_PASSING_TRANS FPT "
				+ "JOIN DIM_PLAZA DP ON FPT.PLAZA_KEY = DP.PLAZA_KEY "
				+ "JOIN DIM_DATE DD ON DD.DATE_KEY = FPT.DATE_KEY "
				+ "WHERE DD.CALENDAR_YEAR = '"+paramYear+ "' "
				+ systempWhereStr
				+ "GROUP BY FPT.PLAZA_KEY,DP.PLAZA_NAME_TH,DP.PLAZA_ID "
				+ "ORDER BY DP.PLAZA_NAME_TH ASC";  */
				
	String query = ""
			+"SELECT F.PLAZA_KEY, "
			+"  DP.PLAZA_NAME_TH, "
			+"  F.NO_OF_PASSING, "
			+"  DP.PLAZA_ID "
			+"FROM "
			+"  (SELECT FPT.PLAZA_KEY, "
			+"    SUM (NO_OF_PASSING) NO_OF_PASSING "
			+"  FROM FACT_PASSING_TRANS FPT "
			+"  WHERE EXISTS "
			+"    (SELECT * "
			+"    FROM DIM_DATE DD "
			+"    WHERE CALENDAR_YEAR = "+paramYear.trim()+" "
			+"    AND DD.DATE_KEY     = FPT.DATE_KEY "
			+"    ) "
			+   systempWhereStr
			+"  GROUP BY FPT.PLAZA_KEY "
			+"  )F "
			+"INNER JOIN DIM_PLAZA DP ON (F.PLAZA_KEY = DP.PLAZA_KEY)";
	String columns="2,3,4";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
	//out.println(query);
%>