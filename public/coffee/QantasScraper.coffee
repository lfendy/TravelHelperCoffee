window.QantasScraper = class QantasScraper
  constructor: () ->

  isReady: () ->
    index = ($ document).text().toLowerCase().indexOf("qantas") 
    if index != -1
      console.log('QantasScraper:: QantasScraper is ready for action')
      true
    else
      console.log('QantasScraper:: Qantascraper is NOT ready for action, the target page is not Qantas')
      false

  name: () ->
    "QantasScraper"
  
  makePrettyDate: (scrapedDate) ->
    components = []
    
    if scrapedDate.indexOf('-') != -1 
      components = scrapedDate.split('-')
    else
      components = scrapedDate.split(' ')   

   
    if components[3]? && components[3].length < 4
      components[3] = '20' + components[3]

    us_date = components[2] + '/' + components[0] + ' ' + components[1] +  '/' + components[3]
    date = new Date(Date.parse(us_date))
    formattedDate = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    formattedDate

  passengerName: () ->
    ($ 'div#ContactDetails').find('td').eq(0).text()

  mobileNumber: () ->
    ($ "div#ContactDetails").find("table.pax-contact").find("tr").eq(5).find("td").eq(1).text()

  reservationNumber: () ->
    ($ "div#title").find("h2").text().trim().split(/\s+/).filter((word, index) -> index == 2).join('')

  passenger: () ->
    p = new Passenger()
    p.name              = @passengerName()
    p.mobileNumber      = @mobileNumber()
    p.reservationNumber = @reservationNumber()                                                                                                                                    
    p

  flights: () ->
    result = (@parseFlight raw) for raw in ($ 'tr.tr_first')

  parseFlight: (raw) ->
    f = new Flight()
    f.flightNumber  = ($ raw).find('span.flightnumber').text().trim()
    f.departureDate = ($ raw).find('td').eq(0).text().trim()
    f.formattedDepartureDate = @makePrettyDate f.departureDate
    f.arrivalDate   = ($ raw).find('td').eq(0).text().trim()
    f.departureTime = ($ raw).find('td').eq(1).text().trim()
    f.arrivalTime   = ($ raw).find('td').eq(3).text().trim()
    f.origin        = ($ raw).find('td').eq(2).text().trim()
    f.destination   = ($ raw).find('td').eq(4).text().trim()
    f 
