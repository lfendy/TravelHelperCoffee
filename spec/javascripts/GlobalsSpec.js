(function() {
  describe("Globals", function() {
    it("should return address by the given city", function() {
      return (expect(window.airportAddresses['Sydney'])).toEqual("Airport Drive Mascot, NSW 2020");
    });
    return it("should return address by the given city with underscore in its name", function() {
      return (expect(window.airportAddresses['Gold_Coast'])).toEqual("1 Eastern Ave Bilinga QLD 4225");
    });
  });
}).call(this);
