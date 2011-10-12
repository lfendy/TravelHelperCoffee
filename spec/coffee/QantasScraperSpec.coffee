injectElement = (element) ->
  jasmine.getFixtures().set element

#sample htmls

htmlElementWithPassengerName = (name) ->
  '<div id="ContactDetails" class="paxRecap">
	<table>
		<tbody>
			<tr>
				<td>##NAME##</td>
			</tr>
		</tbody>
	</table>
  </div>'.replace('##NAME##', name)

htmlElementWithMobileNumber = (number) ->
  '<div class="paxRecap" id="ContactDetails">
	<h2>Contact Details</h2>
	<div class="panel">
		<table cellspacing="0" class="pax-details">
			<colgroup>
				<col class="first">
				<col class="second">
				<col class="third">
			</colgroup>
			<tbody>
				<tr>
					<th>Name</th>
					<th>Frequent Flyer No.</th>
					<th>Special Requests</th>
				</tr>
				<tr class="first_pax">
					<td>Mr Ryan Moffat</td>
					<td>QF&nbsp;8240922</td>
					<td></td>
				</tr>
			</tbody>
		</table>
		<table cellspacing="0" class="pax-contact">
			<tbody>
				<tr>
					<th colspan="2">Booking Contact</th>
				</tr>
				<tr>
					<td colspan="2"><strong> Mr Ryan Moffat </strong></td>
				</tr>
				<tr>
					<td class="nowrap">Daytime phone:</td>
					<td width="80%">0404 501 028</td>
				</tr>
				<tr>
					<td class="nowrap">Evening phone:</td>
					<td>0404 501 028</td>
				</tr>
				<tr>
					<td class="nowrap">Destination phone:</td>
					<td>0404 501 028</td>
				</tr>
				<tr>
					<td class="nowrap">Mobile phone:</td>
					<td>##NUM##</td>
				</tr>
				<tr>
					<td class="nowrap">E-mail:</td>
					<td><span id="idToCut"> oztravel@thoughtworks.com</span>
					</td>
				</tr>
				<tr>
					<td>ABN:</td>
					<td><span>99088279761</span>
					</td>
				</tr>
			</tbody>
		</table>
		<br class="clear">
	</div>
  </div>'.replace('##NUM##', number)

htmlElementWithReservationNumber = (number) ->
  '<div id="title">
	<h1>Manage Your Booking</h1>
	<h2>
		Booking reference: <em class="">##NUM##</em>
	</h2>
</div>'.replace('##NUM##', number)

htmlElementWithPageTitle = (title) ->
  '<form
	action="http://www.##TITLE##.com.au/travel/airlines/your-booking/global/en"
	method="post" name="NEW_CAR_SEARCH_FACADE_FORM">
	<input type="hidden"
		value="70765A6C4473A6DF2414480357459359035D99847FC46BF7277FF182F86F0168"
		name="ENC"> <input type="hidden" value="1" name="ENCT">
</form>'.replace('##TITLE##', title)

htmlElementWithFlightDetails = (flight) ->
  '<div id="YourFlights" class="flightsRecap">
	<h2>
		<a
			href="http://www.qantas.com.au/travel/airlines/conditions-carriage/global/en"
			target="_blank" class="h2link"> Terms And Conditions of Carriage
		</a> Your Flights
	</h2>
	<div class="nobg">
		<table cellspacing="0" id="cols_10" class="full">
			<tbody>
				<tr class="tr_first greyOn" id="idFlightOutFirst_col10">
					<td>##FLIGHT_DATE##</td>
					<td><strong>##DEPARTURE_TIME##</strong>
					</td>
					<td>##ORIGIN##</td>
					<td><strong>##ARRIVAL_TIME##</strong>
					</td>
					<td>##DESTINATION##</td>
					<td><a title="" class="logo"> <span class="wcaginfo">Qantas
								flight</span> <img title="" alt="QF"
							src="qf_v1.1_ui_cr4673263_13_230911/img/airlinesicons/QF.gif">
							<span class="flightnumber">##FLIGHT_NUMBER##</span> </a></td>
					<td class="aligncenter">3</td>
					<td id="fareConditionFlightOutFirst">Flexi Saver</td>
					<td class="checkin">30 minutes <br>before departure</td>
					<td class="baggage">Included:<br> 1 piece<br
						class="tweak">
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>'.replace('##FLIGHT_DATE##',flight.departureDate)
        .replace('##FLIGHT_NUMBER##',flight.flightNumber)
        .replace('##DEPARTURE_TIME##',flight.departureTime)
        .replace('##ARRIVAL_TIME##',flight.arrivalTime)
        .replace('##ORIGIN##',flight.origin)
        .replace('##DESTINATION##',flight.destination)


