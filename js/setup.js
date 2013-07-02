if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = newSearch;
}

// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});


$(document).ready(function() {
  var username = window.location.search.slice(10);
  var roomURL = 'messages';

  $(".submit").click(function(){
    var value = $(".chat")[0].value;

    var message = {
      "username": username,
      "text": value
    };

    $.ajax({
      type: "POST",
      url: "https://api.parse.com/1/classes/" + roomURL,
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(){
        console.log("successful POST");
      },
      error: function() {
        console.log('POST failed');
      }
    });

   $(".chat")[0].value = "";
   });

  $('.chat').keypress(function(e){
    if(e.which === 13){
      $('.submit').click();
    }
  });

  var friends = {};

  $('body').delegate('.username', 'click', function() {
    if (!friends[$(this).text()]) {
      $(".friendsList").append("<li class='friendLi'>" + $(this).text() + "</li>");
      friends[$(this).text()] = true;
    }
  });

  $('body').delegate('.friendLi', 'click', function() {
    $(this).remove();
    delete friends[$(this).text()];
  });

  $(".goToRoom").click(function(){
    var value = $(".makeRoom")[0].value;
    roomURL = value;
    $(".makeRoom")[0].value = "";
  });

  $('.makeRoom').keypress(function(e){
    if(e.which === 13){
      $('.goToRoom').click();
    }
  });


  $('body').delegate('.linkRoom', 'click', function() {
    roomURL = $(this).text();
  });

  (function getMessages(){

    $.ajax({
      type: "GET",
      url: "https://api.parse.com/1/classes/" + roomURL + "?order=-createdAt",
      contentType: 'application/json',
      success: function(data){
        $('.chatList li').remove();
        $("#welcome").text("Welcome to the " + roomURL + " room!");
        for (var i = 0; i < 26; i++){
          if (data.results[i]){
            if (friends[data.results[i].username]) {
              $('.chatList').prepend($("<li><span class='username'>" + $("<div></div>").text(data.results[i].username).html().slice(0, 30) + "</span>: <b>" +
                                    $("<div></div>").text(data.results[i].text).html().slice(0, 70) + "</b></li>"));
            } else {
              $('.chatList').prepend($("<li><span class='username'>" + $("<div></div>").text(data.results[i].username).html().slice(0, 30) + "</span>: " +
                                    $("<div></div>").text(data.results[i].text).html().slice(0, 70) + "</li>"));
            }
          }
        }
      },
      error: function(data) {
        console.log('GET failed');
      }
    });
    setTimeout(getMessages, 500);
  })();




});
