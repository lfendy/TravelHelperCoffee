(function() {
  window.UIHotelTemplate = '\
\
	<select id="hotel-select">\
    {{#hotels}}\
		<option value="{{address}}">{{hotel}}</option>\
	{{/hotels}}\
    </select>\
';
}).call(this);
