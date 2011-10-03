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


setupPassengerName = (name) ->
  injectElement htmlElementWithPassengerName name

describe "QantasScraper", ->

  it "should scrape passenger name", ->
    setupPassengerName 'John Doe'
    q = new QantasScraper()
    (expect q.passengerName()).toEqual 'John Doe'


