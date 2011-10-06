(function() {
  var VirginScraper;
  window.VirginScraper = VirginScraper = (function() {
    var util;
    util = UtilScraper.get();
    function VirginScraper() {}
    VirginScraper.prototype.isReady = function() {
      var index;
      index = ($(document)).text().toLowerCase().indexOf("virgin");
      if (index !== -1) {
        console.log('VirginScraper:: VirginScraper is ready for action');
        return true;
      } else {
        console.log('VirginScraper:: VirginScraper is NOT ready for action, the target page is not Virgin');
        return false;
      }
    };
    VirginScraper.prototype.name = function() {
      return "VirginScraper";
    };
    VirginScraper.prototype.carGoogleSpreadsheetAjaxCallback = function(cells) {
      var c, carHtml, cars, city, company, contact, i, inputForm, phone, string, view;
      carHtml = "";
      cars = [];
      i = 4;
      while (i < cells.length) {
        city = cells[i].content.$t;
        company = cells[i + 1].content.$t;
        contact = cells[i + 2].content.$t;
        phone = cells[i + 3].content.$t;
        c = new Car();
        c.city = city;
        c.company = company;
        c.contact = contact;
        c.phone = phone;
        cars.push(c);
        string = city + ' | ' + company + ' | ' + contact + ' | ' + phone;
        console.log(string);
        carHtml = carHtml + string + '<br />';
        i = i + 4;
      }
      console.log(cars);
      view = {
        cars: cars
      };
      inputForm = Mustache.to_html(UICarTemplate, view);
      return ($("p#car-content")).html(inputForm);
    };
    VirginScraper.prototype.getCarGoogleSpreadsheetAsJson = function() {
      util.getGoogleSpreadsheetAsJson('pgZYLtdPRv51beYTHUIrFWg', 'od6', this, this.carGoogleSpreadsheetAjaxCallback);
      return "Alex";
    };
    VirginScraper.prototype.makePrettyDate = function(scrapedDate) {
      var components, date, formattedDate, us_date;
      components = [];
      if (scrapedDate.indexOf('-') !== -1) {
        components = scrapedDate.split('-');
      } else {
        components = scrapedDate.split(' ');
      }
      if ((components[2] != null) && components[2].length < 4) {
        components[2] = '20' + components[2];
      }
      us_date = components[1] + '/' + components[0] + '/' + components[2];
      date = new Date(Date.parse(us_date));
      formattedDate = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      return formattedDate;
    };
    VirginScraper.prototype.passengerName = function() {
      return ($('td.itineraryGuestBaggageGuestHeadingWithButton')).find('span').eq(0).text().split(/\s+/).filter(function(word, index) {
        return index > 0;
      }).join(' ');
    };
    VirginScraper.prototype.mobileNumber = function() {
      var _ref;
      return (_ref = ($('div#BookingConfirmationMain')).find('tr').eq(1).find('td').eq(3).html()) != null ? _ref.split(/<br.*?>/g)[0] : void 0;
    };
    VirginScraper.prototype.reservationNumber = function() {
      return ($('td.reservationnumber')).text().trim();
    };
    VirginScraper.prototype.parseFlight = function(raw) {
      var destinationClone, f, originClone;
      f = new Flight();
      f.flightNumber = ($(raw)).find('td.flightContents').eq(0).text();
      f.departureDate = ($(raw)).find('td.flightDate').text();
      f.formattedDepartureDate = this.makePrettyDate(f.departureDate);
      f.arrivalDate = ($(raw)).find('td.flightDate').text();
      f.departureTime = ($(raw)).find('span.flightTimeTerminus').eq(0).text().replace(' PM', '').replace(' AM', '');
      f.arrivalTime = ($(raw)).find('span.flightTimeTerminus').eq(1).text().replace(' PM', '').replace(' AM', '');
      originClone = ($(raw)).find('td.flightContents').eq(1).clone();
      destinationClone = ($(raw)).find('td.flightContents').eq(2).clone();
      originClone.find('span.flightTimeTerminus').remove();
      destinationClone.find('span.flightTimeTerminus').remove();
      f.origin = originClone.text().trim();
      f.destination = destinationClone.text().trim();
      return f;
    };
    VirginScraper.prototype.flights = function() {
      var raw, result, _i, _len, _ref, _results;
      _ref = $('div.passengerDetailsFrame');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        raw = _ref[_i];
        _results.push(result = this.parseFlight(raw));
      }
      return _results;
    };
    VirginScraper.prototype.passenger = function() {
      var p;
      p = new Passenger();
      p.name = this.passengerName();
      p.mobileNumber = this.mobileNumber();
      p.reservationNumber = this.reservationNumber();
      return p;
    };
    return VirginScraper;
  })();
}).call(this);
