/*
 * cylon-mip driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

module.exports = {
  // App - The same as cancel Gesture and Radar
  App: 0x01,

  // Cage - Play back
  Cage: 0x02,

  // Tracking - The same as enable Radar
  Tracking: 0x03,

  // Dance - Play back
  Dance: 0x04,

  // Default Mip Mode - The same as enable Gesture(0x0A)
  Default: 0x05,

  // Stack - Play back
  Stack: 0x06,

  // Trick - programming and playback
  Trick: 0x07,

  // Roam Mode - Play back
  Roam: 0x08
};
