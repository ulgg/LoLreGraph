package ulg.erp.emp;
 
import java.util.Date;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
 
@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class empmas {
 
    @PrimaryKey
    @Persistent
    private String empno;
    @Persistent
    private String empname;
    @Persistent
    private String depart;
    @Persistent
    private String section;
    @Persistent
    private Date date;
    
    public empmas(String empno, String empname, String depart, String section, Date date) {
        this.empno = empno;
        this.empname = empname;
        this.depart = depart;
        this.section = section;
        this.date = date;
    }
    
    public String getEmpno() { return empno; }
    public String getEmpname() { return empname; }
    public String getDepart() { return depart; }
    public String getSection() { return section; }
    public Date getDate() { return date; }
    
    public void setEmpno(String empno) { this.empno = empno; }
    public void setEmpname(String empname) { this.empname = empname; }
    public void setDepart(String depart) { this.depart = depart; }
    public void setSection(String section) { this.section = section; }
    public void setDate(Date date) { this.date = date; }
}