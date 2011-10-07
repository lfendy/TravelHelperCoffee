window.UITemplate = '
<div id="travelplanner" align="left" style="text-align: left; margin: 10px; padding: 0px 20px 20px; background: none repeat scroll 0% 0% white; border: 5px dotted grey;">
  <h1>Travel Planner</h1>

  <div id="contact">
    <h2 style="margin-left: 0 !important">Contact Details for {{passengerName}}</h2>
    <span class="formLabel">mobile:</span>
    <input id="mobileNumber" value="{{mobileNumber}}" />
    <br /><br />
  </div>

  <div id="cars-form">
	<h2 style="margin-left: 0 !important">Cars</h2>
	
	<table border="0" width="660px" cellspacing="1px" cellpadding="2px">
		{{#flights}}
    	<tr>
			<td colspan="3">
				<input type="hidden" id="origin-airport-{{flightNumberNoWS}}" value="{{origin}} Domestic Airport" />
				<input type="hidden" id="destination-airport-{{flightNumberNoWS}}" value="{{destination}} Domestic Airport" />
				<input type="hidden" id="origin-datetime-{{flightNumberNoWS}}" value="{{departureTime}} {{formattedDepartureDate}}" />
				<input type="hidden" id="destination-datetime-{{flightNumberNoWS}}" value="{{arrivalTime}} {{formattedArrivalDate}}" />
			</td>
		</tr>
		<tr>
			<td>to <b>{{origin}} Domestic Airport</b> from</td>
			<td><input onchange="return UtilScraper.get().handleOnChange(\'origin\', \'{{flightNumberNoWS}}\')"  id="origin-{{flightNumberNoWS}}" type="text" size="35" /></td>
			<td>will take <input onchange="return UtilScraper.get().handleOnChange(\'origin\', \'{{flightNumberNoWS}}\')" id="origin-cartraveltime-{{flightNumberNoWS}}" type="text" size="5" value="30" /> minutes</td>
		</tr>
        <tr>
            <td>from <b id="destination-airport-{{flightNumberNoWS}}">{{destination}} Domestic Airport</b> to</td>
            <td colspan="2"><input onchange="" id="" type="text" size="35" /></td>
        </tr>
		{{/flights}}
		<tr>
            <td colspan="3">All cars before flight should arrive <input onchange="return UtilScraper.get().handleOnChange(\'origin\', \'{{flightNumberNoWS}}\')" id="arrive-before" type="text" size="5" value="45" /> minutes early to airports</td>
        </tr>
	</table>

	<div id="car-placeholder">
    	<h2 style="margin-left: 0 !important">Contact Drivers</h2>
        <p id="car-content">Waiting for Google to respond..</p>
    </div>
  </div>

  <div id="email">
    <h2 style="margin-left: 0 !important">Itinerary</h2>
    <b>Flight Booking Reference: </b> {{reservationNumber}}<br />
    -----------------------------------------------------------------------<br /><br />
    Travel Itinerary For:
    <br/>
    <span id="passengerName"> {{passengerName}} </span>
    <span id="mobileNumber"> {{mobileNumber}} </span><br />
    -----------------------------------------------------------------------<br /><br />
    <div id="flights" style="">
    {{#flights}}
      
	  <div id="origin-travelinfo-{{flightNumberNoWS}}"></div>
      
	  <strong>Flight Time {{departureTime}} {{formattedDepartureDate}}</strong><br />
      Flight No: {{airline}} {{flightNumber}}<br />
      Depart: {{departureDate}} {{departureTime}} - {{origin}} Domestic Airport<br />
      Arrive: {{arrivalDate}} {{arrivalTime}} - {{destination}} Domestic Airport
	  
 	  <div id="destination-travelinfo-{{flightNumberNoWS}}"></div>
      
	  <br /><br />
      
	{{/flights}}
    </div>
    -----------------------------------------------------------------------<br /><br />
  </div>' + window.UIFooterTemplate + '</div>'
