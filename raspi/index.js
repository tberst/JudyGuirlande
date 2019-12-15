'use strict'

const fs = require('fs');
const config = require('./config').config;

const path = require('path');
const animationService = require("./animation-service");

const Client = require('azure-iot-device').Client
const ConnectionString = require('azure-iot-device').ConnectionString
const Message = require('azure-iot-device').Message
const MqttProtocol = require('azure-iot-device-mqtt').Mqtt
const AmqpProtocol = require('azure-iot-device-amqp').Amqp

const bi = require('az-iot-bi')


var client;

function receiveMessageCallback(request, response) {
  // Function to send a direct method reponse to your IoT hub.
  function directMethodResponse(err) {
    if (err) {
      console.error(
        'An error ocurred when sending a method response:\n' + err.toString()
      )
    } else {
      console.log(
        "Response to method '" + request.methodName + "' sent successfully."
      )
    }
  }
  console.log('Direct method payload received:')
  console.log(request.payload)
  animationService.animate(request.payload);
  response.send(
    200,
    'received payload of type: ' + request.payload.type,
    directMethodResponse
  )
}

function initClient(connectionStringParam, credentialPath) {
  var connectionString = ConnectionString.parse(connectionStringParam)
  var deviceId = connectionString.DeviceId

  // select transport
  if (config.transport === 'amqp') {
    console.log('[Device] Using AMQP transport protocol')
    // fromConnectionString must specify a transport constructor, coming from any transport package.
    client = Client.fromConnectionString(connectionStringParam, AmqpProtocol)
  } else {
    console.log('[Device] Using MQTT transport protocol')
    client = Client.fromConnectionString(connectionStringParam, MqttProtocol)
  }

  // Configure the client to use X509 authentication if required by the connection string.
  if (connectionString.x509) {
    // Read X.509 certificate and private key.
    // These files should be in the current folder and use the following naming convention:
    // [device name]-cert.pem and [device name]-key.pem, example: myraspberrypi-cert.pem
    var connectionOptions = {
      cert: fs
        .readFileSync(path.join(credentialPath, deviceId + '-cert.pem'))
        .toString(),
      key: fs
        .readFileSync(path.join(credentialPath, deviceId + '-key.pem'))
        .toString()
    }

    client.setOptions(connectionOptions)

    console.log('[Device] Using X.509 client certificate authentication')
  }

  if (connectionString.GatewayHostName && configonfig.iotEdgeRootCertFilePath) {
    var deviceClientOptions = {
      sa: fs.readFileSync(configonfig.iotEdgeRootCertFilePath, 'utf-8')
    }

    client.setOptions(deviceClientOptions, function (err) {
      if (err) {
        console.error(
          '[Device] error specifying IoT Edge root certificate: ' + err
        )
      }
    })

    console.log('[Device] Using IoT Edge private root certificate')
  }

  return client
}


// MAIN
(function () {
 

  try {
    var firstTimeSetting = false
    if (
      !fs.existsSync(
        path.join(process.env.HOME, '.iot-hub-getting-started/biSettings.json')
      )
    ) {
      firstTimeSetting = true
    }

    bi.start()

    var deviceInfo = { device: 'RaspberryPi', language: 'NodeJS' }

    if (bi.isBIEnabled()) {
      bi.trackEventWithoutInternalProperties('yes', deviceInfo)
      bi.trackEvent('success', deviceInfo)
    } else {
      bi.disableRecordingClientIP()
      bi.trackEventWithoutInternalProperties('no', deviceInfo)
    }

    if (firstTimeSetting) {
      console.log(
        'Telemetry setting will be remembered. If you would like to reset, please delete following file and run the sample again'
      )
      console.log('~/.iot-hub-getting-started/biSettings.json\n')
    }

    bi.flush()
  } catch (e) {
    // ignore
  }

  // create a client
  // read out the connectionString from process environment
  var connectionString =  config.connectionString || process.env['AzureIoTHubDeviceConnectionString'];
  client = initClient(connectionString, config)

  client.open(err => {
    if (err) {
      console.error('[IoT Hub Client] Connect error:\n\t' + err.message)
      return
    }

    // set C2D and device method callback
    client.onDeviceMethod('message', receiveMessageCallback)
    setInterval(() => {
      client.getTwin((err, twin) => {
        if (err) {
          console.error(
            '[IoT Hub Client] Got twin message error:\n\t' + err.message
          )
          return
        }
        config.interval = twin.properties.desired.interval || config.interval
      })
    }, config.interval)
  })
})()
