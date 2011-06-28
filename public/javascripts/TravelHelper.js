(function() {
  var TravelHelper, th;
  window.TravelHelper = TravelHelper = (function() {
    function TravelHelper() {
      this.uiTemplate = ' \
<div id="travelplanner" style="margin: 10px; padding: 0px 20px 20px; background: none repeat scroll 0% 0% white; border: 5px dotted grey;">\
  <h1>travel planner</h1>\
\
  <div id="contact">\
    <h2>Contact Details for {{passengerName}}</h2>\
    <span class="formLabel">mobile:</span>\
    <input id="mobileNumber" value="{{mobileNumber}}" />\
    <br/>\
  </div>\
\
  <div id="email">\
    <h2>Itinerary</h2>\
    <b>Flight Booking Reference: </b> {{reservationNumber}}\
    <br/>\
    -----------------------------------------------------------------------\
    <br/>\
    Travel Itinerary For:\
    <br/>\
    <span id="passengerName"> {{passengerName}} </span>\
    <span id="mobileNumber"> </span>\
    <br/>\
    -----------------------------------------------------------------------\
    <div id="flights">\
    {{#flights}}\
      <b> Flight Time {{departureTime}} {{departureDate}} </b>\
      <br/>\
      Flight No: {{airline}} {{flightNumber}}\
      <br/>\
      Depart: {{departureDate}} {{departureTime}} - {{origin}} Domestic Airport\
      <br/>\
      Arrive: {{arrivalDate}} {{arrivalTime}} - {{destination}} Domestic Airport\
      <br/>\
    {{/flights}}\
    </div>\
\
  </div>\
\
</div>\
';
    }
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
      var inputForm, v, view;
      v = new VirginScraper();
      view = this.createView(v);
      inputForm = Mustache.to_html(this.uiTemplate, view);
      ($('body')).prepend(inputForm);
      return ($('input#mobileNumber')).bind('focusout', function() {
        return ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
      });
    };
    return TravelHelper;
  })();
  th = new TravelHelper();
  th.run();
  ($('div.logoVirginBlue')).hide();
}).call(this);
