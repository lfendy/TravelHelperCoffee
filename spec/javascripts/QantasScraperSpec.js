(function() {
  var htmlElementWithMobileNumber, htmlElementWithPassengerName, injectElement, setupMobileNumber, setupPassengerName;
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
  setupPassengerName = function(name) {
    return injectElement(htmlElementWithPassengerName(name));
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
  setupMobileNumber = function(number) {
    return injectElement(htmlElementWithMobileNumber(number));
  };
  describe("QantasScraper", function() {
    it("should scrape passenger name", function() {
      var q;
      setupPassengerName('John Doe');
      q = new QantasScraper();
      return (expect(q.passengerName())).toEqual('John Doe');
    });
    return it("should scrape guest mobile number", function() {
      var q;
      setupMobileNumber('+61-0430123456');
      q = new QantasScraper();
      return (expect(q.mobileNumber())).toEqual('+61-0430123456');
    });
  });
}).call(this);
