(function() {
  var TravelHelper, th;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.TravelHelper = TravelHelper = (function() {
    function TravelHelper() {
      this.uiTemplate = ' \
<div id="travelplanner">\
  <h1>travel planner</h1>\
\
  <div id="contact">\
    <h2>Contact Details for {{passengerName}}</h2>\
    <span class="formLabel">mobile:</span>\
    <input id="mobileNumber" value="{{mobileNumber}} />\
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
      var flights, passenger, view;
      passenger = screenScraper.passenger();
      flights = screenScraper.flights();
      return view = {
        passengerName: passenger.name,
        mobileNumber: passenger.mobileNumber,
        reservationNumber: passenger.reservationNumber,
        flights: [{}]
      };
    };
    return TravelHelper;
  })();
  ({
    run: __bind(function() {
      var inputForm, v, view;
      v = new VirginScraper();
      view = {
        passengerName: v.passengerName()
      };
      inputForm = Mustache.to_html(this.uiTemplate, view);
      return ($('body')).prepend(inputForm);
    }, this)
  });
  th = new TravelHelper();
  th.run();
}).call(this);
