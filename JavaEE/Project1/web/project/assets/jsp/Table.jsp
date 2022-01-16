<%@ page contentType="text/html;charset=UTF-8"
         language="java"
         import="java.util.*"
         import="point.Result"
         import="java.util.Stack"
%>
<%
    Stack<Result> points = (Stack<Result>) session.getServletContext().getAttribute("points");

    if (points != null) {
        for (int k = points.size() - 1; k > -1; k--) {
%>
    <tr>
        <td width=\"95px\"> <%= points.get(k).getResult() %> </td>
        <td width=\"20px\"> <%= points.get(k).getX() %> </td>
        <td width=\"20px\"> <%= points.get(k).getY() %> </td>
        <td width=\"20px\"> <%= points.get(k).getR() %> </td>
        <td> <%= points.get(k).getExecuteTime() %> </td>
        <td> <%= points.get(k).getCurrentTime() %> </td>
    <tr>
<%
        }
    }
%>
