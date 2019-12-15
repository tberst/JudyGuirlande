var popmotion = require('popmotion')
var keyframes = popmotion.keyframes
var charset = require('./charset')
var gpioService = require('./gpio-service')

var _g_current_anim = null;
var _g_current_letter = null;

var animate = function (message) {
  var values = []
  console.log("animate ->" + message);
  for (var i = 0; i <= message.data.length; i++) {
    values.push(i)
  }
  if (_g_current_anim != null) {
    _g_current_anim.stop();
    _g_current_letter = null;
  }
  _g_current_anim = keyframes({
    values: values,
    duration: message.duration * 1000,
    easings: function (d1) {
      return 0
    },
    loop : Infinity
  }).start(v => {
    var pinArray = [];
    if (_g_current_letter != message.data[v]) {
      _g_current_letter = message.data[v];
      switch (message.type) {
        case 'animation':
          pinArray = charset.getPins(message.data[v]);
          break
        case 'text':
          pinArray = charset.getPinArray(message.data[v])
          break
      }
      gpioService.display(pinArray);
    }
  })
}

exports.animate = animate
