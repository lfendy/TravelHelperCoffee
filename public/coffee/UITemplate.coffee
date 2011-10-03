window.UITemplate = '
<div id="travelplanner" style="margin: 10px; padding: 0px 20px 20px; background: none repeat scroll 0% 0% white; border: 5px dotted grey;">
  <h1>travel planner</h1>

  <div id="contact">
    <h2>Contact Details for {{passengerName}}</h2>
    <span class="formLabel">mobile:</span>
    <input id="mobileNumber" value="{{mobileNumber}}" />
    <br/>
  </div>

  <div id="email">
    <h2>Itinerary</h2>
    <b>Flight Booking Reference: </b> {{reservationNumber}}
    <br/>
    -----------------------------------------------------------------------
    <br/>
    Travel Itinerary For:
    <br/>
    <span id="passengerName"> {{passengerName}} </span>
    <span id="mobileNumber"> {{mobileNumber}} </span>
    <br/>
    -----------------------------------------------------------------------
    <div id="flights">
    {{#flights}}
      <b> Flight Time {{departureTime}} {{departureDate}} </b>
      <br/>
      Flight No: {{airline}} {{flightNumber}}
      <br/>
      Depart: {{departureDate}} {{departureTime}} - {{origin}} Domestic Airport
      <br/>
      Arrive: {{arrivalDate}} {{arrivalTime}} - {{destination}} Domestic Airport
      <br/>
    {{/flights}}
    </div>

  </div>

</div>
'
