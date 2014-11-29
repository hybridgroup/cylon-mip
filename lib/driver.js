/*
 * cylon-mip driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var MIPReceiveDataService = 'ffe0',
    MIPReceiveDataNotify = 'ffe4',
    MIPSendDataService = 'ffe5',
    MIPSendDataWrite = 'ffe9';

var Codes = require('./codes'),
    Games = require('./games');

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

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

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
}

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
}

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
}

Driver.prototype.getUp = function(stand, callback) {
  var packet = new Array(2);
  packet[0] = this.Codes.GetUp;
  packet[1] = stand;
  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
}

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
}

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
}

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
}

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
}

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
}

Driver.prototype.setGameMode = function(mode, callback) {
  var packet = new Buffer(2);
  packet[0] = this.Codes.SetGameMode;
  packet[1] = mode;

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
}

Driver.prototype.stop = function(callback) {
  var packet = new Buffer(1);
  packet[0] = this.Codes.Stop;

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    callback
  );
}

Driver.prototype._writeServiceCharacteristic = function(serviceId, characteristicId, value, callback) {
  this.connection.writeServiceCharacteristic(serviceId, characteristicId, new Buffer(value),
    function(err, data) {
      if ('function' === typeof(callback)) { callback(err, data); }
    }
  );
};
