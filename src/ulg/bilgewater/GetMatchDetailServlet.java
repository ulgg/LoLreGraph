package ulg.bilgewater;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Random;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;

public class GetMatchDetailServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

      String matchId = req.getParameter("matchId");
      
      String apiKey = "ea3646b3-7527-4619-9c93-a788aa1c6f2a";
      String urlToGetMatch= "https://na.api.pvp.net/api/lol/na/v2.2/match/"
      //    + matchId + "?api_key=" + apiKey;
          + matchId + "?includeTimeline=true&api_key=" + apiKey;
      String urlToGetRealm= "https://global.api.pvp.net/api/lol/static-data/na/v1.2/realm?api_key="
          + apiKey;
      String urlToGetChamp= "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key="
          + apiKey;
      
      try{
        
        // get matchDetail from API URL
        StringBuilder matchDetailSB = getApiDataFromUrl(urlToGetMatch);
        StringBuilder ChampDetailSB = getApiDataFromUrl(urlToGetChamp);
        //JSONArray matchDetailJSONArray = new JSONArray(matchDetailSB.toString());

        //matchDetailJson
        JSONObject matchDetailJson = null;
        //Champ Json
        JSONObject champDetailJson = null;
        matchDetailJson = new JSONObject(matchDetailSB.toString());
        champDetailJson = new JSONObject(ChampDetailSB.toString());
        System.out.println("matchDetailJSONObj=" + matchDetailJson.toString());
        System.out.println("champDetailJson=" + champDetailJson.toString());
        
        //create returnJson 
        JSONObject returnJson = new JSONObject();
        returnJson.put("matchDetailJson", matchDetailJson);
        returnJson.put("champDetailJson", champDetailJson);

        System.out.println("returnJson=" + returnJson.toString());

        resp.setContentType("application/json"); 
        resp.getWriter().println(returnJson);
      
      } catch (JSONException e) {
        System.out.println("JSONException = " + e);
      }
    }
    

    //Function getApiDataFronUrl()
    public StringBuilder getApiDataFromUrl(String callApiUrl) 
        throws IOException {
      URL url = new URL(callApiUrl);
      BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
      StringBuilder sb = new StringBuilder();
      String line = null;
      while ((line = reader.readLine()) != null) {
          sb.append(line);
      }
      return sb;
    }
}
