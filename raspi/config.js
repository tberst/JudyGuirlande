'use strict'
var config;
const _ = require('lodash');

// read in configuration in config.json
try {
    config = require('./config.json')
  } catch (err) {
    console.error('Failed to load config.json:\n\t' + err.message)
    return
  }
  
  try {
    var environmentConfig = require('./env.json');
    config =  _.merge(config, environmentConfig);
  } catch (err) {
    //do nothing 
  }

  
exports.config = config;