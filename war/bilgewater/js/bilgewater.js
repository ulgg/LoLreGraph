var sumName = null;
var version = '5.7.1';
var champSpriteURL = '//ddragon.leagueoflegends.com/cdn/' + version + '/img/sprite/';
var itemSpriteURL = '//ddragon.leagueoflegends.com/cdn/' + version + '/img/sprite/';
var imageUrl = null;

var initStatsLabelNames = [
                "Damage Dealt to Champioms",
                "Physical Damage to Champions",
                "Magic Damage to Champions",
                "Damage Dealt",
                "Physical Damage Dealt",
                "Magic Damage Dealt",
                "Largest Critical Strike"
            ];

var initStatsKeyNames = [
                     "totalDamageDealtToChampions",
                     "physicalDamageDealtToChampions",
                     "magicDamageDealtToChampions",
                     "totalDamageDealt",
                     "physicalDamageDealt",
                     "magicDamageDealt",
                     "largestCriticalStrike"
                 ];

var statsLabelNames = [
                "Champion Kills",
                "Deaths",
                "Assists",
                "Largest Killing Spree",
                "Largest Multi Kill",
                "Damage Dealt to Champioms",
                "Physical Damage to Champions",
                "Magic Damage to Champions",
                "Damage Dealt",
                "Physical Damage Dealt",
                "Magic Damage Dealt",
                "Largest Critical Strike",
                "Healing Done",
                "Damage Taken",
                "Physical Damage Taken",
                "Magic Damage Taken",
                "Gold Earned",
                "Turrets Destroyed",
                "Inhibitors Destroyed",
                "Minions Slain",
                "Neutral Monster Killed",
                "Time Spent Dead(Disabled)",
                "Champion Level"
            ];

var statsKeyNames = [
                     "kills",
                     "deaths",
                     "assists",
                     "largestKillingSpree",
                     "largestMultiKill",
                     "totalDamageDealtToChampions",
                     "physicalDamageDealtToChampions",
                     "magicDamageDealtToChampions",
                     "totalDamageDealt",
                     "physicalDamageDealt",
                     "magicDamageDealt",
                     "largestCriticalStrike",
                     "totalHeal",
                     "totalDamageTaken",
                     "physicalDamageTaken",
                     "magicDamageTaken",
                     "goldEarned",
                     "towerKills",
                     "inhibitorKills",
                     "minionsKilled",
                     "neutralMinionsKilled",
                     "TimeSpentDead", //Time Spent Dead
                     "champLevel"
                 ];


var matchId = 1907069332;
var msgObj = null;
var matchDetailJson = null;
var champDetailJson = null;
var fullData = null;
var chart = null;
var chartData = null;
var participants = null;
var teamIds = null;
var participantIds = null;
var championIds = null;


//ready
$(function() {

  msgObj = $("#msg");
  
  //clear msg
  $("#msg").text("");

  //load API challenge Black Market DataSets
  $.when(
    $.getJSON("dataset/NA.json" , function(data) {

      //create <select>s in <option>
      var selectObj = $("#matchIdSelect");
      var len = 100; //since 10,000 ids are too much
      for(var i = 0; i < len; i++) {
        selectObj.append($("<option>")
            .attr({
              "value":data[i]
            })
            .text(data[i]));
      }
      
      console.log('sucess');
  }, function () {
    console.log('error');
  })).then(function() {
    console.log('get JSON ready!');
  });

  //create <input type="checkbox">s
  var filterUlObj = $("#filter_ul");
  var $filter_checkbox = null;
  var $filter_ul = null;
  var $filter_label = null;
  var li = null;
  var label = null;
  var checkbox = null;
  var checkboxName = null;
  var checkboxLabelText = null;
  for(var i in statsLabelNames) {
    checkboxName = statsKeyNames[i];
    checkboxLabelText = statsLabelNames[i];
    li = $("<li />")
        .attr({
          "id": "li_" + checkboxName,
          "name": "li_data"
        });
    label = $("<label />")
        .attr({
          "for": checkboxName
        });
    checkbox = $("<input />")
        .attr({
          "type": "checkbox",
          "id": checkboxName
        });
    
    //TimeSpentDead was out from API
    if(checkboxName === 'TimeSpentDead'){
      checkbox.prop('disabled', true);
    }
    
    li.append(checkbox);
    label.append(checkboxLabelText);
    li.append(label);
    filterUlObj.append(li);
  }
  //reset Chechbox
  resetCheckboxes();
  
  
  //matchIdSelect changed event
  $("#matchIdSelect").change(function(){
   //remove msg
   $("#msg").text("");
   matchId =  $("#matchIdSelect").val();
   drawChart();
  });
  
  //matchIdButton click event
  $("#matchIdButton").click(function(){
   matchId =  $("#matchIdText").val();
   //reset Checkbox
   resetCheckboxes();
   //update chart
   drawChart();
  });
  
  //filter_checkboxes change event
  $("#filter_checkboxes [type='checkbox']").change(function(){
    console.log('filter_checkboxes=' + $(this).attr("id"));
    
    $("input[type='checkbox']:checked")
    
   //matchId =  $("#matchIdText").val();
    //update chart
   reDrawChart();
    
  });
});

