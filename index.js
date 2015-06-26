"use strict";

var MIP = require("./lib/driver");

module.exports = {
  drivers: ["mip"],

  driver: function(opts) {
    return new MIP(opts);
  }
};
