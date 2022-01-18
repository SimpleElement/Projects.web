<%@ page import="beans.Result" %>
<%@ page import="java.util.List" %>

<%@ page contentType="text/html;charset=UTF-8" %>

<jsp:useBean id="results" class="beans.EntriesResults" scope="session"/>
<%
    List<Result> pointList = (List<Result>) results.getList();
    for (int k = pointList.size() - 1; k > -1; k--) {
%>
    <tr>
        <td>
            <%= pointList.get(k).getResult() %>
        </td>
        <td width="20px">
            <%= pointList.get(k).getX() %>
        </td>
        <td width="20px">
            <%= pointList.get(k).getY() %>
        </td>
        <td width="20px">
            <%= pointList.get(k).getR() %>
        </td>
        <td>
            <%= pointList.get(k).getExecuteTime() %>
        </td>
        <td>
            <%= pointList.get(k).getCurrentTime() %>
        </td>
    </tr>
    <%
        }
    %>
