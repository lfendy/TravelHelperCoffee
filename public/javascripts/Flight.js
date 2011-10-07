(function() {
  var Flight;
  window.Flight = Flight = (function() {
    function Flight() {}
    Flight.prototype.toJSON = function() {
      return {
        departureDate: this.departureDate,
        formattedDepartureDate: this.formattedDepartureDate,
        formattedArrivalDate: this.formattedArrivalDate,
        departureTime: this.departureTime,
        arrivalDate: this.arrivalDate,
        arrivalTime: this.arrivalTime,
        origin: this.origin,
        destination: this.destination,
        airline: 'Virgin Airlines',
        flightNumber: this.flightNumber,
        flightNumberNoWS: this.flightNumberNoWS
      };
    };
    return Flight;
  })();
}).call(this);
