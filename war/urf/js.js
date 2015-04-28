var sumName = null;

function getLot() {

  $("#errorMsg").html("");
  // get
  $.ajax({
      url: '../UrfMatches',
      type: 'GET',
      dataType: 'json',
      data: {
        
      },
      success: function (json) {

        //$("#errorMsg").append("\n\njsonStringify=" + JSON.stringify(json));
        
        // desplay participant Champions
        var spriteName = null;
        var champName = null;
        var spriteX = null;
        var spriteY = null;
        var teamId = null;
        var participantId = null;
        var imageUrl = null;
        var historyUrl = "http://matchhistory.na.leagueoflegends.com/en/#match-details/NA1/" + json.gameDetail.matchId;
        var championSpriteURL = "https://ddragon.leagueoflegends.com/cdn/5.7.2/img/sprite/";

        $("#vs").html("<br />vs");
        $("#historyLink").html("<a id=\"historyA\" target='_blank'>Match History</a>");
        $("#historyA").attr("href", historyUrl);
        
        json.gameDetail.participants.forEach(function (participant) {
            
            
          //$("#errorMsg").append("<br />participant.championId=" + participant.championId + "<br />");
         
          for(var i in json.championDetail.data) {

             if(participant.championId == json.championDetail.data[i].id) {
                spriteName = json.championDetail.data[i].image.sprite;
                champName = json.championDetail.data[i].name;
                spriteX = json.championDetail.data[i].image.x;
                spriteY = json.championDetail.data[i].image.y;
                teamId = participant.teamId;
                participantId = participant.participantId;
                imageUrl = championSpriteURL + spriteName;
                
                $("#teamId_" + teamId).append(
                    "<div id=\"participantId_" + participantId + "\"></div>"
                 );
                $("#participantId_" + participantId).css({
                  float : 'left',
                  height :'48px',
                  width :'48px',
                  "border-radius": "50%",
                  background : 'url(' + imageUrl + ')' + ' -' + spriteX + 'px -' + spriteY + 'px no-repeat'
                });
             }
           }
        });

        //desplay Duration Time
        var matchDuration = json.gameDetail.matchDuration;
        var durationTime = new Date(matchDuration);
        // convert epoch to human readable time
        var t = durationTime;
        var hours = parseInt(t/3600);
        hours = parseInt(t/3600);
        hours = ("0" +  hours).slice(-2);
        var minutes = parseInt(t/60);
        minutes = ("0" +  minutes).slice(-2);
        t=t-(minutes*60)
        var seconds = t
        seconds = ("0" + seconds).slice(-2);
        $("#matchDuration").html("Match Duration : " + hours + ":" + minutes + ":" + seconds);
        
        // Desplay Result Icon
        var profileIcon = "http://ddragon.leagueoflegends.com/cdn/5.7.2/img/profileicon/";
        $("#resultIcon").html("<div id=\"resultIconDisplay\"></div>");
        $("#resultIconDisplay").css({
          "height" :"128px",
          "width" :"128px",
          "border-radius": "10%",
          "margin-left": "auto",
          "margin-right": "auto"
        });
        
        if(matchDuration < 600) {
          // ~ 10min
          // profileIcon 786.png
          $("#resultIconDesplay").css({
            "background" : "url(" + profileIcon + "786.png" + ")"
          });
          $("#resultMsg").html("Luck Rank * * * * * ! !");
          
        } else if(matchDuration < 600 * 2) {
          // ~ 20min
          // profileIcon 785.png
          $("#resultIconDisplay").css({
            "background" : "url(" + profileIcon + "785.png" + ")"
          });
          $("#resultMsg").html("Luck Rank * * * *");
          
        } else if(matchDuration < 600 * 3) {
          // ~ 30min
          // profileIcon 784.png
          $("#resultIconDisplay").css({
            "background" : "url(" + profileIcon + "784.png" + ")"
          });
          $("#resultMsg").html("Luck Rank * * *");
          
        } else if(matchDuration < 600 * 4) {
          // ~ 40min
          // profileIcon 782.png
          $("#resultIconDisplay").css({
            "background" : "url(" + profileIcon + "782.png" + ")"
          });
          $("#resultMsg").html("Luck Rank * *");
          
        } else {
          // 40min ~
          // profileIcon 783.png
          $("#resultIconDisplay").css({
            "background" : "url(" + profileIcon + "783.png" + ")"
          });
          $("#resultMsg").html("Luck Rank *");
          
        }
        
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        $("#errorMsg").html("error getting Summoner data1!" + 
            "<br />textStatus=" + textStatus + "\n" + 
            "<br />errorThrown=" + errorThrown);
    }
  });
}

function urfStats() {
  sumName  = $("#sumName").val();
    
  if (sumName !== "") {

    $.ajax({
      url: '../urfstats',
      type: 'GET',
      dataType: 'json',
      data: {
        sumName : sumName
      },
      success: function (json) {
          var userID = sumName.replace(" ", "");
          userID = userID.toLowerCase().trim();
          
          var itemNameStats = "aggregatedStats";
          
          totalNeutralMinionsKilled = json[itemNameStats].totalNeutralMinionsKilled;
          totalMinionKills = json[itemNameStats].totalMinionKills;
          totalChampionKills = json[itemNameStats].totalChampionKills;
          totalAssists = json[itemNameStats].totalAssists;
          totalTurretsKilled = json[itemNameStats].totalTurretsKilled;
          modifyDate = json.modifyDate;
          wins = json.wins;
          
          //Convert an epoch to human readable date
          var myDate = new Date(modifyDate);
          var myHumanDate = myDate.toLocaleString()
          
          document.getElementById("totalNeutralMinionsKilled").innerHTML = totalNeutralMinionsKilled;
          document.getElementById("totalMinionKills").innerHTML = totalMinionKills;
          document.getElementById("totalChampionKills").innerHTML = totalChampionKills;
          document.getElementById("totalAssists").innerHTML = totalAssists;
          document.getElementById("totalTurretsKilled").innerHTML = totalTurretsKilled;
          document.getElementById("modifyDate").innerHTML = myHumanDate;
          document.getElementById("wins").innerHTML = wins;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("error getting Summoner data1!");
      }
    });
  } else {}
}
