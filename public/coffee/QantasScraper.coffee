window.QantasScraper = class QantasScraper
  constructor: () ->

  isReady: () ->
    index = ($ document).text().toLowerCase().indexOf("qantas") 
    if index != -1
      true
    else
      false

  passengerName: () ->
    ($ 'div#ContactDetails').find('td').eq(0).text()

  mobileNumber: () ->
    ($ "div#ContactDetails").find("table.pax-contact").find("tr").eq(5).find("td").eq(1).text()

  reservationNumber: () ->
    ($ "div#title").find("h2").text().trim().split(/\s+/).filter((word, index) -> index == 2).join('')
