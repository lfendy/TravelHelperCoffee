window.UtilScraper = class UtilScraper
  
  instance = null 

  @get: ->
    if not instance?
      instance = new @
      instance.init('UtilScraper')

    instance  

  init: (name = "unknown") ->
    console.log "#{name} initialized"
  
  queryGoogleDistanceMatrix: (sourceAddress, destinationAddress, targetDiv) ->
    ($ "span#" + targetDiv).html "Wait.."
    sourceAddress = sourceAddress + ", Australia"
    destinationAddress = destinationAddress + ", Australia"
    
    if not matrix?
       ($ "span#" + targetDiv).html "Oops! Boo boo :("
       return false
    else
       console.log "Checking distance between [" + sourceAddress + "] and [" + destinationAddress + "]"
    
    matrix.getDistanceMatrix 
      origins: [ sourceAddress ]
      destinations: [ destinationAddress ]
      travelMode: google.maps.TravelMode.DRIVING
      avoidHighways: false
      avoidTolls: false, (json) ->
        UtilScraper.get().parseGoogleMapMatrix json, targetDiv
   
  parseGoogleMapMatrix: (jsonObj, targetDiv) ->
    console.log "Got JSON : " + jsonObj + " and target element: " + targetDiv
    unless jsonObj.status == "OK" || jsonObj.status == google.maps.DistanceMatrixStatus.OK
      #console.log "Error was when trying to query Google distance matrix: " + jsonObj.status
      #($ "span#" + targetDiv).html "Oops! Boo boo :("
    else
      

    console.log "Got JSON object from Google distance matrix: " + jsonObj
    elements = jsonObj.rows[0].elements
    result = elements[0].distance.text + "->" + elements[0].duration.text
    console.log result
    ($ "span#" + targetDiv).html result
    result
      

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
 
  getGoogleSpreadsheetAsJson: (spreadsheetId, gridId, callback) ->
    url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script'
    $.get url, (res) ->
        if res.responseText?
          res = res.responseText
        jsonString = res.substring(res.indexOf("{"), res.lastIndexOf("}") + 1)
        json = jQuery.parseJSON jsonString
        console.log "Parsed JSON string from Google spreadsheet as object: " + json
        eval callback + "(" + json.feed.entry + ")"


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
    spanClass = "none"

    if direction == "origin"
      spanClass = "red"
      targetCarTravelTime = ($ "input#origin-cartraveltime-" + flightNumber).val()
      arriveBeforeTime = ($ "input#arrive-before").val()
      totalMinutes = parseInt(targetCarTravelTime) + parseInt(arriveBeforeTime)
      #console.log "Total minutes to substract: " + totalMinutes
      formattedDatetime = @estimateDatetime targetDatetime, totalMinutes

    start = (if direction == "origin" then "To" else "From")
    end = (if direction == "origin" then "From" else "To")
    journey = (if direction == "origin" then "departure" else "arrival")
    carTransferTime = "<strong>Car Transfer Time (on " + flightNumber + " " + journey + "): <span class='" + spanClass + "'>" + formattedDatetime + "</span></strong><br />"
    carTransferTime = carTransferTime + start + ": " + targetAirport + " International Airport<br />"
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
