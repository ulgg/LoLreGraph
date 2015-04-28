package ulg.guestbook;
 
import java.io.IOException;
import java.util.Date;
import javax.jdo.PersistenceManager;  //  Åy1Åz
import javax.servlet.http.*;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import ulg.guestbook.Greeting;  //  Åy2Åz
import ulg.guestbook.PMF;       //  Åy2Åz
 
public class SignGuestbookServlet extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();
        String content = req.getParameter("content");
        Date date = new Date();
        //  Åy3ÅzénÇ‹ÇË
        Greeting greeting = new Greeting(user, content, date);
        PersistenceManager pm = PMF.get().getPersistenceManager();
        try {
            pm.makePersistent(greeting);
        } finally {
            pm.close();
        }
        //  Åy3ÅzèIÇÌÇË
        resp.sendRedirect("/guestbook/guestbook.jsp");
    }
}