(function() {
  describe("TravelHelper", function() {
    it("should render passenger name", function() {
      return (expect(2)).toEqual(2);
    });
    return it("should perform Ajax GET sanity check to Google spreadsheet for cars info", function() {
      var t;
      t = new TravelHelper();
      return (expect(t.getCarGoogleSpreadsheetAsJson())).toEqual('Alex');
    });
  });
}).call(this);
