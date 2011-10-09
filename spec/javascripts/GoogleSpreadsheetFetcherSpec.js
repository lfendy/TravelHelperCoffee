(function() {
  describe("GoogleSpreadsheetFetcher", function() {
    it("should perform Ajax GET sanity check to Google spreadsheet for cars info", function() {
      var t;
      t = new GoogleSpreadsheetFetcher();
      return (expect(t.getCarGoogleSpreadsheetAsJson())).toEqual('Alex');
    });
    return it("should perform Ajax GET sanity check to Google spreadsheet for cars info", function() {
      var t;
      t = new GoogleSpreadsheetFetcher();
      return (expect(t.getTraveltimeFromGoogle('274 Ballarat Road, Footscray 3011', '12-32 Pecks Road, Sydenham 3037'))).toEqual('Alex');
    });
  });
}).call(this);
