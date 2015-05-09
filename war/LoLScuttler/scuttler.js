var sumName = null;
var version = '5.7.1';
var champSpriteURL = '//ddragon.leagueoflegends.com/cdn/' + version + '/img/sprite/';
var itemSpriteURL = '//ddragon.leagueoflegends.com/cdn/' + version + '/img/sprite/';
var imageUrl = null;

// display Data
$(document).ready(function () {

  getItemList()



});

function getItemList() {
  $('#itemDataList').empty();
  
  $.ajax({
    url: '//ddragon.leagueoflegends.com/cdn/' + version + '/data/ja_JP/item.json',
    type: 'GET',
    dataType: 'json',
    data : {
      
    },
    success: function(json){
      //alert("success");
      //alert("JSON = " + JSON.stringify(json));
      
      for(key in json.data) {
        //Id
        var itemDataListDiv = $();
        $('#itemDataList').append(
          '<div id=\"' + key + '\" class=\"item\"></div>'
         );
        //image
        $('#' + key).append(
          '<div class=\"itemImage\"></div>'
        );
        $('#' + key).find('.itemImage').css({
            height : json.data[key].image.h,
            width : json.data[key].image.w,
            background : 'url(' + itemSpriteURL + json.data[key].image.sprite + ')'
            + ' -' + json.data[key].image.x + 'px'
            + ' -' + json.data[key].image.y + 'px'
            + ' no-repeat'
        });
        //name
        $('#' + key).append(
          '<div class=\"name\">' + json.data[key].name + '</div><br /><br />'
        );
        //tooltip
        $('#' + key).append(
          '<div class=\"tooltip\"></div>'
        );
        //description
        $('#' + key).find('.tooltip').append(
          '<span class=\"description\">' + json.data[key].description + '</span><br /><br />'
        );
        //gold
        $('#' + key).find('.tooltip').append(
          '<span class=\"gold\">値段 :  ' + json.data[key].gold.total + '(' + json.data[key].gold.base + ')</span>'
        );
      }
      
      

      $(".item").hover(
          function(){
            $(this).find('.tooltip').css({
              display : 'block'
            });
          },
          function(){
            $(this).find('.tooltip').css({display : 'none'});
          }
        );
      
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#errorMsg').html('error getting Item data!' + 
          '<br />XMLHttpRequest=' + XMLHttpRequest + '</ br>' + 
          '<br />textStatus=' + textStatus + '</ br>' + 
          '<br />errorThrown=' + errorThrown);
    }
  });
}


function getChampList() {
  var id = null;
  var spallData = null;
  var passiveData = null;
  
  $('#itemDataList').empty();
  
  $.ajax({
    url: '//ddragon.leagueoflegends.com/cdn/' + version + '/data/ja_JP/championFull.json',
    type: 'GET',
    dataType: 'json',
    data : {
      
    },
    success: function(json){
      //alert("success");
      //alert("JSON = " + JSON.stringify(json));
      
      for(key in json.data) {
        id = json.data[key].key;
        //Id
        var itemDataListDiv = $();
        $('#itemDataList').append(
          '<div id=\"' + id + '\" class=\"champ\"></div>'
         );
        //image
        $('#' + id).append(
          '<div class=\"champImage\"></div>'
        );
        $('#' + id).find('.champImage').css({
            height : json.data[key].image.h,
            width : json.data[key].image.w,
            background : 'url(' + itemSpriteURL + json.data[key].image.sprite + ')'
            + ' -' + json.data[key].image.x + 'px'
            + ' -' + json.data[key].image.y + 'px'
            + ' no-repeat'
        });
        //name
        $('#' + id).append(
          '<div class=\"name\">' + json.data[key].name + '(' + key + ')' + '</div><br /><br />'
        );
        //tooltip
        $('#' + id).append(
          '<div class=\"tooltip\"></div>'
        );
        //blurb
        $('#' + id).find('.tooltip').append(
          '<span class=\"blurb\">' + json.data[key].blurb + '</span><br /><br />'
        );
        
        //tooltip
        $('#' + id).append(
          '<div class=\"detail\"></div>'
        );
        //title
        $('#' + id).find('.detail').append(
          '<span class=\"title\">' + json.data[key].title + '</span><br /><br />'
        );
        //lore
        $('#' + id).find('.detail').append(
          '<span class=\"lore\">' + json.data[key].lore + '</span><br /><br />'
        );
        //allytips
        $('#' + id).find('.detail').append(
          '<span class=\"allytips\">' + '見方の場合: ' + json.data[key].allytips + '</span><br /><br />'
        );
        //enemytips
        $('#' + id).find('.detail').append(
          '<span class=\"enemytips\">' + '敵の場合: ' + json.data[key].enemytips + '</span><br /><br />'
        );

        //passive
        $('#' + id).append(
          '<div class=\"passive\"></div>'
        );
        //passiveImage
        $('#' + id).find('.passive').append(
          '<div class=\"passiveImage\"></div>'
        );
        $('#' + id).find('.passiveImage').css({
            height : json.data[key].passive.image.h,
            width : json.data[key].passive.image.w,
            background : 'url(' + itemSpriteURL + json.data[key].passive.image.sprite + ')'
            + ' -' + json.data[key].passive.image.x + 'px'
            + ' -' + json.data[key].passive.image.y + 'px'
            + ' no-repeat'
        });
        //passiveName
        $('#' + id).find('.passive').append(
          '<span class=\"passiveName\">' + json.data[key].passive.name + '</span><br /><br />'
        );
        //passiveDesc
        $('#' + id).find('.passive').append(
          '<span class=\"passiveDesc\">' + json.data[key].passive.description + '</span><br /><br />'
        );
        
        //spells
        $('#' + id).append(
          '<div class=\"spells\"></div>'
        );
        spallData = json.data[key].spells;
        for(var index in spallData) {
          //spellImage
          $('#' + id).find('.spells').append(
            '<div id=\"' + spallData[index].id + '\" class=\"spellImage\"></div>'
          );
          $('#' + spallData[index].id).css({
              height : spallData[index].image.h,
              width : spallData[index].image.w,
              background : 'url(' + itemSpriteURL + spallData[index].image.sprite + ')'
              + ' -' + spallData[index].image.x + 'px'
              + ' -' + spallData[index].image.y + 'px'
              + ' no-repeat'
          });
          //spellName
          $('#' + id).find('.spells').append(
            '<span class=\"spellName\">' + spallData[index].name + '</span><br /><br />'
          );
          //spellDesc
          $('#' + id).find('.spells').append(
            '<span class=\"spellDesc\">' + spallData[index].description + '</span><br /><br />'
          );
          //spellTooltip
          $('#' + id).find('.spells').append(
            '<span class=\"spellTooltip\">' + spallData[index].tooltip + '</span><br /><br />'
          );
        } //for(json.data[key].spells)
          
      } //for(json.data)
      

      $('.champ').find('champImage').hover(
          function(){
            $(this).parent('.champ').find('.tooltip').css({
              display : 'block'
            });
          },
          function(){
            $(this).parent('.champ').find('.tooltip').css({display : 'none'});
          }
        );
      
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#errorMsg').html('error getting Item data!' + 
          '<br />XMLHttpRequest=' + XMLHttpRequest + '</ br>' + 
          '<br />textStatus=' + textStatus + '</ br>' + 
          '<br />errorThrown=' + errorThrown);
    }
  });
}


