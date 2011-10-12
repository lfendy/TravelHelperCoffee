(function() {
  var htmlElementWithFlightDetails, htmlElementWithMobileNumber, htmlElementWithPageTitle, htmlElementWithPassengerName, htmlElementWithReservationNumber, htmlElementWithTwoFlightDetails, injectElement, setupAccommodationInfo, setupFlightDetails, setupMobileNumber, setupPassengerName, setupReservationNumber, setupWebpageTitle;
  injectElement = function(element) {
    return jasmine.getFixtures().set(element);
  };
  htmlElementWithMobileNumber = function(mobileNumber) {
    return '\
<div id="BookingConfirmationMain" class="mainBody" style="height:100%">\
                <table>\
                  <tbody><tr>\
                    <td class="contactlabels">Name</td>\
                    <td>JACQUI\
&nbsp;WEBB-PULLMAN</td>\
                    <td class="contactlabels">Agent Phone</td>\
                    <td>+61-0487335313</td>\
                  </tr>\
                  <tr valign="top">\
                    <td class="contactlabels">Address</td>\
                    <td class="itineraryCol02">LEVEL 15, 303 COLLINS STREET<br>MELBOURNE\
&nbsp;\
VIC\
&nbsp;3000<br>Australia</td>\
                    <td class="contactlabels" style="width:130px">Guest Phone<br>Alternative Phone</td>\
                    <td>##MOBILE_NUMBER##<br>+61-0396916500</td>\
                  </tr>\
                  <tr valign="top">\
                    <td class="contactlabels">Email</td>\
                    <td class="itineraryCol02">OZTRAVEL@THOUGHTWORKS.COM</td>\
                    <td class="contactlabels"></td>\
                    <td></td>\
                  </tr>\
                  <tr>\
                    <td colspan="4"><span id="ResendInfo" visible="true" class="approved"></span></td>\
                  </tr>\
                  <tr>\
                    <td colspan="4"></td>\
                  </tr>\
                </tbody></table>\
                <div class="changeItineraryButtonContainer"><a href="javascript:__doPostBack(\'ControlGroupChangeItineraryView$ErrorHandlingRetrieveBookingView$BookingConfirmationView3$ChangeControl2$LinkButtonChangeContact\',\'\')" class="buttonBlank buttonBlankDefault buttonEditContact">edit contact detail »</a><a id="ChangeItineraryLink1" href="ChangeItinerary.aspx?resend=true&amp;r=14309#ChangeItinerary" class="buttonBlank buttonBlankDefault buttonResendItinerary">re-send itinerary »</a></div>\
              </div>'.replace('##MOBILE_NUMBER##', mobileNumber);
  };
  htmlElementWithFlightDetails = function(flight) {
    return '              <div class="passengerDetailsFrame">\
                <fieldset class="passengerDetailsField">\
                  <legend class="intneraryFrameTitle"><span class="redFont">Departing Flight</span></legend>\
                  <table>\
                    <tr>\
                      <td class="flightDate">##FLIGHT_DATE##</td>\
                      <td class="flightStations">Origin</td>\
                      <td class="flightStations">Destination</td>\
                      <td class="flightFare" style="text-align: left">Fare Rules</td>\
                      <td class="flightPassengers"></td>\
                      <td class="flightFare"></td>\
                    </tr>\
                    <tr>\
                      <td class="flightContents"><a href="http://www.virginblue.com.au/" class="operatedByLink"><div class="OpByVB"></div></a>##FLIGHT_NUMBER##</td>\
                      <td class="flightContents"><span class="flightTimeTerminus">##DEPARTURE_TIME##</span> \
##ORIGIN##</td>\
                      <td class="flightContents"><span class="flightTimeTerminus">##ARRIVAL_TIME##</span> \
##DESTINATION##</td>\
                      <td class="flightFareContents">\
                        <div>1\
Adult\
</div>\
                      </td>\
                      <td class="flightFareContents"><strong>$189.00</strong></td>\
                    </tr>\
                  </table>\
                </fieldset>\
              </div>\
       '.replace('##FLIGHT_DATE##', flight.departureDate).replace('##FLIGHT_NUMBER##', flight.flightNumber).replace('##DEPARTURE_TIME##', flight.departureTime).replace('##ARRIVAL_TIME##', flight.arrivalTime).replace('##ORIGIN##', flight.origin).replace('##DESTINATION##', flight.destination);
  };
  htmlElementWithTwoFlightDetails = function() {
    return '          <div class="passengerDetailsFrame">\
                <fieldset class="passengerDetailsField">\
                  <legend class="intneraryFrameTitle"><span class="redFont">Departing Flight</span></legend>\
                  <table>\
                    <tr>\
                      <td class="flightDate">1-Jan-2011</td>\
                      <td class="flightStations">Origin</td>\
                      <td class="flightStations">Destination</td>\
                      <td class="flightFare" style="text-align: left">Fare Rules</td>\
                      <td class="flightPassengers"></td>\
                      <td class="flightFare"></td>\
                    </tr>\
                    <tr>\
                      <td class="flightContents"><a href="http://www.virginblue.com.au/" class="operatedByLink"><div class="OpByVB"></div></a>QV896</td>\
                      <td class="flightContents"><span class="flightTimeTerminus">11:00</span>Melbourne</td>\
                      <td class="flightContents"><span class="flightTimeTerminus">21:00</span>Brisbane</td>\
                      <td class="flightFareContents"><div>1 Adult</div>\
                      </td>\
                      <td class="flightFareContents"><strong>$189.00</strong></td>\
                    </tr>\
                  </table>\
                </fieldset>                                                                                                                                                       \
              </div>\
              <div class="passengerDetailsFrame">\
                <fieldset class="passengerDetailsField">\
                  <legend class="intneraryFrameTitle"><span class="redFont">Returning Flight</span></legend>\
                  <table>\
                    <tr>\
                      <td class="flightDate">10-Jan-2011</td>\
                      <td class="flightStations">Origin</td>\
                      <td class="flightStations">Destination</td>\
                      <td class="flightFare" style="text-align: left">Fare Rules</td>\
                      <td class="flightPassengers"></td>\
                      <td class="flightFare"></td>\
                    </tr>\
                    <tr>\
                      <td class="flightContents"><a href="http://www.virginblue.com.au/" class="operatedByLink"><div class="OpByVB"></div></a>QV123</td>\
                      <td class="flightContents"><span class="flightTimeTerminus">16:30</span>Brisbane</td>\
                      <td class="flightContents"><span class="flightTimeTerminus">23:45</span>Melbourne</td>\
                      <td class="flightFareContents"><div>1 Adult</div>                                                                                                           \
                      </td>\
                      <td class="flightFareContents"><strong>$199.00</strong></td>\
                    </tr>\
                  </table>\
                </fieldset>                                                                                                                                                       \
              </div>\
       ';
  };
  htmlElementWithReservationNumber = function(number) {
    return '<td class="reservationnumber">##NUMBER##\
    <input id="reservationnumber" type="hidden" value="E1E95Y"></td>'.replace('##NUMBER##', number);
  };
  htmlElementWithPassengerName = function(name) {
    return '<td class="itineraryGuestBaggageGuestHeadingWithButton"><span float="left">Guest1: \
##NAME##</span>\
<span class="alignRight"> VELOCITY REWARDS: xxxxx </span>\
</td>'.replace('##NAME##', name);
  };
  htmlElementWithPageTitle = function(title) {
    return '<div id="header">\
	<div xmlns:ms="urn:schemas-microsoft-com:xslt"\
		class="logo logoVirginBlue" style="display: none;">\
		<a href="http://www.virginaustralia.com/"><img\
			title="Virgin Australia homepage - go to Virgin Australia homepage"\
			alt="Virgin Australia homepage - go to Virgin Australia homepage"\
			src="/images/VirginBlue/virginblue_logo_44_6.png">\
		</a>\
	</div>\
</div>'.replace('##TITLE##', title);
  };
  setupWebpageTitle = function(title) {
    return injectElement(htmlElementWithPageTitle(title));
  };
  setupMobileNumber = function(mobileNumber) {
    return injectElement(htmlElementWithMobileNumber(mobileNumber));
  };
  setupFlightDetails = function(flight) {
    return injectElement(htmlElementWithFlightDetails(flight));
  };
  setupAccommodationInfo = function() {
    return injectElement(htmlElementWithTwoFlightDetails);
  };
  setupReservationNumber = function(number) {
    return injectElement(htmlElementWithReservationNumber(number));
  };
  setupPassengerName = function(name) {
    return injectElement(htmlElementWithPassengerName(name));
  };
  describe("VirginScraper", function() {
    it("should check whether scraper is ready for scraping", function() {
      var v;
      setupWebpageTitle('Virgin Australia');
      v = new VirginScraper();
      return (expect(v.isReady())).toEqual(true);
    });
    it("should scrape passenger name", function() {
      var v;
      setupPassengerName('JACK JOHNSON');
      v = new VirginScraper();
      return (expect(v.passengerName())).toEqual('JACK JOHNSON');
    });
    it("should expand scraped date into a pretty looking format", function() {
      var v;
      v = new VirginScraper();
      return (expect(v.makePrettyDate('Tue 04-Oct-11'))).toEqual('Tuesday 4 October 2011');
    });
    it("should scrape guest mobile number", function() {
      var v;
      setupMobileNumber('+61-0430123456');
      v = new VirginScraper();
      return (expect(v.mobileNumber())).toEqual('+61-0430123456');
    });
    it("should scrape reservation number", function() {
      var v;
      setupReservationNumber('E1E95Y');
      v = new VirginScraper();
      return (expect(v.reservationNumber())).toEqual('E1E95Y');
    });
    it("should populate scraped data to Accommodation", function() {
      setupAccommodationInfo;      var ac, v;
      v = new VirginScraper();
      ac = v.accommodation();
      (expect(ac.hostingCity)).toEqual('Brisbane');
      (expect(ac.stayFrom)).toEqual('1-Jan-2011');
      return (expect(ac.stayTo)).toEqual('10-Jan-2011');
    });
    it("should populate scraped data to Passenger", function() {
      var p, v;
      v = new VirginScraper();
      p = v.passenger();
      return (expect(p instanceof Passenger)).toEqual(true);
    });
    describe("when parsing flight details", function() {
      beforeEach(function() {
        var flight, raw, v;
        flight = new Flight();
        flight.flightNumber = 'DJ 901';
        flight.departureDate = '20/06/2011';
        flight.arrivalDate = '20/06/2011';
        flight.departureTime = '6:00 AM';
        flight.arrivalTime = '7:30 AM';
        flight.origin = 'Sydney';
        flight.destination = 'Brisbane';
        setupFlightDetails(flight);
        raw = $('div.passengerDetailsFrame');
        v = new VirginScraper();
        return this.flight = v.parseFlight(raw);
      });
      it("should return correct flight number", function() {
        return (expect(this.flight.flightNumber)).toEqual('DJ 901');
      });
      it("should return correct departure date", function() {
        return (expect(this.flight.departureDate)).toEqual('20/06/2011');
      });
      it("should return correct arrival date", function() {
        return (expect(this.flight.arrivalDate)).toEqual('20/06/2011');
      });
      it("should return correct departure time", function() {
        return (expect(this.flight.departureTime)).toEqual('6:00 AM');
      });
      it("should return correct arrival time", function() {
        return (expect(this.flight.arrivalTime)).toEqual('7:30 AM');
      });
      it("should return correct origin", function() {
        return (expect(this.flight.origin)).toEqual('Sydney');
      });
      return it("should return correct destination", function() {
        return (expect(this.flight.destination)).toEqual('Brisbane');
      });
    });
    return describe("for several flight details", function() {
      beforeEach(function() {
        var v;
        injectElement('<div class="passengerDetailsFrame">\
                     </div>\
                     <div class="passengerDetailsFrame">\
                     </div>');
        v = new VirginScraper();
        this.flights = v.flights();
        return this.city = v.accommodation().hostingCity;
      });
      it("should scrape each 'passengerDetailsFrame' to flights", function() {
        return (expect(this.flights.length)).toEqual(2);
      });
      return it("should return Flight objects", function() {
        var flight, _i, _len, _ref, _results;
        _ref = this.flights;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          flight = _ref[_i];
          _results.push((expect(flight instanceof Flight)).toEqual(true));
        }
        return _results;
      });
    });
  });
}).call(this);
