"use strict";

var module = source("cylon-mip");

var MIP = source('driver');

describe("Cylon.MIP", function() {
  describe("#drivers", function() {
    it("is an array of provided drivers", function() {
      expect(module.drivers).to.be.eql(["mip"])
    });
  });

  describe("#driver", function() {
    it("returns an instance of the MIP", function() {
      var args = { adaptor: {} };
      expect(module.driver(args)).to.be.instanceOf(MIP);
    });
  });
});
