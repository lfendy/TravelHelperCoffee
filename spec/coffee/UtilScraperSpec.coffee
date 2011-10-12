describe "UtilScraper", ->

  #Not a valid test
  it "should perfom sanity check using Google spreadsheet to get hotel output", ->
    v = new VirginScraper()
    ac = v.accommodation()
    UtilScraper.get().getGoogleSpreadsheetAsJson('pgZYLtdPRv50AK70fqJkQSw', 'od6', (result) -> UtilScraper.get().hotelGoogleSpreadsheetAjaxCallback(result, ac));
    (expect "true").toEqual "true"

  #Not a valid test
  it "should perfom sanity check using API to get some output (1)", ->
    util = UtilScraper.get()
    util.queryGoogleDistanceMatrix("50 McElhone Street, Woolloomooloo 2011", window.airportAddresses["Sydney"], "some-div-id");
    (expect "true").toEqual "true"

  #Not a valid test
  it "should perfom sanity check using API to get some output (2)", ->                                                                                                            
    util = UtilScraper.get()
    util.queryGoogleDistanceMatrix("274 Ballarat Road, Footscray 3011", window.airportAddresses["Melbourne"], "some-div-id");
    (expect "true").toEqual "true"

  
  it "should substract minutes from given date string", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('12:10 Sat 08 Oct 2011', 30)).toEqual "11:40 Saturday 8 October 2011"

  it "should substract minutes from given date string (2)", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('00:10 Sat 08 Oct 2011', 30)).toEqual "23:40 Friday 7 October 2011"

  it "should substract minutes from given date string (3)", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('00:10 Tue 01 Mar 2011', 45)).toEqual "23:25 Monday 28 February 2011"

  it "should substract minutes from given date string (4)", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('00:10 Thu 01 Mar 2012', 45)).toEqual "23:25 Wednesday 29 February 2012"

  it "should substract minutes from given date string (5)", ->                                                                                                                    
    util = UtilScraper.get()
    (expect util.estimateDatetime('7:15 Sat 08 Oct 2011', 90)).toEqual "5:45 Saturday 8 October 2011"

  it "should substract minutes from given date string (6)", ->                                                                                                                    
    util = UtilScraper.get()
    (expect util.estimateDatetime('7:15 Saturday 8 October 2011', 90)).toEqual "5:45 Saturday 8 October 2011"

