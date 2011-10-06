window.UITemplate = '
<div id="travelplanner" align="left" style="text-align: left; margin: 10px; padding: 0px 20px 20px; background: none repeat scroll 0% 0% white; border: 5px dotted grey;">
  <h1>Travel Planner</h1>

  <div id="contact">
    <h2>Contact Details for {{passengerName}}</h2>
    <span class="formLabel">mobile:</span>
    <input id="mobileNumber" value="{{mobileNumber}}" />
    <br /><br />
  </div>

  <div id="email">
    <h2>Itinerary</h2>
    <b>Flight Booking Reference: </b> {{reservationNumber}}<br />
    -----------------------------------------------------------------------<br /><br />
    Travel Itinerary For:
    <br/>
    <span id="passengerName"> {{passengerName}} </span>
    <span id="mobileNumber"> {{mobileNumber}} </span><br />
    -----------------------------------------------------------------------<br /><br />
    <div id="flights" style="">
    {{#flights}}
      <strong>Flight Time {{departureTime}} {{formattedDepartureDate}}</strong><br />
      Flight No: {{airline}} {{flightNumber}}<br />
      Depart: {{departureDate}} {{departureTime}} - {{origin}} Domestic Airport<br />
      Arrive: {{arrivalDate}} {{arrivalTime}} - {{destination}} Domestic Airport
      <br /><br />
    {{/flights}}
    </div>
    -----------------------------------------------------------------------<br /><br />
	<div id="car-placeholder">Waiting for Google to reposnd..</div>
  </div>' + window.UIFooterTemplate + '</div>'
