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

  $(".submit").click(function(){
    var value = $(".chat")[0].value;
    console.log(value);

    var message = {};
    message.username = username;
    message.text = value;

    $.ajax({
      type: "POST",
      url: 'https://api.parse.com/1/classes/messages',
      data: message,
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










});
