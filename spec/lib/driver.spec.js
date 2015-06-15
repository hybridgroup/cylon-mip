"use strict";

var MIP = lib("driver");

describe("Cylon.Drivers.MIP", function() {
  var driver = new MIP({
    device: { connection: "connect" }
  });

  it("needs tests", function() {
    expect(driver).to.be.an.instanceOf(MIP);
  });
});
