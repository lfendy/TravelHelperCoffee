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
    UtilScraper.prototype.queryGoogleDistanceMatrix = function(sourceAddress, destinationAddress, targetDiv) {
      ($("span#" + targetDiv)).html("Wait..");
      sourceAddress = sourceAddress + ", Australia";
      destinationAddress = destinationAddress + ", Australia";
      if (!(typeof matrix !== "undefined" && matrix !== null)) {
        ($("span#" + targetDiv)).html("Oops! Boo boo :(");
        return false;
      } else {
        console.log("Checking distance between [" + sourceAddress + "] and [" + destinationAddress + "]");
      }
      return matrix.getDistanceMatrix({
        origins: [sourceAddress],
        destinations: [destinationAddress],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false
      }, function(json) {
        return UtilScraper.get().parseGoogleMapMatrix(json, targetDiv);
      });
    };
    UtilScraper.prototype.parseGoogleMapMatrix = function(jsonObj, targetDiv) {
      var elements, result;
      console.log("Got JSON : " + jsonObj + " and target element: " + targetDiv);
      if (!(jsonObj.status === "OK" || jsonObj.status === google.maps.DistanceMatrixStatus.OK)) {} else {

      }
      console.log("Got JSON object from Google distance matrix: " + jsonObj);
      elements = jsonObj.rows[0].elements;
      result = elements[0].distance.text + "->" + elements[0].duration.text;
      console.log(result);
      ($("span#" + targetDiv)).html(result);
      return result;
    };
    UtilScraper.prototype.parseCar = function(cells, i) {
      var c, city, company, contact, phone;
      city = cells[i].content.$t;
      company = cells[i + 1].content.$t;
      contact = cells[i + 2].content.$t;
      phone = cells[i + 3].content.$t;
      c = new Car();
      c.city = city;
      c.company = company;
      c.contact = contact;
      c.phone = phone;
      console.log(city + ' | ' + company + ' | ' + contact + ' | ' + phone);
      return c;
    };
    UtilScraper.prototype.getGoogleSpreadsheetAsJson = function(spreadsheetId, gridId, callback) {
      var url;
      url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script';
      return $.get(url, function(res) {
        var jsonString;
        if (res.responseText != null) {
          res = res.responseText;
        }
        jsonString = res.substring(res.indexOf("{"), res.lastIndexOf("}") + 1);
        console.log("callback: " + callback);
        return callback(jsonString);
      });
    };
    UtilScraper.prototype.carGoogleSpreadsheetAjaxCallback = function(jsonString) {
      var cars, cells, i, json, view;
      json = jQuery.parseJSON(jsonString);
      console.log("Parsed JSON string from Google spreadsheet as object: " + json);
      cells = json.feed.entry;
      cars = [];
      i = 4;
      while (i < cells.length) {
        cars.push(this.parseCar(cells, i));
        i = i + 4;
      }
      console.log(cars);
      view = {
        cars: cars
      };
      ($("p#car-content")).html("");
      return UtilScraper.get().injectHtml(UICarTemplate, view, $("p#car-content"));
    };
    UtilScraper.prototype.hotelGoogleSpreadsheetAjaxCallback = function(jsonString, hostingCity) {
      var cells, hotels, i, json, _results;
      console.log("Hosting city is: " + hostingCity);
      json = jQuery.parseJSON(jsonString);
      console.log("Parsed JSON string from Google hotel spreadsheet as object: " + json);
      cells = json.feed.entry;
      hotels = [];
      console.log(hostingCity);
      i = 4;
      _results = [];
      while (i < cells.length) {
        hotels.push(this.parseHotel(cells, i));
        _results.push(i = i + 4);
      }
      return _results;
    };
    UtilScraper.prototype.parseHotel = function(cells, i) {
      var address, city, h, hotel, phone;
      city = cells[i].content.$t;
      hotel = cells[i + 1].content.$t;
      address = cells[i + 2].content.$t;
      phone = cells[i + 3].content.$t;
      h = new Hotel();
      h.city = city;
      h.hotel = hotel;
      h.address = address;
      h.phone = phone;
      console.log(city + ' | ' + hotel + ' | ' + address + ' | ' + phone);
      return h;
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
      var arriveBeforeTime, carTransferTime, end, formattedDatetime, fromAddress, journey, spanClass, start, targetAirport, targetCarTravelTime, targetDatetime, targetDiv, totalMinutes;
      fromAddress = ($("input#" + direction + "-" + flightNumber)).val();
      targetAirport = ($("input#" + direction + "-airport-" + flightNumber)).val();
      targetDatetime = ($("input#" + direction + "-datetime-" + flightNumber)).val();
      targetDiv = "div#" + direction + "-travelinfo-" + flightNumber;
      formattedDatetime = targetDatetime;
      spanClass = "none";
      if (direction === "origin") {
        spanClass = "red";
        targetCarTravelTime = ($("input#origin-cartraveltime-" + flightNumber)).val();
        arriveBeforeTime = ($("input#arrive-before")).val();
        totalMinutes = parseInt(targetCarTravelTime) + parseInt(arriveBeforeTime);
        formattedDatetime = this.estimateDatetime(targetDatetime, totalMinutes);
      }
      start = (direction === "origin" ? "To" : "From");
      end = (direction === "origin" ? "From" : "To");
      journey = (direction === "origin" ? "departure" : "arrival");
      carTransferTime = "<strong>Car Transfer Time (on " + flightNumber + " " + journey + "): <span class='" + spanClass + "'>" + formattedDatetime + "</span></strong><br />";
      carTransferTime = carTransferTime + start + ": " + targetAirport + " International Airport<br />";
      carTransferTime = carTransferTime + end + ": " + fromAddress + "<br /><br />";
      return ($(targetDiv)).html(carTransferTime);
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
