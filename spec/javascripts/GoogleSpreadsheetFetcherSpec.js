(function() {
  describe("GoogleSpreadsheetFetcher", function() {
    return it("should perform Ajax GET sanity check to Google spreadsheet for cars info", function() {
      var t;
      t = new GoogleSpreadsheetFetcher();
      return (expect(t.getCarGoogleSpreadsheetAsJson())).toEqual('Alex');
    });
  });
}).call(this);
