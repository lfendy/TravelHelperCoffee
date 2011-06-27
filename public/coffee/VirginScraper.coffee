window.Flight = class Flight
  constructor: () ->
    @departureDate
    @departureTime
    @origin
    @arrivalDate
    @arrivalTime
    @destination
  


window.VirginScraper = class VirginScraper
  constructor: () ->

  passengerName: () ->
    ($ 'td.itineraryGuestBaggageNameColumn').text()

  parseFlight: (raw) ->
    f = new Flight()
    f.flightNumber  = ($ raw).find('td.flightContents').eq(0).text()
    f.departureDate = ($ raw).find('td.flightDate').text()
    f.arrivalDate   = ($ raw).find('td.flightDate').text()
    f.departureTime = ($ raw).find('span.flightTimeTerminus').eq(0).text()
    f.arrivalTime   = ($ raw).find('span.flightTimeTerminus').eq(1).text()
    f

  flights: () ->
    result = @parseFlight(raw) for raw in ($ 'div.passengerDetailsFrame')