//reset Checkboxes
var checkboxes = null;
var checkbox = null;
var initStatsKeyName = null;
function resetCheckboxes(){
  console.log('resetCheckboxes()');

  checkboxes = null;
  checkbox = null;
  initStatsKeyName = null;

  //clear all checkboxes
  $("#filter_checkboxes input[type='checkbox']").prop("checked", false);
  
  
  $("#filter_checkboxes input[type='checkbox']").each(function(i, v) {
    console.log('resetCheckboxes() each=');
    console.log('resetCheckboxes() i=' + i);
    console.log('resetCheckboxes() v=' + v);

    checkbox = $(v);
    checkboxName = checkbox.attr("id");
    console.log('checkboxName=' + checkboxName);
    
    initStatsKeyNames.forEach(function(e, j, a){
      initStatsKeyName = e;
      console.log('loop initStatsKeyName=' + initStatsKeyName);
      
      if(checkboxName === initStatsKeyName){
        checkbox.prop("checked", true);
        console.log('checked, true');
      }
    });
  });
}

//get Champions Data by ID
function getChampNameById(ChampId) {
  console.log("getChampionDataById() start ");
  console.log("ChampId=" + ChampId);
  var tempChampId = null;
  var returnChampName = null;
  for(key in champDetailJson.data){
    tempChampId = champDetailJson.data[key].id;
    console.log("tempChampId=" + tempChampId);
    if(tempChampId === ChampId){
      returnChampName = champDetailJson.data[key].name;
      console.log("returnChampName=" + returnChampName);
      break;
    }
  }
  return returnChampName.toString();
}

//set setChampImages
function setChampImages() {
  
  console.log("setChampImages() start ");
  console.log("participants=" + participants);

  var participant = null;
  var participantId = null;
  var teamId = null;
  var championId = null;
  var champ = null;
  var tempChampId = null;
  var returnChampName = null;
  var championImageURL = "http://ddragon.leagueoflegends.com/cdn/5.16.1/img/champion/"
  var targetEle = null;
  var imageName= null;
  var spriteX = null;
  var spriteY = null;
  var imageUrl = null;
  
  //clear
  $("#champImagesArea li").css({'background-image':'none'});
  
  for(var index in participants){
    participant = participants[index];
    participantId = participant.participantId;
    teamId = participant.teamId;
    championId = participant.championId;
    console.log("participantId=" + participantId);
    console.log("championId=" + championId);
    
    var tempChampId = null;
    var returnChampName = null;
    
    for(key in champDetailJson.data){
      champ = champDetailJson.data[key];
      tempChampId = champ.id;
      console.log("tempChampId=" + tempChampId);
      if(tempChampId === championId){
        imageName = champ.image.full;
        spriteX =champ.image.x;
        spriteY = champ.image.y;
        imageUrl = championImageURL + imageName;
        targetEle = $("#champImage_" + participantId);
        targetEle.css({
          'background-image' : 'url(' + imageUrl + ')'
        });
        
        console.log("imageUrl=" + imageUrl);
        break;
      }
    }
  }
}

