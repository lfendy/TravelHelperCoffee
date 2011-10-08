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
    UtilScraper.prototype.getGoogleSpreadsheetAsJson = function(spreadsheetId, gridId, target, callback) {
      var url;
      url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script';
      return $.get(url, function(res) {
        var json, jsonString;
        jsonString = res.responseText.substring(res.responseText.indexOf("{"), res.responseText.lastIndexOf("}") + 1);
        jsonString;
        json = jQuery.parseJSON(jsonString);
        return callback.call(target, json.feed.entry);
      });
    };
    UtilScraper.prototype.estimateDatetime = function(datetimeStr, minutesToSubstructInt) {
      var currMilliSeconds, date, estimatedMillis, estimatedNewTime, formattedDate, minutes;
      console.log("Got date: " + datetimeStr + " to substract " + minutesToSubstructInt + " minutes from ");
      estimatedMillis = new Number(minutesToSubstructInt) * 1000 * 60;
      currMilliSeconds = Date.parse(datetimeStr);
      console.log("Current milliseconds: " + currMilliSeconds);
      estimatedNewTime = currMilliSeconds - estimatedMillis;
      console.log("Milliseconds after estimation: " + estimatedNewTime);
      date = new Date(estimatedNewTime);
      console.log("Estimatated new date: " + date);
      minutes = parseInt(date.getMinutes());
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      formattedDate = date.getHours() + ":" + minutes + " " + days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      console.log("Estimatated date formatted: " + formattedDate);
      return formattedDate;
    };
    UtilScraper.prototype.handleOnChange = function(direction, flightNumber) {
      var arriveBeforeTime, formattedDatetime, fromAddress, targetAirport, targetCarTravelTime, targetDatetime, targetDiv, totalMinutes;
      fromAddress = ($("input#" + direction + "-" + flightNumber)).val();
      targetAirport = ($("input#" + direction + "-airport-" + flightNumber)).val();
      targetDatetime = ($("input#" + direction + "-datetime-" + flightNumber)).val();
      targetDiv = "div#" + direction + "-travelinfo-" + flightNumber;
      formattedDatetime = targetDatetime;
      if (flightNumber != null) {
        targetCarTravelTime = ($("input#origin-cartraveltime-" + flightNumber)).val();
        arriveBeforeTime = ($("input#arrive-before")).val();
        totalMinutes = parseInt(targetCarTravelTime) + parseInt(arriveBeforeTime);
        console.log("Total minutes to substract: " + totalMinutes);
        formattedDatetime = this.estimateDatetime(targetDatetime, totalMinutes);
      }
      return ($(targetDiv)).html("<strong>To " + targetAirport + " on " + formattedDatetime + "</strong><br />From: " + fromAddress + "<br /><br />");
    };
    UtilScraper.prototype.handleOnChangeAll = function() {
      return ($("input.flightNumbers")).each(function() {
        console.log("Invoking 'onChange' for flight number: " + $(this).val());
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
