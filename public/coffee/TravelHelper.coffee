#javascript:(function(){document.getElementsByTagName('body')[0].appendChild(document.createElement('script')).src='<--your external url here-->/TravelHelper.min.js?time='+(new%20Date()).getTime();})();

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
    scrapers = []
    scrapers.push new VirginScraper()
    scrapers.push new QantasScraper()
    scrapers.push new JetStarScraper()

    for s in scrapers
      if s.isReady()
        readyScraper = s
        console.log "TravelHelper:: Found ready scraper: " + s.name()

    if readyScraper?
      console.log "TravelHelper:: " + readyScraper.name() + " is starting to scrape.."
      view = @createView readyScraper
      #inject ui
      UtilScraper.get().injectHtml UITemplate, view, ($ "body")
     
      UtilScraper.get().getGoogleSpreadsheetAsJson 'pgZYLtdPRv51beYTHUIrFWg', 'od6', (result) -> UtilScraper.get().carGoogleSpreadsheetAjaxCallback(result)
      ac = readyScraper.accommodation()
      UtilScraper.get().getGoogleSpreadsheetAsJson 'pgZYLtdPRv50AK70fqJkQSw', 'od6', (result) -> UtilScraper.get().hotelGoogleSpreadsheetAjaxCallback(result, ac)
      
      #bind listeners
      ($ 'input#mobileNumber').bind 'focusout', ->
        ($ 'span#mobileNumber').text '(' + ($ 'input#mobileNumber').val() + ')'

      ($ 'input#mobileNumber').change ->
        ($ 'span#mobileNumber').text '(' + ($ 'input#mobileNumber').val() + ')'
      
    else
      console.log "TravelHelper:: Does not have scraper ready!"
      ($ 'body').prepend "<p><br /><br /><br /><br /><h1 style='color: red !important; padding: 15px;'>Oops! Text scraper is not ready. Contact TW support!</h1></p>"
  
# =========== Code for injecting the travel helper =============


th = new TravelHelper()
($ document).ready(() -> th.run())
($ 'div.logoVirginBlue').hide()
