var Display = Display || {};

Display.soundBoard = new SoundBoard();

Display.POLL_INTERVAL = 250;

Display.trigger = function() {
  Display.soundBoard.boing.play();
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

});
