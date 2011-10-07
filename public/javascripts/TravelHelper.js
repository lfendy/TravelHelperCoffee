(function() {
  var TravelHelper, th;
  window.TravelHelper = TravelHelper = (function() {
    function TravelHelper() {}
    TravelHelper.prototype.createView = function(screenScraper) {
      var flight, flights, passenger, view;
      passenger = screenScraper.passenger();
      flights = screenScraper.flights();
      view = {
        passengerName: passenger.name,
        mobileNumber: passenger.mobileNumber,
        reservationNumber: passenger.reservationNumber,
        flights: (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = flights.length; _i < _len; _i++) {
            flight = flights[_i];
            _results.push(flight.toJSON());
          }
          return _results;
        })()
      };
      return view;
    };
    TravelHelper.prototype.run = function() {
      var fetcher, flight, readyScraper, s, scrapers, view, _i, _j, _len, _len2, _ref;
      scrapers = [];
      scrapers.push(new VirginScraper());
      scrapers.push(new QantasScraper());
      for (_i = 0, _len = scrapers.length; _i < _len; _i++) {
        s = scrapers[_i];
        if (s.isReady()) {
          readyScraper = s;
          console.log("TravelHelper:: Found ready scraper: " + s.name());
        }
      }
      if (readyScraper != null) {
        console.log("TravelHelper:: " + readyScraper.name() + " is starting to scrape..");
        view = this.createView(readyScraper);
        UtilScraper.get().injectHtml(UITemplate, view, $("body"));
        fetcher = new GoogleSpreadsheetFetcher();
        fetcher.getCarGoogleSpreadsheetAsJson();
        ($('input#mobileNumber')).bind('focusout', function() {});
        ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
        ($('input#mobileNumber')).bind('onchange', function() {});
        ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
        _ref = readyScraper.flights();
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          flight = _ref[_j];
          ($("input#pickup-address-from-when-going-" + flight.origin)).change(function() {
            return alert("looped pickup-address-from-when-going-" + flight.origin + " called");
          });
        }
        ($("input#pickup-address-from-when-going-Sydney")).change(function() {
          return alert("default pickup-address-from-when-going-Sydney called");
        });
        return ($("input#pickup-address-from-when-going-Sydney")).bind('onchange', function() {
          return alert("binded pickup-address-from-when-going-Sydney called");
        });
      } else {
        console.log("TravelHelper:: Does not have scraper ready!");
        return ($('body')).prepend("<p><br /><br /><h1 style='color: red !important; padding: 15px;'>Oops! Text scraper is not ready. Contact TW support!</h1></p>");
      }
    };
    return TravelHelper;
  })();
  th = new TravelHelper();
  ($(document)).ready(function() {
    return th.run();
  });
  ($('div.logoVirginBlue')).hide();
}).call(this);
