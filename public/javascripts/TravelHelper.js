(function() {
  var TravelHelper, th;
  window.TravelHelper = TravelHelper = (function() {
    function TravelHelper() {
      this.uiTemplate = ' \
<div id="travelplanner">\
<h1>travel planner</h1>\
<h2>Contact Details for {{passengerName}}</h2>\
</div>\
';
    }
    TravelHelper.prototype.run = function() {
      var inputForm, v, view;
      v = new VirginScraper();
      view = {
        passengerName: v.passengerName()
      };
      inputForm = Mustache.to_html(uiTemplate, view);
      return ($('body')).prepend(inputForm);
    };
    return TravelHelper;
  })();
  th = new TravelHelper();
  th.run();
}).call(this);
