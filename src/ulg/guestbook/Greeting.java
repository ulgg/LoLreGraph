package ulg.guestbook;
 
import java.util.Date;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import com.google.appengine.api.users.User;
 
@PersistenceCapable(identityType = IdentityType.APPLICATION)  //  �y1�z
public class Greeting {
    //  �y1�z�n�܂�
    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Long id;
    @Persistent
    private User author;
    @Persistent
    private String content;
    @Persistent
    private Date date;    
    //  �y1�z�I���
    //  �y2�z�n�܂�
    public Greeting(User author, String content, Date date) {
        this.author = author;
        this.content = content;
        this.date = date;
    }
    //  �y2�z�I���
 
    //  �y3�z�n�܂�
    public Long getId() {
        return id;
    }
    public User getAuthor() {
        return author;
    }
    public String getContent() {
        return content;
    }
    public Date getDate() {
        return date;
    }
    //  �y3�z�I���
 
    //  �y4�z�n�܂�
    public void setAuthor(User author) {
        this.author = author;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    //  �y4�z�I���
}