(function() {
  var htmlElementWithFlightDetails, htmlElementWithMobileNumber, htmlElementWithPageTitle, htmlElementWithPassengerName, htmlElementWithReservationNumber, injectElement, setupFlightDetails, setupMobileNumber, setupPassengerName, setupReservationNumber, setupWebpageTitle;
  injectElement = function(element) {
    return jasmine.getFixtures().set(element);
  };
  htmlElementWithPassengerName = function(name) {
    return '<div id="ContactDetails" class="paxRecap">\
	<table>\
		<tbody>\
			<tr>\
				<td>##NAME##</td>\
			</tr>\
		</tbody>\
	</table>\
  </div>'.replace('##NAME##', name);
  };
  htmlElementWithMobileNumber = function(number) {
    return '<div class="paxRecap" id="ContactDetails">\
	<h2>Contact Details</h2>\
	<div class="panel">\
		<table cellspacing="0" class="pax-details">\
			<colgroup>\
				<col class="first">\
				<col class="second">\
				<col class="third">\
			</colgroup>\
			<tbody>\
				<tr>\
					<th>Name</th>\
					<th>Frequent Flyer No.</th>\
					<th>Special Requests</th>\
				</tr>\
				<tr class="first_pax">\
					<td>Mr Ryan Moffat</td>\
					<td>QF&nbsp;8240922</td>\
					<td></td>\
				</tr>\
			</tbody>\
		</table>\
		<table cellspacing="0" class="pax-contact">\
			<tbody>\
				<tr>\
					<th colspan="2">Booking Contact</th>\
				</tr>\
				<tr>\
					<td colspan="2"><strong> Mr Ryan Moffat </strong></td>\
				</tr>\
				<tr>\
					<td class="nowrap">Daytime phone:</td>\
					<td width="80%">0404 501 028</td>\
				</tr>\
				<tr>\
					<td class="nowrap">Evening phone:</td>\
					<td>0404 501 028</td>\
				</tr>\
				<tr>\
					<td class="nowrap">Destination phone:</td>\
					<td>0404 501 028</td>\
				</tr>\
				<tr>\
					<td class="nowrap">Mobile phone:</td>\
					<td>##NUM##</td>\
				</tr>\
				<tr>\
					<td class="nowrap">E-mail:</td>\
					<td><span id="idToCut"> oztravel@thoughtworks.com</span>\
					</td>\
				</tr>\
				<tr>\
					<td>ABN:</td>\
					<td><span>99088279761</span>\
					</td>\
				</tr>\
			</tbody>\
		</table>\
		<br class="clear">\
	</div>\
  </div>'.replace('##NUM##', number);
  };
  htmlElementWithReservationNumber = function(number) {
    return '<div id="title">\
	<h1>Manage Your Booking</h1>\
	<h2>\
		Booking reference: <em class="">##NUM##</em>\
	</h2>\
</div>'.replace('##NUM##', number);
  };
  htmlElementWithPageTitle = function(title) {
    return '<form\
	action="http://www.##TITLE##.com.au/travel/airlines/your-booking/global/en"\
	method="post" name="NEW_CAR_SEARCH_FACADE_FORM">\
	<input type="hidden"\
		value="70765A6C4473A6DF2414480357459359035D99847FC46BF7277FF182F86F0168"\
		name="ENC"> <input type="hidden" value="1" name="ENCT">\
</form>'.replace('##TITLE##', title);
  };
  htmlElementWithFlightDetails = function(flight) {
    return '<div id="YourFlights" class="flightsRecap">\
	<h2>\
		<a\
			href="http://www.qantas.com.au/travel/airlines/conditions-carriage/global/en"\
			target="_blank" class="h2link"> Terms And Conditions of Carriage\
		</a> Your Flights\
	</h2>\
	<div class="nobg">\
		<table cellspacing="0" id="cols_10" class="full">\
			<tbody>\
				<tr class="tr_first greyOn" id="idFlightOutFirst_col10">\
					<td>##FLIGHT_DATE##</td>\
					<td><strong>##DEPARTURE_TIME##</strong>\
					</td>\
					<td>##ORIGIN##</td>\
					<td><strong>##ARRIVAL_TIME##</strong>\
					</td>\
					<td>##DESTINATION##</td>\
					<td><a title="" class="logo"> <span class="wcaginfo">Qantas\
								flight</span> <img title="" alt="QF"\
							src="qf_v1.1_ui_cr4673263_13_230911/img/airlinesicons/QF.gif">\
							<span class="flightnumber">##FLIGHT_NUMBER##</span> </a></td>\
					<td class="aligncenter">3</td>\
					<td id="fareConditionFlightOutFirst">Flexi Saver</td>\
					<td class="checkin">30 minutes <br>before departure</td>\
					<td class="baggage">Included:<br> 1 piece<br\
						class="tweak">\
					</td>\
				</tr>\
			</tbody>\
		</table>\
	</div>\
</div>'.replace('##FLIGHT_DATE##', flight.departureDate).replace('##FLIGHT_NUMBER##', flight.flightNumber).replace('##DEPARTURE_TIME##', flight.departureTime).replace('##ARRIVAL_TIME##', flight.arrivalTime).replace('##ORIGIN##', flight.origin).replace('##DESTINATION##', flight.destination);
  };
  setupWebpageTitle = function(title) {
    return injectElement(htmlElementWithPageTitle(title));
  };
  setupPassengerName = function(name) {
    return injectElement(htmlElementWithPassengerName(name));
  };
  setupMobileNumber = function(number) {
    return injectElement(htmlElementWithMobileNumber(number));
  };
  setupReservationNumber = function(number) {
    return injectElement(htmlElementWithReservationNumber(number));
  };
  setupFlightDetails = function(flight) {
    return injectElement(htmlElementWithFlightDetails(flight));
  };
  describe("QantasScraper", function() {
    it("should check whether scraper is ready for scraping", function() {
      var q;
      setupWebpageTitle('Qantas');
      q = new QantasScraper();
      return (expect(q.isReady())).toEqual(true);
    });
    it("should scrape passenger name", function() {
      var q;
      setupPassengerName('John Doe');
      q = new QantasScraper();
      return (expect(q.passengerName())).toEqual('John Doe');
    });
    it("should scrape guest mobile number", function() {
      var q;
      setupMobileNumber('+61-0430123456');
      q = new QantasScraper();
      return (expect(q.mobileNumber())).toEqual('+61-0430123456');
    });
    it("should expand scraped date into a pretty looking format", function() {
      var v;
      v = new QantasScraper();
      return (expect(v.makePrettyDate('Tue 04 Oct 11'))).toEqual('Tuesday 4 October 2011');
    });
    it("should scrape reservation number", function() {
      var q;
      setupReservationNumber('6C82U6');
      q = new QantasScraper();
      return (expect(q.reservationNumber())).toEqual('6C82U6');
    });
    it("should populate scraped data to Passenger", function() {
      var p, q;
      q = new QantasScraper();
      p = q.passenger();
      return (expect(p instanceof Passenger)).toEqual(true);
    });
    describe("when parsing flight details", function() {
      beforeEach(function() {
        var flight, q, raw;
        flight = new Flight();
        flight.flightNumber = 'QF467';
        flight.departureDate = '20/06/2011';
        flight.arrivalDate = '20/06/2011';
        flight.departureTime = '6:00 AM';
        flight.arrivalTime = '7:30 AM';
        flight.origin = 'Sydney';
        flight.destination = 'Brisbane';
        setupFlightDetails(flight);
        raw = $('tr.tr_first');
        q = new QantasScraper();
        return this.flight = q.parseFlight(raw);
      });
      it("should return correct flight number", function() {
        return (expect(this.flight.flightNumber)).toEqual('QF467');
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
        var q;
        injectElement('<tr class="tr_first"><td></td><td></td></tr>\
                     <tr class="tr_first"><td></td><td></td></tr>');
        q = new QantasScraper();
        return this.flights = q.flights();
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
