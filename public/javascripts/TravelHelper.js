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
      var readyScraper, s, scrapers, view, _i, _len;
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
        this.getCarGoogleSpreadsheetAsJson();
        ($('input#mobileNumber')).bind('focusout', function() {});
        ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
        ($('input#mobileNumber')).bind('change', function() {});
        return ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
      } else {
        console.log("TravelHelper:: Does not have scraper ready!");
        return ($('body')).prepend("<p><br /><br /><h1 style='font-color: red'>Oops! Text scraper is not ready. Contact TW support!</h1></p>");
      }
    };
    TravelHelper.prototype.carGoogleSpreadsheetAjaxCallback = function(cells) {
      var cars, i, view;
      cars = [];
      i = 4;
      while (i < cells.length) {
        cars.push(this.parseCar(cells, i));
        i = i + 4;
      }
      console.log(cars);
      view = {
        cars: cars
      };
      ($("p#car-content")).html("");
      return UtilScraper.get().injectHtml(UICarTemplate, view, $("p#car-content"));
    };
    TravelHelper.prototype.getCarGoogleSpreadsheetAsJson = function() {
      UtilScraper.get().getGoogleSpreadsheetAsJson('pgZYLtdPRv51beYTHUIrFWg', 'od6', this, this.carGoogleSpreadsheetAjaxCallback);
      return "Alex";
    };
    TravelHelper.prototype.parseCar = function(cells, i) {
      var c, city, company, contact, phone;
      city = cells[i].content.$t;
      company = cells[i + 1].content.$t;
      contact = cells[i + 2].content.$t;
      phone = cells[i + 3].content.$t;
      c = new Car();
      c.city = city;
      c.company = company;
      c.contact = contact;
      c.phone = phone;
      console.log(city + ' | ' + company + ' | ' + contact + ' | ' + phone);
      return c;
    };
    return TravelHelper;
  })();
  th = new TravelHelper();
  ($(document)).ready(function() {
    return th.run();
  });
  ($('div.logoVirginBlue')).hide();
}).call(this);
