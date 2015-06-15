"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "central", uuid: "d03972a24e55", module: "cylon-ble" }
  },

  devices: {
    battery: { driver: "ble-battery-service" },
    deviceInfo: { driver: "ble-device-information" },
    mip: { driver: "mip" }
  },

  work: function(my) {
    my.deviceInfo.getManufacturerName(function(err, data) {
      if (err) {
        console.log("error:", err);
        return;
      }

      console.log("data:", data);

      my.mip.setHeadLED(2, 2, 2, 2);
    });
  }
}).start();
