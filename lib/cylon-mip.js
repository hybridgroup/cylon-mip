/*
 * cylon-mip
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Driver = require('./driver');

module.exports = {
  driver: function(opts) {
    return new Driver(opts);
  },

  register: function(robot) {
    robot.registerDriver('cylon-mip', 'mip');
  }
};
