describe "VirginScraper", ->

  it "should scrape passenger name", ->
    jasmine.getFixtures().set
      '<td class="itineraryGuestBaggageNameColumn">JACK JOHNSON</td>'
    expect(scrapePassengerName()).toEqual 'JACK JOHNSON'
