'use strict'
var mock = require('mock-require');

var config = require('./config');

if (config.type != "raspi") {
  mock('onoff', {
    Gpio: function (pinNumber) {
      var self = this;
      this.pin = pinNumber;
      this.state = 0;
      return {
        writeSync: function (data) {
          self.state = data;
          // console.log("write pin " +self.pin +" " + data);
        },
        readSync: function () {
          // console.log("read pin " +self.pin +" " + self.state);
          return self.state;
        }

      };
    }
  });

}
var Gpio = require('onoff').Gpio // include onoff to interact with the GPIO
var charset = require('./charset')
var pinConfig = charset.GPIO_to_SEGMENT
var leds = {}
for (var prop in pinConfig) {
  if (Object.prototype.hasOwnProperty.call(pinConfig, prop)) {
    leds[pinConfig[prop]] = new Gpio(pinConfig[prop], 'out')
  }
}

var display = function (pinArray) {
  // first turn off the non-up pins
  for (var prop in leds) {
    if (Object.prototype.hasOwnProperty.call(leds, prop)) {
      if (!pinArray.includes(parseInt(prop))) {
        setState(prop, false)
      }
    }
  }

  // then turn on the up pins
  pinArray.forEach(element => {
    if (element)
    {
      setState(element, true)
    }
  })
}

function setState(gpioNumber, bState) {

  var led = leds[gpioNumber]
  var current = led.readSync()
  if (bState) {
    if (current === 0) {
      led.writeSync(1)
    }
  } else {
    if (current != 0) {
      led.writeSync(0)
    }
  }
}

exports.display = display
