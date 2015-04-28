package ulg.guestbook;
 
import java.io.IOException;
import java.util.Date;
import javax.jdo.PersistenceManager;  //  �y1�z
import javax.servlet.http.*;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import ulg.guestbook.Greeting;  //  �y2�z
import ulg.guestbook.PMF;       //  �y2�z
 
public class SignGuestbookServlet extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();
        String content = req.getParameter("content");
        Date date = new Date();
        //  �y3�z�n�܂�
        Greeting greeting = new Greeting(user, content, date);
        PersistenceManager pm = PMF.get().getPersistenceManager();
        try {
            pm.makePersistent(greeting);
        } finally {
            pm.close();
        }
        //  �y3�z�I���
        resp.sendRedirect("/guestbook/guestbook.jsp");
    }
}