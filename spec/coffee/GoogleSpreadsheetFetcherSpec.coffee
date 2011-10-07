describe "GoogleSpreadsheetFetcher", ->                                                                                                                                                       
  it "should perform Ajax GET sanity check to Google spreadsheet for cars info", ->
    t = new GoogleSpreadsheetFetcher()
    (expect t.getCarGoogleSpreadsheetAsJson()).toEqual 'Alex'
