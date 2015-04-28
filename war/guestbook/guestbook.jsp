<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="javax.jdo.PersistenceManager" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="ulg.guestbook.Greeting" %>
<%@ page import="ulg.guestbook.PMF" %>
<html>
  <body>
<%
    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    if (user != null) {
%>
      <p>今日は <%= user.getNickname() %>! (ここから<a href="<%= userService.createLogoutURL(request.getRequestURI()) %>">サインアウト</a>できます。）</p>
<%
    } else {
%>
      <p>今日は！<a href="<%= userService.createLoginURL(request.getRequestURI()) %>">サインイン</a>すると送信メッセージがサインイン名付で表示されます。</p>
<%
    }
%>
 
<%
    PersistenceManager pm = PMF.get().getPersistenceManager();                   //  【1】
    String query = "select from " + Greeting.class.getName()+ " order by date";  //  【1】
    List<Greeting> greetings = (List<Greeting>) pm.newQuery(query).execute();    //  【1】
    if (greetings.isEmpty()) {
%>
      <p>The guestbook has no messages.</p>
<%
    } else {
        for (Greeting g : greetings) {
            if (g.getAuthor() == null) {
%>
      <p>匿名ユーザの書き込み</p>
<%
            } else {
%>
      <p><b><%= g.getAuthor().getNickname() %></b>の書き込み：</p>
<%
            }
%>
      <blockquote><%= g.getContent() %></blockquote>
<%
        }
    }
    pm.close();
%>
    <form action="/sign" method="post">
      <div><textarea name="content" rows="3" cols="60"></textarea></div>
      <div><input type="submit" value="メッセージ送信" /></div>
    </form>
  </body>
</html>