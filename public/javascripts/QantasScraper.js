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
      f.departureDate = ($(raw)).find('td').eq(0).text().trim();
      f.arrivalDate = ($(raw)).find('td').eq(0).text().trim();
      f.departureTime = ($(raw)).find('td').eq(1).text().trim();
      f.arrivalTime = ($(raw)).find('td').eq(3).text().trim();
      f.origin = ($(raw)).find('td').eq(2).text().trim();
      f.destination = ($(raw)).find('td').eq(4).text().trim();
      return f;
    };
    return QantasScraper;
  })();
}).call(this);
