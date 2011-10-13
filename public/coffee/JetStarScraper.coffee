window.JetStarScraper = class JetStarScraper
  constructor: () ->

  isReady: () ->
    index = ($ document).text().toLowerCase().indexOf("jetstar")
    if index != -1
      console.log('JetStarScraper:: JetStarScraper is ready for action')
      true
    else
      console.log('JetStarScraper:: JetStarScraper is NOT ready for action, the target page is not JetStar')
      false

  name: () ->
    "JetStarScraper"

  makePrettyDate: (scrapedDate) ->

  passengerName: () ->

  mobileNumber: () ->

  reservationNumber: () ->

  passenger: () ->
    p = new Passenger()
    p.name              = @passengerName()
    p.mobileNumber      = @mobileNumber()
    p.reservationNumber = @reservationNumber()
    p

  flights: () ->
    result = (@parseFlight raw) for raw in ($ 'blah-blah')

  parseFlight: (raw) ->
    f = new Flight()
    f.airline = "JetStar"
    f

  accommodation: () ->
    a = new Accommodation()
    a
