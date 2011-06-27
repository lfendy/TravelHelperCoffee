(function() {
  var Flight, VirginScraper;
  window.Flight = Flight = (function() {
    function Flight() {
      this.departureDate;
      this.departureTime;
      this.origin;
      this.arrivalDate;
      this.arrivalTime;
      this.destination;
    }
    return Flight;
  })();
  window.VirginScraper = VirginScraper = (function() {
    function VirginScraper() {}
    VirginScraper.prototype.passengerName = function() {
      return ($('td.itineraryGuestBaggageNameColumn')).text();
    };
    VirginScraper.prototype.parseFlight = function(raw) {
      var f;
      f = new Flight();
      f.flightNumber = ($(raw)).find('td.flightContents').eq(0).text();
      f.departureDate = ($(raw)).find('td.flightDate').text();
      f.arrivalDate = ($(raw)).find('td.flightDate').text();
      f.departureTime = ($(raw)).find('span.flightTimeTerminus').eq(0).text();
      f.arrivalTime = ($(raw)).find('span.flightTimeTerminus').eq(1).text();
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
    return VirginScraper;
  })();
}).call(this);
