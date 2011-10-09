window.GoogleSpreadsheetFetcher = class GoogleSpreadsheetFetcher
  constructor: () ->

  carGoogleSpreadsheetAjaxCallback: (cells) ->
    cars = []                                                                                                                                                                     
    
    i = 4
    while i < cells.length
      cars.push @parseCar cells, i
      i = i + 4
    console.log cars
    view =
      cars: cars     
    ($ "p#car-content").html ""
    UtilScraper.get().injectHtml UICarTemplate, view, ($ "p#car-content")


  getCarGoogleSpreadsheetAsJson: () ->
    UtilScraper.get().getGoogleSpreadsheetAsJson 'pgZYLtdPRv51beYTHUIrFWg', 'od6', this, @carGoogleSpreadsheetAjaxCallback
    "Alex"
  
  getTraveltimeFromGoogle: (from, to) ->
    UtilScraper.get().queryGoogleMap from, to, 'span#destination'
    "Alex"

  traveltimeFromGoogleAjaxCallback: (responseText) ->
    alert responseText
    console.log responseText

  parseCar: (cells, i) ->
    city = cells[i].content.$t
    company = cells[i + 1].content.$t
    contact = cells[i + 2].content.$t
    phone = cells[i + 3].content.$t
    c = new Car()
    c.city = city
    c.company = company
    c.contact = contact
    c.phone = phone
    console.log city + ' | ' + company + ' | ' + contact + ' | ' + phone                                                                                                          
    c 
