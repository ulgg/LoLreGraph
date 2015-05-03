var sumName = null;
var version = '5.7.1';
var championSpriteURL = '//ddragon.leagueoflegends.com/cdn/' + version + '/img/sprite/';
var itemSpriteURL = '//ddragon.leagueoflegends.com/cdn/' + version + '/img/sprite/';
var imageUrl = null;

// display Data
$(document).ready(function () {

  
  
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
});






