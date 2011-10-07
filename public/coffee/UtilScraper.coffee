window.UtilScraper = class UtilScraper
  
  instance = null 

  @get: ->
    if not instance?
      instance = new @
      instance.init('UtilScraper')

    instance  

  init: (name = "unknown") ->
    console.log "#{name} initialized"

  getGoogleSpreadsheetAsJson: (spreadsheetId, gridId, target, callback) ->
    url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script'
    $.get url, (res) ->
        jsonString = res.responseText.substring(res.responseText.indexOf("{"), res.responseText.lastIndexOf("}") + 1)
        jsonString
        json = jQuery.parseJSON jsonString
        callback.call target, json.feed.entry
  
  handleOnChange: (direction, flightNumber) ->
    targetAirport = ($ "input#" + direction + "-airport-" + flightNumber).val()
    targetDatetime = ($ "input#" + direction + "-datetime-" + flightNumber).val()
    targetDiv = "div#" + direction + "-travelinfo-" + flightNumber
    alert "flightNumber: " + flightNumber + ", targetAirport: " + targetAirport + ", targetDatetime: " + targetDatetime + ", targetDiv: " + targetDiv

  injectHtml: (uiTemplate, view, htmlElement) ->
    inputForm = Mustache.to_html uiTemplate, view
    htmlElement.prepend inputForm
