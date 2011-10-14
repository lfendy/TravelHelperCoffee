window.VirginScraper = class VirginScraper
  constructor: () -> 

  isReady: () ->
    index = ($ document).text().toLowerCase().indexOf("Your booking")
    if index != -1
      console.log('VirginScraper:: VirginScraper is ready for action')
      true
    else
      console.log('VirginScraper:: VirginScraper is NOT ready for action, the target page is not Virgin')
      false

  name: () ->
    "VirginScraper"

  makePrettyDate: (scrapedDate) ->
    components = []
                                                                                                                                                                                  
    if scrapedDate.indexOf('-') != -1 
      components = scrapedDate.split('-')
    else
      components = scrapedDate.split(' ')   

   
    if components[2]? && components[2].length < 4
      components[2] = '20' + components[2]

    us_date = components[1] + '/' + components[0] + '/' + components[2]
    date = new Date(Date.parse(us_date))
    formattedDate = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    formattedDate

  passengerName: () ->
    ($ 'td.itineraryGuestBaggageGuestHeadingWithButton')
      .find('span').eq(0)
      .text().split(/\s+/)
      .filter((word, index) -> index > 0)
      .join(' ')

  mobileNumber: () ->
    ($ 'div#BookingConfirmationMain')
      .find('tr').eq(1)
      .find('td').eq(3)
      .html()?.split(/<br.*?>/g)[0]

  reservationNumber: () ->
    ($ 'td.reservationnumber').text().trim()

  parseFlight: (raw) ->
    f = new Flight()
    f.airline = "Virgin Airlines"
    f.flightNumber  = ($ raw).find('td.flightContents').eq(0).text()
    f.flightNumberNoWS = f.flightNumber.replace ///\s+///, ''
    f.departureDate = ($ raw).find('td.flightDate').text()
    f.formattedDepartureDate = @makePrettyDate f.departureDate
    f.arrivalDate   = ($ raw).find('td.flightDate').text()
    f.formattedArrivalDate = @makePrettyDate f.arrivalDate
    f.departureTime = ($ raw).find('span.flightTimeTerminus').eq(0).text().replace('am','').replace('pm','').replace('AM','').replace('PM','').trim()
    f.arrivalTime   = ($ raw).find('span.flightTimeTerminus').eq(1).text().replace('am','').replace('pm','').replace('AM','').replace('PM','').trim()
    originClone      = ($ raw).find('td.flightContents').eq(1).clone()
    destinationClone = ($ raw).find('td.flightContents').eq(2).clone()
    originClone.find('span.flightTimeTerminus').remove()
    destinationClone.find('span.flightTimeTerminus').remove()
    f.origin        = originClone.text().trim()
    f.origin        = f.origin.replace ///\s+///, '_' 
    f.destination   = destinationClone.text().trim()
    f.destination        = f.destination.replace ///\s+///, '_'
    f

  accommodation: () ->
    a = new Accommodation()
    
    raw = ($ 'div.passengerDetailsFrame:eq(0)')
    console.log "Raw: " + raw
    destinationClone      = ($ raw).find('td.flightContents').eq(2).clone()
    destinationClone.find('span.flightTimeTerminus').remove()
    hostingCity = destinationClone.text().trim()
    hostingCity = hostingCity.replace ///\s+///, '_'
    console.log "Scraped hosting city: " + hostingCity
    a.hostingCity = hostingCity
    a.stayFrom = ($ raw).find('td.flightDate').text()

    raw = ($ 'div.passengerDetailsFrame:eq(1)')
    a.stayTo = ($ raw).find('td.flightDate').text()
    a


  flights: () ->
    result = (@parseFlight raw) for raw in ($ 'div.passengerDetailsFrame')

  passenger: () ->
    p = new Passenger()
    p.name              = @passengerName()
    p.mobileNumber      = @mobileNumber()
    p.reservationNumber = @reservationNumber()
    p
