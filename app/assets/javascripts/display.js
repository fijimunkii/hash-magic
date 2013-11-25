var Display = Display || {};

Display.soundBoard = new SoundBoard();

Display.POLL_INTERVAL = 250;

Display.timeCode = null;

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
    url: '/display/listen/' + Display.timeCode,
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

Display.qrCode = function(id) {
  var base = 'http://qrickit.com/api/qr?d=',
      uri = 'http://magicwand.herokuapp.com/' + Display.timeCode,
      text = '&addtext=Visit+On+A+Mobile+Device',
      textcolor = '&txtcolor=442EFF',
      fgdcolor = '&fgdcolor=76103C',
      bgdcolor = '&bgdcolor=C0F912',
      qrsize = '&qrsize=150',
      fileType = '&t=p',
      errorCorrection = '&e=h';
  //http://qrickit.com/api/qr?d=http://anyurl&addtext=Hello+World&txtcolor=442EFF&fgdcolor=76103C&bgdcolor=C0F912&qrsize=150&t=p&e=m

  var imgCode = base + uri + text + textcolor + fgdcolor + bgdcolor + qrsize + fileType + errorCorrection;

  return imgCode;
}

Display.setup = function() {

  Display.timeCode = $('#time').attr('data-id');

  $('body').addClass('not-active');

  $('head').append('<link rel="stylesheet" type="text/css" href="/stylesheets/display.css">');

  $hover = $('<div>')
  .addClass('not-hovered')
  .addClass('link')
  .text('magicwand.herokuapp.com/' + Display.timeCode)
  .appendTo($('body'));

  $qrCode = $('<img>')
  .addClass('qr-code')
  .attr('src', Display.qrCode)
  .appendTo($('body'))
  .on('mouseover', function() {
    $hover.removeClass('not-hovered');
    $hover.addClass('hovered');
  })
  .on('mouseleave', function() {
    $hover.addClass('not-hovered');
    $hover.removeClass('hovered');
  });


  Display.pollServer();

  $("body").on("touchstart click", function(){
    $("h1").html("Wave your wand to cast a spell!");
    Display.soundBoard.transform.play();
  });
}
