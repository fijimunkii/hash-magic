var Display = Display || {};

Display.soundBoard = new SoundBoard();

Display.POLL_INTERVAL = 250;

Display.trigger = function() {
  Display.soundBoard.transform.play();
}

Display.getRequest = function(data) {
  $.ajax({
    url: '/display/listen',
    type: 'GET',
    success: Display.receiveRequest,
    data: data
  })
}

Display.receiveRequest = function(data) {
  console.log(data)
  if(data['trigger']) {
    Display.trigger();
  }
}

Display.pollServer = function() {
  setInterval(function() {
    var params = {
      id: CRSF_TOKEN
    }
    Display.getRequest(params);
  }, Display.POLL_INTERVAL);
}

$(function() {

  Display.pollServer();
  // Gifs: http://imgur.com/LMNXrdf,juREGaM
  $("body").on("touchstart click", function(){
    $("h1").html("Wave your wand to cast a spell!");
    Display.soundBoard.transform.play();
  });

});
