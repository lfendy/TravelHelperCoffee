(function() {
  var TravelHelper, th;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.TravelHelper = TravelHelper = (function() {
    function TravelHelper() {
      this.run = __bind(this.run, this);      this.uiTemplate = ' \
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
      inputForm = Mustache.to_html(this.uiTemplate, view);
      return ($('body')).prepend(inputForm);
    };
    return TravelHelper;
  })();
  th = new TravelHelper();
  th.run();
}).call(this);
