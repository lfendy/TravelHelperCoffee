injectElement = (element) ->
  jasmine.getFixtures().set element

#sample htmls

htmlElementWithMobileNumber = (mobileNumber) ->
  '
<div id="BookingConfirmationMain" class="mainBody" style="height:100%">
                <table>
                  <tbody><tr>
                    <td class="contactlabels">Name</td>
                    <td>JACQUI
&nbsp;WEBB-PULLMAN</td>
                    <td class="contactlabels">Agent Phone</td>
                    <td>+61-0487335313</td>
                  </tr>
                  <tr valign="top">
                    <td class="contactlabels">Address</td>
                    <td class="itineraryCol02">LEVEL 15, 303 COLLINS STREET<br>MELBOURNE
&nbsp;
VIC
&nbsp;3000<br>Australia</td>
                    <td class="contactlabels" style="width:130px">Guest Phone<br>Alternative Phone</td>
                    <td>##MOBILE_NUMBER##<br>+61-0396916500</td>
                  </tr>
                  <tr valign="top">
                    <td class="contactlabels">Email</td>
                    <td class="itineraryCol02">OZTRAVEL@THOUGHTWORKS.COM</td>
                    <td class="contactlabels"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="4"><span id="ResendInfo" visible="true" class="approved"></span></td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                  </tr>
                </tbody></table>
                <div class="changeItineraryButtonContainer"><a href="javascript:__doPostBack(\'ControlGroupChangeItineraryView$ErrorHandlingRetrieveBookingView$BookingConfirmationView3$ChangeControl2$LinkButtonChangeContact\',\'\')" class="buttonBlank buttonBlankDefault buttonEditContact">edit contact detail »</a><a id="ChangeItineraryLink1" href="ChangeItinerary.aspx?resend=true&amp;r=14309#ChangeItinerary" class="buttonBlank buttonBlankDefault buttonResendItinerary">re-send itinerary »</a></div>
              </div>'.replace('##MOBILE_NUMBER##', mobileNumber)

htmlElementWithFlightDetails = (flight) ->
  '              <div class="passengerDetailsFrame">
                <fieldset class="passengerDetailsField">
                  <legend class="intneraryFrameTitle"><span class="redFont">Departing Flight</span></legend>
                  <table>
                    <tr>
                      <td class="flightDate">##FLIGHT_DATE##</td>
                      <td class="flightStations">Origin</td>
                      <td class="flightStations">Destination</td>
                      <td class="flightFare" style="text-align: left">Fare Rules</td>
                      <td class="flightPassengers"></td>
                      <td class="flightFare"></td>
                    </tr>
                    <tr>
                      <td class="flightContents"><a href="http://www.virginblue.com.au/" class="operatedByLink"><div class="OpByVB"></div></a>##FLIGHT_NUMBER##</td>
                      <td class="flightContents"><span class="flightTimeTerminus">##DEPARTURE_TIME##</span> 
##ORIGIN##</td>
                      <td class="flightContents"><span class="flightTimeTerminus">##ARRIVAL_TIME##</span> 
##DESTINATION##</td>
                      <td class="flightFareContents">
                        <div>1
Adult
</div>
                      </td>
                      <td class="flightFareContents"><strong>$189.00</strong></td>
                    </tr>
                  </table>
                </fieldset>
              </div>
       '.replace('##FLIGHT_DATE##',flight.departureDate)
        .replace('##FLIGHT_NUMBER##',flight.flightNumber)
        .replace('##DEPARTURE_TIME##',flight.departureTime)
        .replace('##ARRIVAL_TIME##',flight.arrivalTime)
        .replace('##ORIGIN##',flight.origin)
        .replace('##DESTINATION##',flight.destination)

htmlElementWithReservationNumber = (number) ->
  '<td class="reservationnumber">##NUMBER##
    <input id="reservationnumber" type="hidden" value="E1E95Y"></td>'.replace('##NUMBER##',number)

