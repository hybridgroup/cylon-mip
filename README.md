# Cylon.js For MIP

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This repository contains the Cylon adaptor for the MiP robot from Wowwee (http://www.wowwee.com/mip/).

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-mip.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-mip) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-mip/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-mip) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-mip/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-mip)

## How to Install

    $ npm install cylon cylon-mip

## How to Use

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: { bluetooth: {adaptor: 'central', uuid: 'd03972a24e55', module: 'cylon-ble'}},
  devices: {mip: {driver: 'mip'}},

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

```

## How to Connect

You need to determine the `uuid` of your MiP. One way to do this, is to use the `cylon-ble-scan` command line utility installed as part of [cylon-ble](https://github.com/hybridgroup/cylon-ble).

Once you know your `uuid` just substititute it into your code.

## Documentation

We're busy adding documentation to [cylonjs.com](http://cylonjs.com). Please check there as we continue to work on Cylon.js.

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-mip/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-mip/blob/master/RELEASES.md
).

## License

Copyright (c) 2014-2015 The Hybrid Group. Licensed under the Apache 2.0 license.
