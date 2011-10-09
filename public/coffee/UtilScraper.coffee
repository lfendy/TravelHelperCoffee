window.UtilScraper = class UtilScraper
  
  instance = null 

  @get: ->
    if not instance?
      instance = new @
      instance.init('UtilScraper')

    instance  

  init: (name = "unknown") ->
    console.log "#{name} initialized"

  queryGoogleMap: (sourceAddress, destinationAddress, target, callback) ->
    sourceAddress = sourceAddress + ", Australia"
    destinationAddress = destinationAddress + ", Australia"
    url = 'http://maps.google.com/maps?f=d&hl=en&geocode=&time=&date=&ttype=&saddr=' + sourceAddress + '&daddr=' + destinationAddress
    url = 'http://maps.googleapis.com/maps/api/distancematrix/json?origins=274+Ballarat+road+Footscray+3011+Australia&destinations=12-32+Pecks+road+Sydenham+3037+Australia&mode=driving&language=en-US&sensor=false'
    console.log url
    $.get url, (res) ->
        console.log "About to call callback after GET"
        callback.call target, res.responseText

    $.getJSON url, (res) ->
        console.log "About to call callback after JSON"
        callback.call target, res.responseText

  getGoogleSpreadsheetAsJson: (spreadsheetId, gridId, target, callback) ->
    url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script'
    $.get url, (res) ->
        jsonString = res.responseText.substring(res.responseText.indexOf("{"), res.responseText.lastIndexOf("}") + 1)
        jsonString
        json = jQuery.parseJSON jsonString
        callback.call target, json.feed.entry
  
  estimateDatetime: (datetimeStr, minutesToSubstructInt) ->
    #console.log "Got date: " + datetimeStr + " to substract " + minutesToSubstructInt + " minutes from "
    estimatedMillis = new Number(minutesToSubstructInt) * 1000 * 60
    currMilliSeconds = Date.parse datetimeStr
    #console.log "Current milliseconds: " + currMilliSeconds
    estimatedNewTime = currMilliSeconds - estimatedMillis
    #console.log "Milliseconds after estimation: " + estimatedNewTime
    date = new Date estimatedNewTime
    #console.log "Estimatated new date: " + date
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
    #alert "targetCarTravelTime: " + targetCarTravelTime + ", targetAirport: " + targetAirport + ", targetDatetime: " + targetDatetime + ", targetDiv: " + targetDiv
    ($ targetDiv).html "<strong>" + start + " " + targetAirport + " on " + formattedDatetime + "</strong><br />" + end + ": " + fromAddress + "<br /><br />"

  handleOnChangeAll: () ->
    ($ "input.flightNumbers").each ->
      console.log "Invoking 'handleOnChange' for flight number: " + $(this).val()
      UtilScraper.get().handleOnChange "origin", $(this).val()
      true

  injectHtml: (uiTemplate, view, htmlElement) ->
    inputForm = Mustache.to_html uiTemplate, view
    htmlElement.prepend inputForm
