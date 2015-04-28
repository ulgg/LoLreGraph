package ulg.app;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.labs.repackaged.org.json.JSONException;

import com.google.appengine.labs.repackaged.org.json.JSONObject;

public class SummonerLookUpServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
      
      String riotApiUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/";
      String userName = req.getParameter("userName");
      String apiKey = "ea3646b3-7527-4619-9c93-a788aa1c6f2a";
      String stringUrl = riotApiUrl + userName + "?api_key=" + apiKey;

      System.out.println("userName=" + userName);
      System.out.println("stringUrl=" + stringUrl);
      
      URL url = new URL(stringUrl);
      BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));

      System.out.println("reader=" + reader);
      
      StringBuilder sb = new StringBuilder();

      String line;
      while ((line = reader.readLine()) != null) {
          sb.append(line);
      }
      System.out.println("sb=" + sb);
      
      try{
        JSONObject json = new JSONObject(sb.toString());
      } catch (JSONException e) {
        System.out.println("JSONException");
      }
      
      //resp.setContentType("text/plain");
      //resp.getWriter().println("{ \"name\": \"World\" }");
      System.out.println("sb.toString()=" + sb.toString());
      resp.getWriter().println(sb.toString());
    }
}
