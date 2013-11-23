function SoundBoard() {
  var sounds = ["boing", "camera", "mama", "spell", "yipee"];
  var soundBoard = this;

  $.each(sounds, function(i, fileName) {
    soundBoard[fileName] = new Audio(Interpolate('/sounds/{0}.wav',fileName));
  });
}
