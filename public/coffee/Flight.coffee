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