function getChartData() {
  
  //return DataTable
  var returnData = null;
  
  //set Column
  fullData = new google.visualization.DataTable();
  fullData.addColumn('string', '');
  for(var i in initStatsLabelNames){
    fullData.addColumn('number', initStatsLabelNames[i].toString());
  }
  

  //get Champions
  var champName = null;
  
  //console.log('statsLabelNames=' + statsLabelNames);
  //get data from a global data as "matchDetailJson"
  //queueType = matchDetailJson.queueType;
  //console.log('<br />queueType=' + queueType);
  //$('#queueType').text(queueType);
  
  participants = matchDetailJson.participants;
  
  //set Rows
  teamIds = new Array();
  participantIds = new Array();
  championIds = new Array();
  var rowsArray = new Array(participants.length);
  var rowArray = new Array(initStatsKeyNames.length);
  var participant = null;
  var statsKeyName = null;
  var tempNo = null;
  for(var index in participants){
    rowArray = new Array(initStatsKeyNames.length);
    
    participant = participants[index];
    //teamId
    teamIds.push(participant.teamId);
    //console.log('<br />teamIds[' + index + ']=' + teamIds[index]);
    //console.log('<br />teamIds=' + teamIds);
    //participantId
    participantIds.push(participant.participantId);
    //console.log('<br />participantIds[' + index + ']=' + participantIds[index]);
    //ChampionID
    rowArray[0] = getChampNameById(participant.championId);
    
    //console.log('<br />championIds-rowArray[' + 0 + ']=' + rowArray[0]);
    
    //stats
    for(var k in initStatsKeyNames){
      //console.log('<br />[k+1]=' + (k+1));
      //console.log('<br />val.stats[' + v + ']=' + val.stats[v]);
      statsKeyName = initStatsKeyNames[k];
      //console.log('<br />statsKeyName=' + statsKeyName);
      tempNo = parseInt(k) + 1;
      rowArray[tempNo] = participant.stats[statsKeyName];
      //console.log('<br />  statsLabelNames=' + statsLabelNames[k] +
      //    '<br />  rowArray[' + tempNo + ']=' + rowArray[tempNo]);
    }
    //console.log('<br />rowArray=' + rowArray);
    //console.log('<br />index=' + index);
    rowsArray[index] = rowArray;
  }

  //console.log('<br />rowsArray=' + rowsArray);
  
  fullData.addRows(rowsArray);
  returnData = fullData;
  
  return returnData;
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  var df = $.Deferred();

  console.log('<br />001 matchId=' + matchId);

  //reset Chechbox
  resetCheckboxes();
  
  //get Data from server
  if (matchId !== "") {

    $(function() {
      $.ajax({
        url: '../../GetMatchDetailServlet',
        type: 'GET',
        dataType: 'json',
        data: {
          matchId : matchId
        },
      }).done(function (json) {
        console.log("success");
        
        //set matchDetailJson to global var
        matchDetailJson = json.matchDetailJson;
        console.log('<br />003 matchDetailJson=' + matchDetailJson);
        champDetailJson = json.champDetailJson;
        console.log('<br />004 champDetailJson=' + champDetailJson);
        
        df.resolve();
      }).fail(function(){
        console.log("error");
        
      });  //ajax
    }); //function
  } else {}
  
  
  df.done(function(){
    //parse json data
    chartData = getChartData();
    
    var options = {
      //chart: {
      //  title: 'title',
      //  subtitle: 'sub'
      //},
      width: 500,
      height: 400,
      legend: {position: 'none'},
      hAxis : {
          textPosition: 'none',
          format : 'decimal'
      },
      chartArea:{left:20,top:0,width:'50%',height:'75%'},
      bars: 'horizontal',
    };
  
    //set to global
    chart = new google.charts.Bar(document.getElementById('barchart_material'));
    
    //format
    //var formatter1 = new google.visualization.NumberFormat({pattern: '#,###'});
    //formatter1.format(chartData, 1);
    
    chart.draw(chartData, google.charts.Bar.convertOptions(options));
    
    setChampImages();
  }); //df.done
}


