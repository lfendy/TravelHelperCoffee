window.Flight = class Flight
  constructor: () ->

  toJSON: () ->
    departureDate: @departureDate
    formattedDepartureDate: @formattedDepartureDate
    formattedArrivalDate: @formattedArrivalDate
    departureTime: @departureTime
    arrivalDate:   @arrivalDate
    arrivalTime:   @arrivalTime
    origin:        @origin
    destination:   @destination
    airline:       @airline
    flightNumber:  @flightNumber
    flightNumberNoWS: @flightNumberNoWS