htmlElementWithPassengerName = (name) ->
  '<td class="itineraryGuestBaggageGuestHeadingWithButton"><span float="left">Guest1: 
##NAME##</span>
<span class="alignRight"> VELOCITY REWARDS: xxxxx </span>
</td>'.replace('##NAME##', name)

htmlElementWithPageTitle = (title) ->
  '<div id="header">
	<div xmlns:ms="urn:schemas-microsoft-com:xslt"
		class="logo logoVirginBlue" style="display: none;">
		<a href="http://www.virginaustralia.com/"><img
			title="Virgin Australia homepage - go to Virgin Australia homepage"
			alt="Virgin Australia homepage - go to Virgin Australia homepage"
			src="/images/VirginBlue/virginblue_logo_44_6.png">
		</a>
	</div>
</div>'.replace('##TITLE##', title)

setupWebpageTitle = (title) ->
  injectElement htmlElementWithPageTitle title

setupMobileNumber = (mobileNumber) ->
  injectElement htmlElementWithMobileNumber mobileNumber

setupFlightDetails = (flight) ->
  injectElement htmlElementWithFlightDetails flight

setupReservationNumber = (number) ->
  injectElement htmlElementWithReservationNumber number

setupPassengerName = (name) ->
  injectElement htmlElementWithPassengerName name


describe "VirginScraper", ->

  it "should check whether scraper is ready for scraping", ->
    setupWebpageTitle 'Virgin Australia'
    v = new VirginScraper()
    (expect v.isReady()).toEqual true


  it "should scrape passenger name", ->
    setupPassengerName 'JACK JOHNSON'
    v = new VirginScraper()
    (expect v.passengerName()).toEqual 'JACK JOHNSON'


  it "should scrape guest mobile number", ->
    setupMobileNumber '+61-0430123456'
    v = new VirginScraper()
    (expect v.mobileNumber()).toEqual '+61-0430123456'


  it "should scrape reservation number", ->
    setupReservationNumber 'E1E95Y'
    v = new VirginScraper()
    (expect v.reservationNumber()).toEqual 'E1E95Y'

  it "should populate scraped data to Passenger", ->
    v = new VirginScraper()
    p = v.passenger()
    (expect p instanceof Passenger).toEqual true

  describe "when parsing flight details", ->
    beforeEach ->
      flight = new Flight()
      flight.flightNumber  = 'DJ 901'
      flight.departureDate = '20/06/2011'
      flight.arrivalDate   = '20/06/2011'
      flight.departureTime = '6:00 AM'
      flight.arrivalTime   = '7:30 AM'
      flight.origin        = 'Sydney'
      flight.destination   = 'Brisbane'
      setupFlightDetails flight
      raw = ($ 'div.passengerDetailsFrame')
      v = new VirginScraper()
      @flight = v.parseFlight raw
    
    it "should return correct flight number", ->
      (expect @flight.flightNumber).toEqual 'DJ 901'
      
    it "should return correct departure date", ->
      (expect @flight.departureDate).toEqual '20/06/2011'

    it "should return correct arrival date", ->
      (expect @flight.arrivalDate).toEqual '20/06/2011'

    it "should return correct departure time", ->
      (expect @flight.departureTime).toEqual '6:00 AM'

    it "should return correct arrival time", ->
      (expect @flight.arrivalTime).toEqual '7:30 AM'

    it "should return correct origin", ->
      (expect @flight.origin).toEqual 'Sydney'

    it "should return correct destination", ->
      (expect @flight.destination).toEqual 'Brisbane'


  describe "for several flight details", ->
    beforeEach ->
      injectElement '<div class="passengerDetailsFrame">
                     </div>
                     <div class="passengerDetailsFrame">
                     </div>'

      v = new VirginScraper()
      @flights = v.flights()

    it "should scrape each 'passengerDetailsFrame' to flights", ->
      (expect @flights.length).toEqual 2

    it "should return Flight objects", ->
      ((expect flight instanceof Flight).toEqual true) for flight in @flights


      
