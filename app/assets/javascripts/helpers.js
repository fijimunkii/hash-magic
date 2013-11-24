// StringUtils

var Interpolate = function(string) {
  var args = arguments
  return string.replace(/{(\d+)}/g, function(match, matchNumber) {
    return args[parseInt(matchNumber)+1]
  })
}

var CRSF_TOKEN;

$(function() {
  // <meta content="N+ysrmUbWzXZs1v2ST8zqc529XTBihYpofvu90Ai1tM=" name="csrf-token" />
  CRSF_TOKEN = $('meta[name=csrf-token]').attr('content');
});

// Usage
// Interpolate("Hello {0}", "Jonathan")
