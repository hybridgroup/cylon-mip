"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "central", uuid: "78a50449e7d9", module: "cylon-ble" },
    keyboard: { adaptor: "keyboard" }
  },

  devices: {
    keyboard: { driver: "keyboard", connection: "keyboard" },
    mip: { driver: "mip" }
  },

  work: function(my) {
    console.log("Setting up the MIP");
    my.mip.setChestLED(0, 1, 0);
    console.log("All set");
    after((2).seconds(), function() {
      my.mip.driveDistance(0, 25, 0, 0, function() {
        console.log("Moved front!");
      });
    });
    after((5).seconds(), function() {
      my.mip.driveDistance(0, 0, -1, 90, function() {
        console.log("Turned right!");
      });
    });
    after((5.1).seconds(), function() {
      my.mip.driveDistance(0, 25, 0, 0, function() {
        console.log("Moved front!");
      });
    });
    after((10).seconds(), function() {
      my.mip.turnLeft(40, 20, function() {
        console.log("Turned back");
      });
    });
    after((10.1).seconds(), function() {
      my.mip.driveDistance(0, 25, 0, 0, function() {
        console.log("Moved front!");
      });
    });
    after((13).seconds(), function() {
      my.mip.driveDistance(0, 0, 0, 90, function() {
        console.log("Turned left!");
      });
    });
    after((13.1).seconds(), function() {
      my.mip.driveDistance(0, 25, 0, 0, function() {
        console.log("Moved front!");
      });
    });
    my.keyboard.on("return", function() {
      my.mip.stop(function() {
        console.log("Emergency brake");
      });
    });
  }
}).start();
