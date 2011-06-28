(function() {
  var Flight, VirginScraper;
  window.Flight = Flight = (function() {
    function Flight() {}
    return Flight;
  })();
  window.VirginScraper = VirginScraper = (function() {
    function VirginScraper() {}
    VirginScraper.prototype.passengerName = function() {
      return ($('td.itineraryGuestBaggageNameColumn')).text();
    };
    VirginScraper.prototype.mobileNumber = function() {
      return $('div#BookingConfirmationMain').find('tr').eq(1).find('td').eq(3).html().split(/<br.*?>/g)[0];
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
    return VirginScraper;
  })();
}).call(this);
