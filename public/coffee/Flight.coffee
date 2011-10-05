window.Flight = class Flight
  constructor: () ->

  toJSON: () ->
    departureDate: @departureDate
    formattedDepartureDate: @formattedDepartureDate
    departureTime: @departureTime
    arrivalDate:   @arrivalDate
    arrivalTime:   @arrivalTime
    origin:        @origin
    destination:   @destination                                                                                                                                                   
    airline:       'Virgin Airlines'
    flightNumber:  @flightNumber                                                                                                                                                           
