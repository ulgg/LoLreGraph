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
    PersistenceManager pm = PMF.get().getPersistenceManager();   // Åy1Åz
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
    throws IOException {
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("utf-8");
        String empno = req.getParameter("empno");
        
        String out = "";
        Query query = pm.newQuery(empmas.class);        // Åy2Åz
        query.setFilter("empno == empnoParam");          // Åy3Åz
        query.declareParameters("String empnoParam");    // Åy4Åz
        try {
            List<empmas> results = (List<empmas>) query.execute(empno);   // Åy5Åz
            if (results.iterator().hasNext()) {
                for (empmas e : results) {
                    out += e.getEmpname()+"<i>";
                    out += e.getDepart()+"<i>";
                    out += e.getSection()+"<i>";
                    out += e.getDate()+"<i>";
                    out += "éQè∆ê¨å˜ é–àıî‘çÜ="+empno;
                    resp.getWriter().println(out);
                }
            } else {
                resp.getWriter().println("NO<i>ÅFéQè∆é∏îs é–àıî‘çÜ="+empno); 
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
                resp.getWriter().println("OKÅFìoò^ê¨å˜  é–àıî‘çÜ="+empno);
            } catch(Exception e){
                resp.getWriter().println("NOÅFìoò^é∏îsÅ@ErrorÅF " + e);
            } 
        }else if(mode.equals("upd")){
            Date date = new Date();
            try {
                empmas e = pm.getObjectById(empmas.class, empno);   //Åy6Åz
                e.setEmpname(empname);
                e.setDepart(depart);                               //Åy7Åz
                e.setSection(section);
                e.setDate(date);
            }catch (Exception e){
                resp.getWriter().println("NOÅFçXêVé∏îs ErrorÅF"+e);
            } finally {
                pm.close();                                       //Åy8Åz
                resp.getWriter().println("OKÅFçXêVê¨å˜ é–àıî‘çÜ=" + empno);
                pm = PMF.get().getPersistenceManager();             // Åy9Åz
            }
        }else if(mode.equals("del")){
            try {
                empmas emas = pm.getObjectById(empmas.class, empno);  //Åy10Åz
                pm.deletePersistent(emas);                            //Åy11Åz
                resp.getWriter().println("OK:çÌèúê¨å˜  é–àıî‘çÜ=" + empno);
            }catch (Exception e){
                resp.getWriter().println("NO:çÌèúé∏îs   Error:" + e);
            }
        }
    }
}