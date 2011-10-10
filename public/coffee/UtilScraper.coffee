window.UtilScraper = class UtilScraper
  
  instance = null 

  @get: ->
    if not instance?
      instance = new @
      instance.init('UtilScraper')

    instance  

  init: (name = "unknown") ->
    console.log "#{name} initialized"
  
  queryGoogleMap2: (sourceAddress, destinationAddress, targetDiv) ->
    ($ "span#" + targetDiv).html "Wait.."
    sourceAddress = sourceAddress + ", Australia"
    destinationAddress = destinationAddress + ", Australia"
    
    console.log google
    console.log google.maps

    #service = new google.maps.DistanceMatrixService()
    service.getDistanceMatrix 
      origins: [ sourceAddress ]
      destinations: [ destinationAddress ]
      travelMode: google.maps.TravelMode.DRIVING
      avoidHighways: false
      avoidTolls: false, (json) ->
        UtilScraper.get().parseGoogleMapMatrix json
    
  queryGoogleMap: (sourceAddress, destinationAddress, targetDiv) ->
    ($ "span#" + targetDiv).html "Wait.."
    sourceAddress = sourceAddress + ", Australia"
    destinationAddress = destinationAddress + ", Australia"
    
    #Trying to use JSON with padding (JSON-P) here, to bypass the ajax cross-domain restriction: http://en.wikipedia.org/wiki/JSONP, the 
    # original Google distance matrix API does not support it (adding 'callback=?' to URL). 
    # Therefore I had to use my own server in the middle. Yeah... it is doggy... But using a bookmarklet kind of limits the options.
    # Better solution is required here, as http://kickme.in is a temporary fix.
    # http://maps.googleapis.com/maps/api/distancematrix/json?origins=&destinations=&mode=driving&sensor=false  <-- Google API used on http://kickme.in
    
    url = 'http://kickme.in/travel.php?callback=?&sourceAddress=' + sourceAddress + '&destinationAddress=' + destinationAddress + '&target=' + targetDiv;
    $.getJSON url, (json) ->
        false

  parseGoogleMapMatrix: (json, targetDiv) ->
    console.log "Got target element: " + targetDiv
    unless json.status == "OK"
      alert "Error was when trying to query Google maps: " + status
      ($ "span#" + targetDiv).html "Oops! :("
    else
      console.log "JSON: " + json
      elements = json.rows[0].elements
      result = elements[0].distance.text + "->" + elements[0].duration.text
      console.log result
      ($ "span#" + targetDiv).html result
      

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
 
  getGoogleSpreadsheetAsJson: (spreadsheetId, gridId, target, callback) ->
    url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script'
    $.get url, (res) ->
        if res.responseText?
          res = res.responseText
        jsonString = res.substring(res.indexOf("{"), res.lastIndexOf("}") + 1)
        jsonString
        json = jQuery.parseJSON jsonString
        UtilScraper.get().carGoogleSpreadsheetAjaxCallback json.feed.entry


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

  
  estimateDatetime: (datetimeStr, minutesToSubstructInt) ->
    estimatedMillis = new Number(minutesToSubstructInt) * 1000 * 60
    currMilliSeconds = Date.parse datetimeStr
    estimatedNewTime = currMilliSeconds - estimatedMillis
    date = new Date estimatedNewTime
    minutes = parseInt(date.getMinutes())
    if minutes < 10
      minutes = "0" + minutes
    formattedDate = date.getHours() + ":" + minutes + " " + days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    console.log "Estimatated date formatted: " + formattedDate
    formattedDate

  handleOnChange: (direction, flightNumber) ->
    fromAddress = ($ "input#" + direction + "-" + flightNumber).val()
    targetAirport = ($ "input#" + direction + "-airport-" + flightNumber).val()
    targetDatetime = ($ "input#" + direction + "-datetime-" + flightNumber).val()
    targetDiv = "div#" + direction + "-travelinfo-" + flightNumber
    formattedDatetime = targetDatetime

    if direction == "origin"
      targetCarTravelTime = ($ "input#origin-cartraveltime-" + flightNumber).val()
      arriveBeforeTime = ($ "input#arrive-before").val()
      totalMinutes = parseInt(targetCarTravelTime) + parseInt(arriveBeforeTime)
      #console.log "Total minutes to substract: " + totalMinutes
      formattedDatetime = @estimateDatetime targetDatetime, totalMinutes

    start = (if direction == "origin" then "To" else "From")
    end = (if direction == "origin" then "From" else "To")
    journey = (if direction == "origin" then "departure" else "arrival")
    carTransferTime = "<strong>Car Transfer Time (on " + flightNumber + " " + journey + "): " + formattedDatetime + "</strong><br />"
    carTransferTime = carTransferTime + start + ": " + targetAirport + "<br />"
    carTransferTime = carTransferTime + end + ": " + fromAddress + "<br /><br />"
    ($ targetDiv).html carTransferTime

  handleOnChangeAll: () ->
    ($ "input.flightNumbers").each ->
      console.log "Invoking 'handleOnChange' for flight number: " + $(this).val()
      UtilScraper.get().handleOnChange "origin", $(this).val()
      true

  injectHtml: (uiTemplate, view, htmlElement) ->
    inputForm = Mustache.to_html uiTemplate, view
    htmlElement.prepend inputForm
