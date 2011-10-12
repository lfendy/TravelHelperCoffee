(function() {
  var QantasScraper;
  window.QantasScraper = QantasScraper = (function() {
    function QantasScraper() {}
    QantasScraper.prototype.isReady = function() {
      var index;
      index = ($(document)).text().toLowerCase().indexOf("qantas");
      if (index !== -1) {
        console.log('QantasScraper:: QantasScraper is ready for action');
        return true;
      } else {
        console.log('QantasScraper:: Qantascraper is NOT ready for action, the target page is not Qantas');
        return false;
      }
    };
    QantasScraper.prototype.name = function() {
      return "QantasScraper";
    };
    QantasScraper.prototype.makePrettyDate = function(scrapedDate) {
      var components, date, formattedDate, us_date;
      components = [];
      if (scrapedDate.indexOf('-') !== -1) {
        components = scrapedDate.split('-');
      } else {
        components = scrapedDate.split(' ');
      }
      if ((components[3] != null) && components[3].length < 4) {
        components[3] = '20' + components[3];
      }
      us_date = components[2] + '/' + components[0] + ' ' + components[1] + '/' + components[3];
      date = new Date(Date.parse(us_date));
      formattedDate = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      return formattedDate;
    };
    QantasScraper.prototype.passengerName = function() {
      return ($('div#ContactDetails')).find('td').eq(0).text();
    };
    QantasScraper.prototype.mobileNumber = function() {
      return ($("div#ContactDetails")).find("table.pax-contact").find("tr").eq(5).find("td").eq(1).text();
    };
    QantasScraper.prototype.reservationNumber = function() {
      return ($("div#title")).find("h2").text().trim().split(/\s+/).filter(function(word, index) {
        return index === 2;
      }).join('');
    };
    QantasScraper.prototype.passenger = function() {
      var p;
      p = new Passenger();
      p.name = this.passengerName();
      p.mobileNumber = this.mobileNumber();
      p.reservationNumber = this.reservationNumber();
      return p;
    };
    QantasScraper.prototype.flights = function() {
      var raw, result, _i, _len, _ref, _results;
      _ref = $('tr.tr_first');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        raw = _ref[_i];
        _results.push(result = this.parseFlight(raw));
      }
      return _results;
    };
    QantasScraper.prototype.parseFlight = function(raw) {
      var f;
      f = new Flight();
      f.flightNumber = ($(raw)).find('span.flightnumber').text().trim();
      f.flightNumberNoWS = f.flightNumber.replace(/\s+/, '');
      f.departureDate = ($(raw)).find('td').eq(0).text().trim();
      f.formattedDepartureDate = this.makePrettyDate(f.departureDate);
      f.arrivalDate = ($(raw)).find('td').eq(0).text().trim();
      f.formattedArrivalDate = this.makePrettyDate(f.arrivalDate);
      f.departureTime = ($(raw)).find('td').eq(1).text().trim();
      f.arrivalTime = ($(raw)).find('td').eq(3).text().trim();
      f.origin = ($(raw)).find('td').eq(2).text().trim();
      f.destination = ($(raw)).find('td').eq(4).text().trim();
      f.origin = f.origin.replace(/\s+/, '_');
      f.destination = f.destination.replace(/\s+/, '_');
      return f;
    };
    QantasScraper.prototype.accommodation = function() {
      var a, destinationClone, hostingCity, raw;
      a = new Accommodation();
      raw = $('tr.tr_first:eq(0)');
      console.log("Raw: " + raw);
      destinationClone = ($(raw)).find('td').eq(4).text().trim();
      hostingCity = destinationClone.replace(/\s+/, '_');
      console.log("Scraped hosting city: " + hostingCity);
      a.hostingCity = hostingCity;
      a.stayFrom = ($(raw)).find('td').eq(0).text().trim();
      raw = $('tr.tr_first:eq(1)');
      a.stayTo = ($(raw)).find('td').eq(0).text().trim();
      return a;
    };
    return QantasScraper;
  })();
}).call(this);
