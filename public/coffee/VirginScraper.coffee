window.Flight = class Flight
  constructor: () ->

  toJSON: () ->
    departureDate: @departureDate
    departureTime: @departureTime 
    arrivalDate:   @arrivalDate 
    arrivalTime:   @arrivalTime 
    origin:        @origin 
    destination:   @destination 
    airline:       'Virgin Airlines'
    flightNumber:  @flightNumber 
      

window.Passenger = class Passenger
  constructor: () ->


window.VirginScraper = class VirginScraper
  constructor: () ->

  passengerName: () ->
    ($ 'td.itineraryGuestBaggageNameColumn').text()

  mobileNumber: () ->
    ($ 'div#BookingConfirmationMain')
      .find('tr').eq(1)
      .find('td').eq(3)
      .html()?.split(/<br.*?>/g)[0]

  reservationNumber: () ->
    ($ 'td.reservationnumber').text().trim()

  parseFlight: (raw) ->
    f = new Flight()
    f.flightNumber  = ($ raw).find('td.flightContents').eq(0).text()
    f.departureDate = ($ raw).find('td.flightDate').text()
    f.arrivalDate   = ($ raw).find('td.flightDate').text()
    f.departureTime = ($ raw).find('span.flightTimeTerminus').eq(0).text()
    f.arrivalTime   = ($ raw).find('span.flightTimeTerminus').eq(1).text()
    originClone      = ($ raw).find('td.flightContents').eq(1).clone()
    destinationClone = ($ raw).find('td.flightContents').eq(2).clone()
    originClone.find('span.flightTimeTerminus').remove()
    destinationClone.find('span.flightTimeTerminus').remove()
    f.origin        = originClone.text().trim()
    f.destination   = destinationClone.text().trim()
    f

  flights: () ->
    result = (@parseFlight raw) for raw in ($ 'div.passengerDetailsFrame')


  passenger: () ->
    p = new Passenger()
    p.name              = @passengerName()
    p.mobileNumber      = @mobileNumber()
    p.reservationNumber = @reservationNumber()
    p



