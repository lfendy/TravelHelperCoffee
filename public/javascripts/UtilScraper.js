(function() {
  var UtilScraper;
  window.UtilScraper = UtilScraper = (function() {
    var instance;
    function UtilScraper() {}
    instance = null;
    UtilScraper.get = function() {
      if (!(instance != null)) {
        instance = new this;
        instance.init('UtilScraper');
      }
      return instance;
    };
    UtilScraper.prototype.init = function(name) {
      if (name == null) {
        name = "unknown";
      }
      return console.log("" + name + " initialized");
    };
    UtilScraper.prototype.queryGoogleMap = function(sourceAddress, destinationAddress, targetDiv) {
      var service;
      ($(targetDiv)).html("Wait..");
      service = new google.maps.DistanceMatrixService;
      return service.getDistanceMatrix({
        origins: [sourceAddress],
        destinations: [destinationAddress],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        return UtilScraper.get().parseGoogleMapMatrix(response, status, targetDiv);
      });
    };
    UtilScraper.prototype.parseGoogleMapMatrix = function(response, status, targetDiv) {
      var elements, result;
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert("Error was when trying to query Google maps: " + status);
        return ($(targetDiv)).html("Oops! :(");
      } else {
        console.log(response);
        elements = response.rows[0].elements;
        result = elements[0].distance.text + "->" + elements[0].duration.text;
        console.log(result);
        return ($(targetDiv)).html(result);
      }
    };
    UtilScraper.prototype.getGoogleSpreadsheetAsJson = function(spreadsheetId, gridId, target, callback) {
      var url;
      url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script';
      return $.get(url, function(res) {
        var json, jsonString;
        alert(res);
        jsonString = res.substring(res.indexOf("{"), res.lastIndexOf("}") + 1);
        jsonString;
        json = jQuery.parseJSON(jsonString);
        return callback.call(target, json.feed.entry);
      });
    };
    UtilScraper.prototype.estimateDatetime = function(datetimeStr, minutesToSubstructInt) {
      var currMilliSeconds, date, estimatedMillis, estimatedNewTime, formattedDate, minutes;
      estimatedMillis = new Number(minutesToSubstructInt) * 1000 * 60;
      currMilliSeconds = Date.parse(datetimeStr);
      estimatedNewTime = currMilliSeconds - estimatedMillis;
      date = new Date(estimatedNewTime);
      minutes = parseInt(date.getMinutes());
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      formattedDate = date.getHours() + ":" + minutes + " " + days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      console.log("Estimatated date formatted: " + formattedDate);
      return formattedDate;
    };
    UtilScraper.prototype.handleOnChange = function(direction, flightNumber) {
      var arriveBeforeTime, end, formattedDatetime, fromAddress, start, targetAirport, targetCarTravelTime, targetDatetime, targetDiv, totalMinutes;
      fromAddress = ($("input#" + direction + "-" + flightNumber)).val();
      targetAirport = ($("input#" + direction + "-airport-" + flightNumber)).val();
      targetDatetime = ($("input#" + direction + "-datetime-" + flightNumber)).val();
      targetDiv = "div#" + direction + "-travelinfo-" + flightNumber;
      formattedDatetime = targetDatetime;
      if (direction === "origin") {
        targetCarTravelTime = ($("input#origin-cartraveltime-" + flightNumber)).val();
        arriveBeforeTime = ($("input#arrive-before")).val();
        totalMinutes = parseInt(targetCarTravelTime) + parseInt(arriveBeforeTime);
        formattedDatetime = this.estimateDatetime(targetDatetime, totalMinutes);
      }
      start = (direction === "origin" ? "To" : "From");
      end = (direction === "origin" ? "From" : "To");
      return ($(targetDiv)).html("<strong>" + start + " " + targetAirport + " on " + formattedDatetime + "</strong><br />" + end + ": " + fromAddress + "<br /><br />");
    };
    UtilScraper.prototype.handleOnChangeAll = function() {
      return ($("input.flightNumbers")).each(function() {
        console.log("Invoking 'handleOnChange' for flight number: " + $(this).val());
        UtilScraper.get().handleOnChange("origin", $(this).val());
        return true;
      });
    };
    UtilScraper.prototype.injectHtml = function(uiTemplate, view, htmlElement) {
      var inputForm;
      inputForm = Mustache.to_html(uiTemplate, view);
      return htmlElement.prepend(inputForm);
    };
    return UtilScraper;
  })();
}).call(this);
