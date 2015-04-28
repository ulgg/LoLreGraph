package ulg.erp.emp;
 
import java.io.IOException;
 
import javax.jdo.PersistenceManager;
import javax.servlet.http.*;
import java.util.Date;
import java.util.List;
import javax.jdo.Query;
import ulg.erp.emp.PMF;
import ulg.erp.emp.empmas;
 
@SuppressWarnings("serial")
public class empCrudServlet extends HttpServlet {
    PersistenceManager pm = PMF.get().getPersistenceManager();   // �y1�z
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
    throws IOException {
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("utf-8");
        String empno = req.getParameter("empno");
        
        String out = "";
        Query query = pm.newQuery(empmas.class);        // �y2�z
        query.setFilter("empno == empnoParam");          // �y3�z
        query.declareParameters("String empnoParam");    // �y4�z
        try {
            List<empmas> results = (List<empmas>) query.execute(empno);   // �y5�z
            if (results.iterator().hasNext()) {
                for (empmas e : results) {
                    out += e.getEmpname()+"<i>";
                    out += e.getDepart()+"<i>";
                    out += e.getSection()+"<i>";
                    out += e.getDate()+"<i>";
                    out += "�Q�Ɛ��� �Ј��ԍ�="+empno;
                    resp.getWriter().println(out);
                }
            } else {
                resp.getWriter().println("NO<i>�F�Q�Ǝ��s �Ј��ԍ�="+empno); 
            }
        } finally {
            query.closeAll();
        }       
    }
    
    public void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws IOException {
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("utf-8");
        
        String mode = req.getParameter("mode");
        String empno = req.getParameter("empno");
        String empname = req.getParameter("empname");
        String depart = req.getParameter("depart");
        String section = req.getParameter("section");
        
        if(mode.equals("add")){
            Date date = new Date();
            empmas emas = new empmas(empno, empname, depart, section, date);
            PersistenceManager pm = PMF.get().getPersistenceManager();
            try {
                pm.makePersistent(emas);
                resp.getWriter().println("OK�F�o�^����  �Ј��ԍ�="+empno);
            } catch(Exception e){
                resp.getWriter().println("NO�F�o�^���s�@Error�F " + e);
            } 
        }else if(mode.equals("upd")){
            Date date = new Date();
            try {
                empmas e = pm.getObjectById(empmas.class, empno);   //�y6�z
                e.setEmpname(empname);
                e.setDepart(depart);                               //�y7�z
                e.setSection(section);
                e.setDate(date);
            }catch (Exception e){
                resp.getWriter().println("NO�F�X�V���s Error�F"+e);
            } finally {
                pm.close();                                       //�y8�z
                resp.getWriter().println("OK�F�X�V���� �Ј��ԍ�=" + empno);
                pm = PMF.get().getPersistenceManager();             // �y9�z
            }
        }else if(mode.equals("del")){
            try {
                empmas emas = pm.getObjectById(empmas.class, empno);  //�y10�z
                pm.deletePersistent(emas);                            //�y11�z
                resp.getWriter().println("OK:�폜����  �Ј��ԍ�=" + empno);
            }catch (Exception e){
                resp.getWriter().println("NO:�폜���s   Error:" + e);
            }
        }
    }
}