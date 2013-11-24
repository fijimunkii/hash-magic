var Display = Display || {};

Display.soundBoard = new SoundBoard();

Display.POLL_INTERVAL = 250;

Display.trigger = function() {
  Display.soundBoard.transform.play();
  Display.background();
}

Display.background = function(isActive) {
  $('body').removeClass('not-active');
  $('body').addClass('active');
  setTimeout(function() {
    $('body').removeClass('active');
    $('body').addClass('not-active');
  }, 1000);
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

Display.setup = function() {

  $('#display').html('');
  $('#wand').html('');

  $('body').addClass('not-active');

  $('head').append('<link rel="stylesheet" type="text/css" href="/stylesheets/display.css">');


  Display.pollServer();

  $("body").on("touchstart click", function(){
    $("h1").html("Wave your wand to cast a spell!");
    Display.soundBoard.transform.play();
  });
}
