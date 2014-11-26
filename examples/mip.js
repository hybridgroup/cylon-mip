var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'bluetooth', adaptor: 'central', uuid: 'd03972a24e55', module: 'cylon-ble'},
  devices: [{name: 'battery', driver: 'ble-battery-service'},
            {name: 'deviceInfo', driver: 'ble-device-information'}
            {name: 'mip', driver: 'mip'}],

  display: function(err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Data:", data);
    }
  },

  work: function(my) {
    my.deviceInfo.getManufacturerName(function(err, data){
      my.display(err, data);
      my.mip.setHeadLED(2, 2, 2, 2);
    });
  }
}).start();
