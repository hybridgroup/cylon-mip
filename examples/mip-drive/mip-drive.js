"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "central", uuid: "d03972a24e55", module: "cylon-ble" }
  },

  devices: {
    mip: { driver: "mip" }
  },

  work: function(my) {
    my.mip.setHeadLED(2, 2, 2, 2);

    after((2).seconds(), function() {
      my.mip.driveDistance(0, 10, 0, 0);
    });

    after((3).seconds(), function() {
      my.mip.setHeadLED(1, 1, 1, 1);
    });
  }
}).start();
