<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	//th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

	String paramUser = request.getRemoteUser();

	out.println("[[\""+paramUser+"\"]]");
    
%>