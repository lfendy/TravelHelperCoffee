#javascript:(function(){document.body.appendChild(document.createElement('script')).src='** your external file URL here **';})();


window.TravelHelper = class TravelHelper
  constructor: () ->
    @uiTemplate=' 
<div id="travelplanner">
<h1>travel planner</h1>
<h2>Contact Details for {{passengerName}}</h2>
</div>
'

  run: () ->
    v = new VirginScraper()
    view = 
      passengerName: v.passengerName()
    
      
    inputForm = Mustache.to_html(@uiTemplate, view);
    ($ 'body').prepend inputForm


th = new TravelHelper()
th.run()

