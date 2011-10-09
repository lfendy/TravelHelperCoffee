describe "GoogleSpreadsheetFetcher", ->                                                                                                                                                       
  it "should perform Ajax GET sanity check to Google spreadsheet for cars info", ->
    t = new GoogleSpreadsheetFetcher()
    (expect t.getCarGoogleSpreadsheetAsJson()).toEqual 'Alex'

  it "should perform Ajax GET sanity check to Google spreadsheet for cars info", ->
    t = new GoogleSpreadsheetFetcher()
    (expect t.getTraveltimeFromGoogle('274 Ballarat Road, Footscray 3011', '12-32 Pecks Road, Sydenham 3037')).toEqual 'Alex'
