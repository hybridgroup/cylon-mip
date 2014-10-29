"use strict";

var module = source("cylon-mip");

var Driver = source('driver');

describe("Cylon.MIP", function() {
  describe("#register", function() {
    it("should be a function", function() {
      expect(module.register).to.be.a('function');
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { device: {} };
      expect(module.driver(args)).to.be.instanceOf(Driver);
    });
  });
});
