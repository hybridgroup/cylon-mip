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

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);


  // Include a list of commands that will be made available to the device instance.
  // and used in the work block of the robot.
  this.commands = {
    // This is how you register a command function for the device;
    // the command should be added to the prototype, see below.
    head_led: this.setHeadLED
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

Driver.prototype.setHeadLED = function(light1, light2, light3, light4) {
  var packet = new Array(5);
  packet[0] = 0x8a;
  packet[1] = light1;
  packet[2] = light2;
  packet[3] = light3;
  packet[4] = light4;
  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    function() {
      console.log('setHeadLED');
    }
  );
}

Driver.prototype.getUp = function(stand) {
  var packet = new Array(2);
  packet[0] = 0x23;
  packet[1] = stand;
  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    function() {
      console.log('getUp');
    }
  );
}

Driver.prototype.distanceDrive = function(direction, distance, turnDirection, turnAngle) {
  var packet = new Buffer(6);
  packet[0] = 0x70;
  packet[1] = direction;
  packet[2] = distance;
  packet[3] = turnDirection;
  packet.writeUInt16BE(turnAngle, 4);

  this._writeServiceCharacteristic(MIPSendDataService,
    MIPSendDataWrite,
    packet,
    function() {
      console.log('distanceDrive');
    }
  );
}

Driver.prototype._writeServiceCharacteristic = function(serviceId, characteristicId, value, callback) {
  this.connection.writeServiceCharacteristic(serviceId, characteristicId, new Buffer(value),
    function(err, data) {
      if ('function' === typeof(callback)) { callback(err, data); }
    }
  );
};
