window.UIHotelTemplate = '

	<select id="hotel-select">
    {{#hotels}}
		<option value="{{address}}_{{phone}}">{{hotel}}</option>
	{{/hotels}}
    </select>
'
