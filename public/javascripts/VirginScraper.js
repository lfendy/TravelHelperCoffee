(function() {
  var VirginScraper;
  window.VirginScraper = VirginScraper = (function() {
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
      return ($('div#BookingConfirmationMain')).find('tr:eq(0)').find('td:eq(3)').text().trim().replace('+61-', '');
    };
    VirginScraper.prototype.reservationNumber = function() {
      return ($('td.reservationnumber')).text().trim();
    };
    VirginScraper.prototype.parseFlight = function(raw) {
      var destinationClone, f, originClone;
      f = new Flight();
      f.airline = "Virgin Airlines";
      f.flightNumber = ($(raw)).find('td.flightContents').eq(0).text();
      f.flightNumberNoWS = f.flightNumber.replace(/\s+/, '');
      f.departureDate = ($(raw)).find('td.flightDate').text();
      f.formattedDepartureDate = this.makePrettyDate(f.departureDate);
      f.arrivalDate = ($(raw)).find('td.flightDate').text();
      f.formattedArrivalDate = this.makePrettyDate(f.arrivalDate);
      f.departureTime = ($(raw)).find('span.flightTimeTerminus').eq(0).text().replace('am', '').replace('pm', '').replace('AM', '').replace('PM', '').trim();
      f.arrivalTime = ($(raw)).find('span.flightTimeTerminus').eq(1).text().replace('am', '').replace('pm', '').replace('AM', '').replace('PM', '').trim();
      originClone = ($(raw)).find('td.flightContents').eq(1).clone();
      destinationClone = ($(raw)).find('td.flightContents').eq(2).clone();
      originClone.find('span.flightTimeTerminus').remove();
      destinationClone.find('span.flightTimeTerminus').remove();
      f.origin = originClone.text().trim();
      f.origin = f.origin.replace(/\s+/, '_');
      f.destination = destinationClone.text().trim();
      f.destination = f.destination.replace(/\s+/, '_');
      return f;
    };
    VirginScraper.prototype.accommodation = function() {
      var a, destinationClone, hostingCity, raw;
      a = new Accommodation();
      raw = $('div.passengerDetailsFrame:eq(0)');
      console.log("Raw: " + raw);
      destinationClone = ($(raw)).find('td.flightContents').eq(2).clone();
      destinationClone.find('span.flightTimeTerminus').remove();
      hostingCity = destinationClone.text().trim();
      hostingCity = hostingCity.replace(/\s+/, '_');
      console.log("Scraped hosting city: " + hostingCity);
      a.hostingCity = hostingCity;
      a.stayFrom = ($(raw)).find('td.flightDate').text();
      raw = $('div.passengerDetailsFrame:eq(1)');
      a.stayTo = ($(raw)).find('td.flightDate').text();
      return a;
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
