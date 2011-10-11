describe "Globals", ->

  it "should return address by the given city", ->
    (expect window.airportAddresses['Sydney']).toEqual "Airport Drive Mascot, NSW 2020"

  it "should return address by the given city with underscore in its name", ->
    (expect window.airportAddresses['Gold_Coast']).toEqual "1 Eastern Ave Bilinga QLD 4225"

