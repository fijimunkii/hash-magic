var Trigger = Trigger || {};

Trigger.soundBoard = new SoundBoard();

Trigger.timeCode = null;

Trigger.trigger = function(event) {
  Trigger.sendRequest()
  Trigger.soundBoard.spell.play();

  $("body").css('background', 'red');
  setTimeout(function(){
    $("body").css('background', 'white');
  }, 500);
};


Trigger.sendRequest = function(data) {
  return $.ajax({
    url: '/wand/trigger/' + Trigger.timeCode,
    type: 'post',
    data: data || {}
  });
}


Trigger.canTrigger = true;

Trigger.graceMagnitude = 11;

Trigger.captureMotion = function(magnitude) {
  var magnitude = Math.abs(magnitude);

  if (magnitude > Trigger.graceMagnitude && Trigger.canTrigger) {
    Trigger.trigger(magnitude);

    Trigger.canTrigger = false;
    setTimeout(function() {
      Trigger.canTrigger = true;
    }, 500);
  }

}

Trigger.deviceMotionHandler = function(eventData) {
  // Grab the acceleration from the results
  var acceleration = eventData.acceleration;

  var event = Math.sqrt(
    Math.pow(acceleration.x, 2) +
    Math.pow(acceleration.y, 2) +
    Math.pow(acceleration.z, 2)
  )

  Trigger.captureMotion(event);

}

Trigger.setup = function() {

  $('head').append('<link rel="stylesheet" type="text/css" href="/stylesheets/trigger.css">');

  Trigger.timeCode = $('#time').attr('data-id');

  $h1 = $('<h1>');
  $h1.text('Tap Here!');
  $('body').append($h1);

  $h2 = $('<h2>');
  $h2.html('Make sure to open hashmagic.herokuapp.com/ on a computer')
  $('body').append($h2);

  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', Trigger.deviceMotionHandler, false);
  } else {
    alert("Your device cannot cast spells. Try an iOS or Android wand...")
    return;
  }

  $("body").on("touchstart click", function(){
    $("h1").html("Now wave your wand like you're Harry Potter!");
    Trigger.soundBoard.spell.play();
  });

}
