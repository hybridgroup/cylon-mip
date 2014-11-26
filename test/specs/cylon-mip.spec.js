"use strict";

var module = source("cylon-mip");

var MIP = source('driver');

describe("Cylon.MIP", function() {
  describe("#driver", function() {
    it("returns an instance of the MIP Driver", function() {
      var args = { device: {connection: 'test'} };
      expect(module.driver(args)).to.be.instanceOf(MIP);
    });
  });
});
