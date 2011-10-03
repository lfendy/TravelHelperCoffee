(function() {
  var htmlElementWithPassengerName, injectElement, setupPassengerName;
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
  describe("QantasScraper", function() {
    return it("should scrape passenger name", function() {
      var q;
      setupPassengerName('John Doe');
      q = new QantasScraper();
      return (expect(q.passengerName())).toEqual('John Doe');
    });
  });
}).call(this);
