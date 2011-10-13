(function() {
  var JetStarScraper;
  window.JetStarScraper = JetStarScraper = (function() {
    function JetStarScraper() {}
    JetStarScraper.prototype.isReady = function() {
      var index;
      index = ($(document)).text().toLowerCase().indexOf("jetstar");
      if (index !== -1) {
        console.log('JetStarScraper:: JetStarScraper is ready for action');
        return true;
      } else {
        console.log('JetStarScraper:: JetStarScraper is NOT ready for action, the target page is not JetStar');
        return false;
      }
    };
    JetStarScraper.prototype.name = function() {
      return "JetStarScraper";
    };
    JetStarScraper.prototype.makePrettyDate = function(scrapedDate) {};
    JetStarScraper.prototype.passengerName = function() {};
    JetStarScraper.prototype.mobileNumber = function() {};
    JetStarScraper.prototype.reservationNumber = function() {};
    JetStarScraper.prototype.passenger = function() {
      var p;
      p = new Passenger();
      p.name = this.passengerName();
      p.mobileNumber = this.mobileNumber();
      p.reservationNumber = this.reservationNumber();
      return p;
    };
    JetStarScraper.prototype.flights = function() {
      var raw, result, _i, _len, _ref, _results;
      _ref = $('blah-blah');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        raw = _ref[_i];
        _results.push(result = this.parseFlight(raw));
      }
      return _results;
    };
    JetStarScraper.prototype.parseFlight = function(raw) {
      var f;
      f = new Flight();
      f.airline = "JetStar";
      return f;
    };
    JetStarScraper.prototype.accommodation = function() {
      var a;
      a = new Accommodation();
      return a;
    };
    return JetStarScraper;
  })();
}).call(this);
