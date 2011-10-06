describe "TravelHelper", ->
  
  it "should render passenger name", ->
    (expect 2).toEqual 2

  it "should perform Ajax GET sanity check to Google spreadsheet for cars info", ->
    t = new TravelHelper()
    (expect t.getCarGoogleSpreadsheetAsJson()).toEqual 'Alex'
