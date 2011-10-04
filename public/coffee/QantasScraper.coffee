window.QantasScraper = class QantasScraper
  constructor: () ->

  passengerName: () ->
    ($ 'div#ContactDetails').find('td').eq(0).text()

  mobileNumber: () ->
    ($ "div#ContactDetails").find("table.pax-contact").find("tr").eq(5).find("td").eq(1).text()
