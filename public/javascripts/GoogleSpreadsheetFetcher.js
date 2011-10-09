(function() {
  var GoogleSpreadsheetFetcher;
  window.GoogleSpreadsheetFetcher = GoogleSpreadsheetFetcher = (function() {
    function GoogleSpreadsheetFetcher() {}
    GoogleSpreadsheetFetcher.prototype.carGoogleSpreadsheetAjaxCallback = function(cells) {
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
    GoogleSpreadsheetFetcher.prototype.getCarGoogleSpreadsheetAsJson = function() {
      UtilScraper.get().getGoogleSpreadsheetAsJson('pgZYLtdPRv51beYTHUIrFWg', 'od6', this, this.carGoogleSpreadsheetAjaxCallback);
      return "Alex";
    };
    GoogleSpreadsheetFetcher.prototype.getTraveltimeFromGoogle = function(from, to) {
      UtilScraper.get().queryGoogleMap(from, to, this, this.traveltimeFromGoogleAjaxCallback);
      return "Alex";
    };
    GoogleSpreadsheetFetcher.prototype.traveltimeFromGoogleAjaxCallback = function(responseText) {
      alert(responseText);
      return console.log(responseText);
    };
    GoogleSpreadsheetFetcher.prototype.parseCar = function(cells, i) {
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
    return GoogleSpreadsheetFetcher;
  })();
}).call(this);
