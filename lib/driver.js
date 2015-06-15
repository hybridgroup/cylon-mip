/*
 * cylon-mip driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

/* eslint no-unused-vars: 0, camelcase: 0, max-len: 0 */

var Cylon = require("cylon");

var MIPReceiveDataService = "ffe0",
    MIPReceiveDataNotify = "ffe4",
    MIPSendDataService = "ffe5",
    MIPSendDataWrite = "ffe9";

var Codes = require("./codes"),
    Games = require("./games");

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);

  this.Codes = Codes;
  this.Games = Games;

  this.commands = {
    set_head_led: this.setHeadLED,
    set_chest_led: this.setChestLED,
    flash_chest_led: this.flashChestLED,
    get_up: this.getUp,
    drive_distance: this.driveDistance,
    drive_forward: this.driveForward,
    drive_backward: this.driveBackward,
    turn_left: this.turnLeft,
    turn_right: this.turnRight,
    set_game_mode: this.setGameMode,
    stop: this.stop
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

/**
 * Starts the driver
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
Driver.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the driver
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
Driver.prototype.halt = function(callback) {
  callback();
};

/**
 * Sets the Head LEDs of the MiP
 *
 * @param {Number} light1 light one value
 * @param {Number} light2 light two value
 * @param {Number} light3 light three value
 * @param {Number} light4 light four value
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.setHeadLED = function(light1, light2, light3, light4, callback) {
  var packet = new Array(5);
  packet[0] = this.Codes.SetHeadLED;
  packet[1] = light1;
  packet[2] = light2;
  packet[3] = light3;
  packet[4] = light4;
  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Sets the Chest LED color of the MiP
 *
 * @param {Number} r red value
 * @param {Number} g green value
 * @param {Number} b blue value
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.setChestLED = function(r, g, b, callback) {
  var packet = new Array(4);
  packet[0] = this.Codes.SetChestLED;
  packet[1] = r;
  packet[2] = g;
  packet[3] = b;
  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Flashes the chest LED of the MiP
 *
 * @param {Number} r red value
 * @param {Number} g green value
 * @param {Number} b blue value
 * @param {Number} timeOn time on
 * @param {Number} timeOff time off
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.flashChestLED = function(r, g, b, timeOn, timeOff, callback) {
  var packet = new Array(6);
  packet[0] = this.Codes.FlashChestLED;
  packet[1] = r;
  packet[2] = g;
  packet[3] = b;
  packet[4] = timeOn;
  packet[5] = timeOff;
  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Tells the MiP to get up.
 *
 * @param {Number} stand MiP should stand
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.getUp = function(stand, callback) {
  var packet = new Array(2);
  packet[0] = this.Codes.GetUp;
  packet[1] = stand;
  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Tells the MiP to drive a distance, in a direction
 *
 * @param {Number} direction direction to drive
 * @param {Number} distance distance to drive
 * @param {Number} turnDirection direction to turn
 * @param {Number} turnAngle angle to turn
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.driveDistance = function(direction, distance, turnDirection, turnAngle, callback) {
  var packet = new Buffer(6);
  packet[0] = this.Codes.DistanceDrive;
  packet[1] = direction;
  packet[2] = distance;
  packet[3] = turnDirection;
  packet.writeUInt16BE(turnAngle, 4);

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Tells the MiP to drive forward
 *
 * @param {Number} speed speed to move at
 * @param {Number} time how long to move
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.driveForward = function(speed, time, callback) {
  var packet = new Buffer(3);
  packet[0] = this.Codes.DriveForwardTime;
  packet[1] = speed;
  packet[2] = time;

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Tells the MiP to drive backward
 *
 * @param {Number} speed speed to move at
 * @param {Number} time how long to move
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.driveBackward = function(speed, time, callback) {
  var packet = new Buffer(3);
  packet[0] = this.Codes.DriveBackwardTime;
  packet[1] = speed;
  packet[2] = time;

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Tells the MiP to turn to the left
 *
 * @param {Number} angle angle to turn to
 * @param {Number} speed speed to turn at
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.turnLeft = function(angle, speed, callback) {
  var packet = new Buffer(3);
  packet[0] = this.Codes.TurnLeftAngle;
  packet[1] = angle;
  packet[2] = speed;

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Tells the MiP to turn to the right
 *
 * @param {Number} angle angle to turn to
 * @param {Number} speed speed to turn at
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.turnRight = function(angle, speed, callback) {
  var packet = new Buffer(3);
  packet[0] = this.Codes.TurnRightAngle;
  packet[1] = angle;
  packet[2] = speed;

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Tells the MiP to start the specified game mode
 *
 * @param {Number} mode mode to set to
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.setGameMode = function(mode, callback) {
  var packet = new Buffer(2);
  packet[0] = this.Codes.SetGameMode;
  packet[1] = mode;

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Tells the MiP to stop whatever it's doing.
 *
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.stop = function(callback) {
  var packet = new Buffer(1);
  packet[0] = this.Codes.Stop;

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
};

/**
 * Writes a service characteristic to the MiP
 *
 * @param {Number} s ID of service to write to
 * @param {Number} c ID of characteristic to write to
 * @param {Number} value value to write
 * @param {Function} callback function to call when done
 * @return {void}
 */
Driver.prototype._writeServiceCharacteristic = function(s, c, value, callback) {
  this.connection.writeServiceCharacteristic(s, c, new Buffer(value),
    function(err, data) {
      if (typeof callback === "function") { callback(err, data); }
    }
  );
};