//when check boxes changed
function reDrawChart() {


  //clear old Columns, except first (var title
  chartData.removeColumns(1, chartData.getNumberOfColumns()-1);
  console.log('001 chartData.getNumberOfColumns() after deleted=' + chartData.getNumberOfColumns());
  //clear old Rows
  chartData.removeRows(0, chartData.getNumberOfRows());
  
  //edit Data
  //get checked checkboxes
  //var newValue = 100000;
  var newKeyNames = [];
  $("#filter_checkboxes  input[type='checkbox']:checked").each(function() {
    newKeyNames.push($(this).attr("id"));
  });
  //filter checked 0
  if(newKeyNames.length == 0){
    newKeyNames.push("zero");
  }
  console.log('newKeyNames.length=' + newKeyNames.length);
  console.log('newKeyNames=' + newKeyNames);
  
  //chartData.setValue(0, 1, newValue);

  var statsKeyName = null;
  var newKeyName = null;
  var newLabelName = null;
  var tempNo = null;
  

  for(var i in newKeyNames){
    newKeyName = newKeyNames[i];
    
    if(newKeyNames[0] === "zero") {
      //newKeyNames.length = 0
      console.log('001 newKeyName === zero');
      chartData.addColumn('number', 'Zero');
      break;
    }
    
    for(var j in statsKeyNames){
      statsKeyName = statsKeyNames[j];
      statsLabelName = statsLabelNames[j];
      tempNo = parseInt(j) + 1;
      
      //if all checkboxes are unchecked
      if(statsKeyName === newKeyName){
        chartData.addColumn('number', statsLabelName.toString());
      }
    }
  }
  console.log('002 chartData.getNumberOfColumns()=' + chartData.getNumberOfColumns());
  
  //set Rows
  var rowsArray = new Array(participants.length);
  var rowArray = null;
  var participant = null;
  var rowsSize = newKeyNames.length + 1;
  console.log('rowsSize=' + rowsSize);
  
  
  for(var index in participants){
    
    rowArray = new Array(rowsSize);

    participant = participants[index];
    console.log('index=' + index);
    
    //ChampionID
    rowArray[0] = getChampNameById(participant.championId);
    
    //stats
    for(var k in statsKeyNames){
      console.log('k=' + k);
      statsKeyName = statsKeyNames[k];
      for(var l in newKeyNames){
        console.log('l=' + l);
        newKeyName = newKeyNames[l];
        console.log('statsKeyName=' + statsKeyName);
        console.log('newKeyName=' + newKeyName);
        
        tempNo = parseInt(l) + 1;
        console.log('tempNo=' + tempNo);
        
        if(statsKeyName === newKeyName){
          console.log('statsKeyName === newKeyName=true');
          console.log('participant.stats[' + statsKeyName + ']=' + participant.stats[statsKeyName]);
          rowArray[tempNo] = participant.stats[statsKeyName];
        } else if (newKeyName === "zero") {
          //newKeyNames.length = 0
          rowArray[tempNo] = parseInt(0);
          console.log('002 newKeyName === zero');
          break;
        }
      }
    }
    console.log('rowArray=' + rowArray);
    rowsArray[index] = rowArray;
  }

  console.log('rowsArray=' + rowsArray);
  
  
  var options = {
    width: 500,
    height: 400,
    legend: {position: 'none'},
    hAxis : {
      format : 'decimal',
        textPosition : 'none'
    },
    bars: 'horizontal' // Required for Material Bar Charts.
  };
  
  chartData.addRows(rowsArray);

  //for animation
  google.visualization.events.addListener(chart, 'ready',
      function() {
        //button.disabled = false;
      });
  
  //char is global var
  chart.draw(chartData, google.charts.Bar.convertOptions(options));
}
