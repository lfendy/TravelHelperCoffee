#javascript:(function(){document.body.appendChild(document.createElement('script')).src='** your external file URL here **';})();


window.TravelHelper = class TravelHelper
  constructor: () ->

  createView: (screenScraper) ->
    passenger = screenScraper.passenger()
    flights   = screenScraper.flights()
    view =
      passengerName:     passenger.name
      mobileNumber:      passenger.mobileNumber
      reservationNumber: passenger.reservationNumber
      flights:           flight.toJSON() for flight in flights
    view

  run: () ->
    v = new VirginScraper()
    view = @createView v
    inputForm = Mustache.to_html(UITemplate, view);

    #inject ui
    ($ 'body').prepend inputForm

    #bind listeners
    ($ 'input#mobileNumber').bind 'focusout', ->
      ($ 'span#mobileNumber').text '(' + ($ 'input#mobileNumber').val() + ')'





# =========== Code for injecting the travel helper =============


th = new TravelHelper()
($ document).ready(() -> th.run())
($ 'div.logoVirginBlue').hide()
