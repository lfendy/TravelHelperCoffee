describe "UtilScraper", ->

  it "should perfom sanity check using API to get some output (1)", ->
    util = UtilScraper.get()
    util.queryGoogleDistanceMatrix("50 McElhone Street, Woolloomooloo 2011", window.airportAddresses["Sydney"], "some-div-id");
    (expect "true").toEqual "true"

  it "should perfom sanity check using API to get some output (2)", ->
    util = UtilScraper.get()
    util.queryGoogleDistanceMatrix("274 Ballarat Road, Footscray 3011", window.airportAddresses["Melbourne"], "some-div-id");
    (expect "true").toEqual "true"


  it "should substract minutes from given date string", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('Sat 08 Oct 2011 12:10', 30)).toEqual "11:40 Saturday 8 October 2011"

  it "should substract minutes from given date string (2)", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('Sat 08 Oct 2011 00:10', 30)).toEqual "23:40 Friday 7 October 2011"

  it "should substract minutes from given date string (3)", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('Tue 01 Mar 2011 00:10', 45)).toEqual "23:25 Monday 28 February 2011"

  it "should substract minutes from given date string (4)", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('Thu 01 Mar 2012 00:10', 45)).toEqual "23:25 Wednesday 29 February 2012"

  it "should substract minutes from given date string (5)", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('Sat 08 Oct 2011 7:15', 90)).toEqual "5:45 Saturday 8 October 2011"

  it "should substract minutes from given date string (6)", ->
    util = UtilScraper.get()
    (expect util.estimateDatetime('Saturday 8 October 2011 7:15', 90)).toEqual "5:45 Saturday 8 October 2011"

