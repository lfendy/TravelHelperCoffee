describe "UtilScraper", ->

  #Not a valid testcase
  it "should perfom sanity check using JSON-P to get some output", ->
    util = UtilScraper.get()
    util.queryGoogleMap("12-32 Pecks road, Sydenham 30307", "6 Rosstown road, Carnegie 3163");
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

