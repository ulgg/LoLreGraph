package ulg.urf;

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

public class UrfMatchesServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

      String beginDate = req.getParameter("beginDate");

      
      
      
      
      String apiKey = "ea3646b3-7527-4619-9c93-a788aa1c6f2a";
      String apiKey_and_URL= "&api_key=" + apiKey;
      String apiKey_question_URL= "?api_key=" + apiKey;
      String getGameIds_URL_001 = "https://na.api.pvp.net/api/lol/na/v4.1/game/ids?beginDate=";
      String getGameDetail_URL_001 = "https://na.api.pvp.net/api/lol/na/v2.2/match/";
      String getGameIds_URL= null;
      String getMatchDetail_URL= null;
      
      try{
        
        Random rnd = new Random();
        // 4/1 5:30 (1427866200)~ 4/12 0:00(1428796800), 300=5min
        int maxRange = 1428796800 - 1427866200;
        int beginEpochTimeSeconds = rnd.nextInt(maxRange) + 1427866200;
        
        int beginEpochTime5minOffset = (beginEpochTimeSeconds/300) * 300;
        
        String beginEpochTime = String.valueOf(beginEpochTime5minOffset);
        System.out.println("beginEpochTime=" + beginEpochTime);
        
        // get Game Ids from API URL
        getGameIds_URL= getGameIds_URL_001 + beginEpochTime + apiKey_and_URL;
        StringBuilder apiData = getApiDataFronUrl(getGameIds_URL);
        JSONArray gameIds = new JSONArray(apiData.toString());
        System.out.println("gameIds=" + gameIds.toString());

        String gameID = null;
        JSONObject gameDetail = null;
            
        // get random value From Length
        int gameIdsArrayLength = gameIds.length();
        int randomFromLength = rnd.nextInt(gameIdsArrayLength);
        System.out.println("randomFromLength=" + randomFromLength);
        
        // get a Game Data by Random index
        gameID = gameIds.getString(randomFromLength);
        System.out.println("gameID=" + gameID);

        getMatchDetail_URL = getGameDetail_URL_001 + gameID + apiKey_question_URL;
        System.out.println("getMatchDetail_URL=" + getMatchDetail_URL);
        
        apiData = getApiDataFronUrl(getMatchDetail_URL);
        System.out.println("apiData=" + apiData.toString());
        
        gameDetail = new JSONObject(apiData.toString());
        System.out.println("gameDetail=" + gameDetail.toString());
        
        
        //get Champion Detail
        String getAllChampDetail_URL = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=" + apiKey_and_URL;
        System.out.println("getAllChampDetail_URL=" + getAllChampDetail_URL);
        
        apiData = getApiDataFronUrl(getAllChampDetail_URL);
        System.out.println("apiData=" + apiData.toString());
        JSONObject championDetail = new JSONObject(apiData.toString());
        
        
        
        //create return Data
        JSONObject returnJson = new JSONObject();
        returnJson.put("gameDetail", gameDetail);
        returnJson.put("championDetail", championDetail);

        System.out.println("returnJson=" + returnJson.toString());

        resp.setContentType("application/json"); 
        resp.getWriter().println(returnJson);
      
      } catch (JSONException e) {
        System.out.println("JSONException = " + e);
      }
    }
    

    public StringBuilder getApiDataFronUrl(String callApiUrl) 
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
