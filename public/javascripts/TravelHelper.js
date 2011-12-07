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
    TravelHelper.prototype.carSpreadsheetCallback = function(result) {
      return UtilScraper.get().carGoogleSpreadsheetAjaxCallback(result);
    };
    TravelHelper.prototype.hotelSpreadsheetCallback = function(result) {
      return UtilScraper.get().hotelGoogleSpreadsheetAjaxCallback(result, ac);
    };
    TravelHelper.ac = null;
    TravelHelper.prototype.run = function() {
      var ac, readyScraper, s, scrapers, view, _i, _len;
      scrapers = [];
      scrapers.push(new VirginScraper());
      scrapers.push(new QantasScraper());
      scrapers.push(new JetStarScraper());
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
        UtilScraper.get().getGoogleSpreadsheetAsJson('pgZYLtdPRv51beYTHUIrFWg', 'od6', TravelHelper.prototype.carSpreadsheetCallback);
        ac = readyScraper.accommodation();
        UtilScraper.get().getGoogleSpreadsheetAsJson('pgZYLtdPRv50AK70fqJkQSw', 'od6', TravelHelper.prototype.hotelSpreadsheetCallback);
        ($('input#mobileNumber')).bind('focusout', function() {
          return ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
        });
        return ($('input#mobileNumber')).change(function() {
          return ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
        });
      } else {
        console.log("TravelHelper:: Does not have scraper ready!");
        return ($('body')).prepend("<div align='center'><p><br /><br /><br /><h1 style='color: red !important; padding: 15px;'>Oops! None of the text scrapers are ready. <br />Are you sure you executed the bookmarklet on the right page?</h1></p></div>");
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
