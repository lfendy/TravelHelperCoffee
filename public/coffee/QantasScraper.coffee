window.QantasScraper = class QantasScraper
  constructor: () ->

  passengerName: () ->
    ($ 'div#ContactDetails').find('td').eq(0).text()
