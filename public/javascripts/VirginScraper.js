(function() {
  var Flight, Passenger, VirginScraper;
  window.Flight = Flight = (function() {
    function Flight() {}
    return Flight;
  })();
  window.Passenger = Passenger = (function() {
    function Passenger() {}
    return Passenger;
  })();
  window.VirginScraper = VirginScraper = (function() {
    function VirginScraper() {}
    VirginScraper.prototype.passengerName = function() {
      return ($('td.itineraryGuestBaggageNameColumn')).text();
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
      f.airline = 'Virgin Airlines';
      f.flightNumber = ($(raw)).find('td.flightContents').eq(0).text();
      f.departureDate = ($(raw)).find('td.flightDate').text();
      f.arrivalDate = ($(raw)).find('td.flightDate').text();
      f.departureTime = ($(raw)).find('span.flightTimeTerminus').eq(0).text();
      f.arrivalTime = ($(raw)).find('span.flightTimeTerminus').eq(1).text();
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
