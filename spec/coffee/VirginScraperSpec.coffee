injectElement = (element) ->
  jasmine.getFixtures().set element

describe "VirginScraper", ->

  it "should scrape passenger name", ->
    injectElement '<td class="itineraryGuestBaggageNameColumn">JACK JOHNSON</td>'
    v = new VirginScraper()
    (expect v.passengerName()).toEqual 'JACK JOHNSON'

  describe "when parsing flight details", ->
    beforeEach ->
      injectElement '              <div class="passengerDetailsFrame">
                <fieldset class="passengerDetailsField">
                  <legend class="intneraryFrameTitle"><span class="redFont">Departing Flight</span></legend>
                  <table>
                    <tr>
                      <td class="flightDate">20/06/2011</td>
                      <td class="flightStations">Origin</td>
                      <td class="flightStations">Destination</td>
                      <td class="flightFare" style="text-align: left">Fare Rules</td>
                      <td class="flightPassengers"></td>
                      <td class="flightFare"></td>
                    </tr>
                    <tr>
                      <td class="flightContents"><a href="http://www.virginblue.com.au/" class="operatedByLink"><div class="OpByVB"></div></a>DJ 901</td>
                      <td class="flightContents"><span class="flightTimeTerminus">6:00 AM</span> 
Sydney</td>
                      <td class="flightContents"><span class="flightTimeTerminus">7:30 AM</span> 
Brisbane</td>
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
'
      raw = ($ 'div.passengerDetailsFrame')
      v = new VirginScraper()
      @flight = v.parseFlight raw
    
    it "should return correct flight number", ->
      (expect @flight.flightNumber).toEqual 'DJ 901'
      
    it "should return correct departure date", ->
      (expect @flight.departureDate).toEqual '20/06/2011'

    it "should return correct arrival date", ->
      (expect @flight.departureDate).toEqual '20/06/2011'

    it "should return correct departure time", ->
      (expect @flight.departureTime).toEqual '6:00 AM'

    it "should return correct arrival time", ->
      (expect @flight.arrivalTime).toEqual '7:30 AM'




  describe "for a given flight detail", ->

    beforeEach ->
      injectElement '              <div class="passengerDetailsFrame">
                <fieldset class="passengerDetailsField">
                  <legend class="intneraryFrameTitle"><span class="redFont">Departing Flight</span></legend>
                  <table>
                    <tr>
                      <td class="flightDate">20/06/2011</td>
                      <td class="flightStations">Origin</td>
                      <td class="flightStations">Destination</td>
                      <td class="flightFare" style="text-align: left">Fare Rules</td>
                      <td class="flightPassengers"></td>
                      <td class="flightFare"></td>
                    </tr>
                    <tr>
                      <td class="flightContents"><a href="http://www.virginblue.com.au/" class="operatedByLink"><div class="OpByVB"></div></a>DJ 901</td>
                      <td class="flightContents"><span class="flightTimeTerminus">6:00 AM</span> 
Sydney</td>
                      <td class="flightContents"><span class="flightTimeTerminus">7:30 AM</span> 
Brisbane</td>
                      <td class="flightFareContents">
                        <div id="Depart_Fare_Class_1"><a id="fareType1" name="fareType1" href="#DepartFareRules" target="_self" xmlns:ms="urn:schemas-microsoft-com:xslt">Saver</a></div>
                      </td>
                      <td class="flightFareContents">
                        <div>1 
Adult
</div>
                      </td>
                      <td class="flightFareContents"><strong>$189.00</strong></td>
                    </tr>
                    <tr>
                      <td class="flightReminder" colspan="3">
                        <div class="Calendar_Icon floatLeft"></div><span class="flightReminderBG"><a href="https://www.virginblue.com.au/apps/skylights/booking_reminder.php?orig=SYD&amp;dest=BNE&amp;pnr=SYTMTQ&amp;departdate=20110620:0600&amp;warntime=20110619T0600">Outlook reminder</a></span></td>
                    </tr>
                  </table>
                </fieldset>
              </div>
              <div class="passengerDetailsFrame">
                <fieldset class="passengerDetailsField">
                  <legend class="intneraryFrameTitle"><span class="redFont">Return Flight</span></legend>
                  <table>
                    <tr>
                      <td class="flightDate">24/06/2011</td>
                      <td class="flightStations">Origin</td>
                      <td class="flightStations">Destination</td>
                      <td class="flightFare" style="text-align: left">Fare Rules</td>
                      <td class="flightPassengers"></td>
                      <td class="flightFare"></td>
                    </tr>
                    <tr>
                      <td class="flightContents"><a href="http://www.virginblue.com.au/" class="operatedByLink"><div class="OpByVB"></div></a>DJ 986</td>
                      <td class="flightContents"><span class="flightTimeTerminus">19:00 PM</span> 
Brisbane</td>
                      <td class="flightContents"><span class="flightTimeTerminus">20:35 PM</span> 
Sydney</td>
                      <td class="flightFareContents">
                        <div id="Return_Fare_Class_1"><a id="fareType2" name="fareType2" href="#ReturnFareRules" target="_self" xmlns:ms="urn:schemas-microsoft-com:xslt">Saver</a></div>
                      </td>
                      <td class="flightFareContents">
                        <div>1 
Adult
</div>
                      </td>
                      <td class="flightFareContents"><strong>$175.00</strong></td>
                    </tr>
                    <tr>
                      <td class="flightReminder" colspan="3">
                        <div class="Calendar_Icon floatLeft"></div><span class="flightReminderBG"><a href="https://www.virginblue.com.au/apps/skylights/booking_reminder.php?orig=BNE&amp;dest=SYD&amp;pnr=SYTMTQ&amp;departdate=20110624:1900&amp;warntime=20110623T1900">Outlook reminder</a></span></td>
                    </tr>
                  </table>
                </fieldset>
              </div>
'

    it "should scrape all flights", ->
      v = new VirginScraper()
      expect(v.flights().length).toEqual 2