setupWebpageTitle = (title) -> injectElement htmlElementWithPageTitle title
setupPassengerName = (name) -> injectElement htmlElementWithPassengerName name
setupMobileNumber = (number) -> injectElement htmlElementWithMobileNumber number
setupReservationNumber = (number) -> injectElement htmlElementWithReservationNumber number
setupFlightDetails = (flight) -> injectElement htmlElementWithFlightDetails flight

describe "QantasScraper", ->
  it "should check whether scraper is ready for scraping", ->
    setupWebpageTitle 'Qantas'
    q = new QantasScraper()
    (expect q.isReady()).toEqual true

  it "should scrape passenger name", ->
    setupPassengerName 'John Doe'
    q = new QantasScraper()
    (expect q.passengerName()).toEqual 'John Doe'

  it "should scrape guest mobile number", ->
    setupMobileNumber '+61-0430123456'
    q = new QantasScraper()
    (expect q.mobileNumber()).toEqual '+61-0430123456'

  it "should expand scraped date into a pretty looking format", ->
    v = new QantasScraper()
    (expect v.makePrettyDate('Tue 04 Oct 11')).toEqual 'Tuesday 4 October 2011'

  it "should scrape reservation number", ->
    setupReservationNumber '6C82U6'
    q = new QantasScraper()
    (expect q.reservationNumber()).toEqual '6C82U6'

  it "should populate scraped data to Passenger", ->
    q = new QantasScraper()
    p = q.passenger()
    (expect p instanceof Passenger).toEqual true

  describe "when parsing flight details", ->
    beforeEach ->
      flight = new Flight()
      flight.flightNumber  = 'QF467'
      flight.departureDate = '20/06/2011'
      flight.arrivalDate   = '20/06/2011'
      flight.departureTime = '6:00 AM'
      flight.arrivalTime   = '7:30 AM'                                                                                                                                            
      flight.origin        = 'Sydney'
      flight.destination   = 'Brisbane'
      setupFlightDetails flight
      raw = ($ 'tr.tr_first')
      q = new QantasScraper()
      @flight = q.parseFlight raw

    it "should return correct flight number", ->
      (expect @flight.flightNumber).toEqual 'QF467'

    it "should return correct departure date", ->
      (expect @flight.departureDate).toEqual '20/06/2011'

    it "should return correct arrival date", ->
      (expect @flight.arrivalDate).toEqual '20/06/2011'

    it "should return correct departure time", ->
      (expect @flight.departureTime).toEqual '6:00'

    it "should return correct arrival time", ->
      (expect @flight.arrivalTime).toEqual '7:30'

    it "should return correct origin", ->
      (expect @flight.origin).toEqual 'Sydney'

    it "should return correct destination", ->
      (expect @flight.destination).toEqual 'Brisbane'

  describe "for several flight details", ->
    beforeEach ->
      injectElement '<tr class="tr_first"><td></td><td></td></tr>
                     <tr class="tr_first"><td></td><td></td></tr>'

      q = new QantasScraper()
      @flights = q.flights()

    it "should scrape each 'passengerDetailsFrame' to flights", ->
      (expect @flights.length).toEqual 2

    it "should return Flight objects", ->
      ((expect flight instanceof Flight).toEqual true) for flight in @flights 
