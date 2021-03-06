package ulg.guestbook;
 
import java.util.Date;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import com.google.appengine.api.users.User;
 
@PersistenceCapable(identityType = IdentityType.APPLICATION)  //  【1】
public class Greeting {
    //  【1】始まり
    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Long id;
    @Persistent
    private User author;
    @Persistent
    private String content;
    @Persistent
    private Date date;    
    //  【1】終わり
    //  【2】始まり
    public Greeting(User author, String content, Date date) {
        this.author = author;
        this.content = content;
        this.date = date;
    }
    //  【2】終わり
 
    //  【3】始まり
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
    //  【3】終わり
 
    //  【4】始まり
    public void setAuthor(User author) {
        this.author = author;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    //  【4】終わり
}