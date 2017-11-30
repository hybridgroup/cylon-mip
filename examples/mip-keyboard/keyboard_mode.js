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
    my.mip.setHeadLED(1, 2, 1, 2);
    console.log("All set");
    my.keyboard.on("up", function() {
      my.mip.driveDistance(0, 10, 0, 0, function() {
        console.log("Moved front!");
      });
    });
    my.keyboard.on("down", function() {
      my.mip.driveDistance(0, 0, 0, 180, function() {
        after((0.1).seconds(), function() {
          my.mip.driveDistance(0, 10, 0, 0);
        });
      });
    });
    my.keyboard.on("left", function() {
      my.mip.driveDistance(0, 0, 0, 90, function() {
        console.log("Turned left!");
      });
    });
    my.keyboard.on("right", function() {
      my.mip.driveDistance(0, 0, -1, 90, function() {
        console.log("Turned right!");
      });
    });
    my.keyboard.on("return", function() {
      my.mip.setChestLED("g", function() {
        console.log("Program end");
      });
    });
  }
}).start();
