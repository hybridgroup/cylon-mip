/*
 * cylon-mip driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

/* eslint key-spacing: 0 */

"use strict";

module.exports = {
  PlaySound:              0x06,
  SetPosition:            0x08,
  DistanceDrive:          0x70,
  DriveForwardTime:       0x71,
  DriveBackwardTime:      0x72,
  TurnLeftAngle:          0x73,
  TurnRightAngle:         0x74,
  ContinousDrive:         0x78,
  SetGameMode:            0x76,
  GetGameMode:            0x82,
  Stop:                   0x77,
  RequestStatus:          0x79,
  GetUp:                  0x23,
  RequestWeightUpdate:    0x81,
  RequestChestLED:        0x83,
  SetChestLED:            0x84,
  FlashChestLED:          0x89,
  SetHeadLED:             0x8a,
  RequestHeadLED:         0x8B,
  ReadOdometer:           0x85,
  ResetOdometer:          0x86,
  GestureDetect:          0x0A,
  SetGestureRadarMode:    0x0C,
  GetRadarMode:           0x0D,
  RadarResponse:          0x0C,
  DetectionMode:          0x0E,
  RequestDetectionMode:   0x0F,
  Detected:               0x04,
  ShakeDetected:          0x1A,
  IRRemoteEnabled:        0x10,
  RequestIRRemoteEnabled: 0x11,
  Sleep:                  0xFA,
  DisconnectApp:          0xFE,
  ForceBLEDisconnect:     0xFC,
  SetUserData:            0x12,
  GetUserData:            0x13,
  GetSoftwareVersion:     0x14,
  GetHardwareInfo:        0x19,
  SetVolume:              0x15,
  GetVolume:              0x16,
  SendIRDongleCode:       0x8C,
  ReceiveIRDongleCode:    0x03,
  ClapTimes:              0x1D,
  ClapEnabled:            0x1E,
  RequestClapEnabled:     0x1F,
  ClapDelayTime:          0x20
};
