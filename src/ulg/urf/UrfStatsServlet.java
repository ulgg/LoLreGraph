package ulg.urf;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;

public class UrfStatsServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

      String sumName = req.getParameter("sumName");

      String apiKey = "ea3646b3-7527-4619-9c93-a788aa1c6f2a";
      String apiUrlGetSumID_001 = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/";
      String apiUrlGetSumID_002 = "?api_key=" + apiKey;
      String apiUrlGetUrfStats_001 = "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/";
      String apiUrlGetUrfStats_002 = "/summary?season=SEASON2015&api_key=" + apiKey;
      String stringUrlGetSumID = apiUrlGetSumID_001 + sumName + apiUrlGetSumID_002;
      String sumID= null;
      String stringUrlGetUrfStats = null;
      JSONObject json = null;

      try{
        // get Summoner ID
        URL url = new URL(stringUrlGetSumID);
        BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
        StringBuilder sb = new StringBuilder();
        String line = null;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        json = new JSONObject(sb.toString());
        sumID = json.getJSONObject(sumName).getString("id");
        

        // get Urf Stats
        stringUrlGetUrfStats = apiUrlGetUrfStats_001 + sumID + apiUrlGetUrfStats_002;
        
        url = new URL(stringUrlGetUrfStats);
        reader = new BufferedReader(new InputStreamReader(url.openStream()));
        sb = new StringBuilder();
        line = null;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        json = new JSONObject(sb.toString());
        System.out.println("sb.toString()=" + sb.toString());
        JSONArray jsonArray = json.getJSONArray("playerStatSummaries");

        String type = null;
        JSONObject jsonObject = null;
        JSONObject retJsonObject = null;
        for (int i = 0; i < jsonArray.length(); i++) {
          System.out.println("i=" + i);
          jsonObject = jsonArray.getJSONObject(i);
          type = jsonObject.getString("playerStatSummaryType");
          System.out.println("type=" + type);
          
          if(type.equals("URF")) {
            retJsonObject = jsonObject;
            System.out.println("jsonObject=" + jsonObject.toString());
            break;
          }
        }
        
        resp.getWriter().println(retJsonObject);
      
      } catch (JSONException e) {
        System.out.println("JSONException = " + e);
      }
    }
}
