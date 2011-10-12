window.UITemplate = '

<style type="text/css">

body, td, th, p, ul, input, select {
    font-family: verdana,helvetica,arial,sans-serif !important;
    font-size: 12px !important;
}

h2 {
	margin-left: 0 !important;
	font-size: 18px;
	font-weight: bold;
}

#car-placeholder table {
	border-collapse: collapse;
}

#car-placeholder tr {
	border: 1px gray solid;
}

#car-placeholder td {
	padding: 3px;
}

table tr th {
	color: #000 !important;
	font-weight: bold !important;
	height: 2em !important;
	padding: 2px 4px !important;
	text-align: left !important;
	white-space: nowrap !important;
}

#travelplanner {
	text-align: left;
	margin: 10px;
	padding: 0px 20px 20px;
	background: none repeat scroll 0% 0% white;
	border: 5px dotted grey;
}

#cars-form,#email,#itenary-footer, #hotels-form {
	border: 1px #cccccc solid;
	background-color: #F2F2F2;
	padding: 20px;
	margin-bottom: 20px;
	width: 90%;
}

span.green {
	color: green;
}

span.red {
	color: red;
}

select {
    border: 1px solid gray !important;
    color: #373D3F !important;
    font-family: Tahoma,Verdana,Arial,Helvetica,sans-serif !important;
    font-size: 100% !important;
    padding: 3px !important;
    width: 180px !important;
    height: 27px !important;
}

select#payment-status {
    width: 80px !important;                                                                                                                                                      
}
</style>


<div id="travelplanner" align="left">
  <h1>Travel Planner</h1>

  <div id="contact">
    <h2>Contact Details for {{passengerName}}</h2>
    <span class="formLabel">mobile:</span>
    <input id="mobileNumber" value="{{mobileNumber}}" />
    <br /><br />
  </div>

  <div id="hotels-form">
    <h2>Accomodation</h2>
    
  </div>

  <div id="cars-form">
	<h2>Cars</h2>
	
	<table border="0" width="95%" cellspacing="1px" cellpadding="2px">
		{{#flights}}
    	<tr>
			<td colspan="4">
				<input type="hidden" class="flightNumbers" value="{{flightNumberNoWS}}" />
				<input type="hidden" id="origin-airport-{{flightNumberNoWS}}" value="{{origin}}" />
				<input type="hidden" id="destination-airport-{{flightNumberNoWS}}" value="{{destination}}" />
				<input type="hidden" id="origin-datetime-{{flightNumberNoWS}}" value="{{departureTime}} {{formattedDepartureDate}}" />
				<input type="hidden" id="destination-datetime-{{flightNumberNoWS}}" value="{{arrivalTime}} {{formattedArrivalDate}}" />
			</td>
		</tr>
		<tr>
			<td>To <b>{{origin}} International Airport</b> from</td>
			<td><input onchange="if ($(this).val() != null && $(this).val() != \'\') { $(\'input#btn-traveltime-{{flightNumberNoWS}}\').removeAttr(\'disabled\'); }  else { $(\'input#btn-traveltime-{{flightNumberNoWS}}\').attr(\'disabled\', \'disabled\'); }  return UtilScraper.get().handleOnChange(\'origin\', \'{{flightNumberNoWS}}\')"  id="origin-{{flightNumberNoWS}}" type="text" size="35" /></td>
			<td>will take <input onchange="return UtilScraper.get().handleOnChange(\'origin\', \'{{flightNumberNoWS}}\')" id="origin-cartraveltime-{{flightNumberNoWS}}" type="text" size="5" value="30" /> mins</td>
			<td width="250px"><input disabled="disabled" value="Get travel time" onclick="return UtilScraper.get().queryGoogleDistanceMatrix($(\'input#origin-{{flightNumberNoWS}}\').val(), airportAddresses[$(\'input#origin-airport-{{flightNumberNoWS}}\').val()], \'google-response-{{flightNumberNoWS}}\');" type="button" id="btn-traveltime-{{flightNumberNoWS}}" />&nbsp;&nbsp;<b><span id="google-response-{{flightNumberNoWS}}"></span></b></td>
		</tr>
        <tr>
            <td>From <b id="destination-airport-{{flightNumberNoWS}}">{{destination}} International Airport</b> to</td>
            <td colspan="3"><input id="destination-{{flightNumberNoWS}}" onchange="return UtilScraper.get().handleOnChange(\'destination\', \'{{flightNumberNoWS}}\')" type="text" size="35" /></td>
        </tr>
		{{/flights}}
		<tr>
            <td>All cars before flight should arrive</td>
			<td colspan="3"><input onchange="return UtilScraper.get().handleOnChangeAll()" id="arrive-before" type="text" size="5" value="45" /> minutes early to airports</td>
		</tr>
	</table>

	<div id="car-placeholder">
    	<h2>Contact Drivers</h2>
        <p id="car-content">Waiting for Google to respond..</p>
    </div>
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
    <div id="flights">
    {{#flights}}
      
	  <div id="origin-travelinfo-{{flightNumberNoWS}}"></div>
      
	  <strong>Flight Time <span class="green">{{departureTime}} {{formattedDepartureDate}}</span></strong><br />
      Flight No: {{airline}} {{flightNumber}}<br />
      Depart: {{departureDate}} {{departureTime}} - {{origin}} International Airport<br />
      Arrive: {{arrivalDate}} {{arrivalTime}} - {{destination}} International Airport
	  <br /><br />
	  <div class="accomodation-info"></div>
 	  <div id="destination-travelinfo-{{flightNumberNoWS}}"></div>
      
	{{/flights}}
    </div>
  </div>' + window.UIFooterTemplate + '</div>'
