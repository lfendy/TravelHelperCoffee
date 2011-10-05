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
