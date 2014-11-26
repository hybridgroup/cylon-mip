/*
 * cylon-mip
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var MIP = require('./driver');

module.exports = {
  drivers: ['mip'],

  driver: function(opts) {
    return new MIP(opts);
  }
};

