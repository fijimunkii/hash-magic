var Trigger = Trigger || {};

Trigger.soundBoard = new SoundBoard();


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
    url: '/wand/trigger',
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

  $h1 = $('<h1>');
  $h1.text('Tap Here On Your Mobile Device');
  $('body').append($h1);

  $h2 = $('<h2>');
  $h2.text('Then Open hashmagic.herokuapp.com/ on a computer')
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
