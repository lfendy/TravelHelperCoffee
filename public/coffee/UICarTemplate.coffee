window.UICarTemplate = '
<table border="0" cellpadding="0" cellspacing="0">
	<tr>
        <th>City</th><th>Company</th><th>Contact</th><th>Phone</th>
    </tr>
	{{#cars}}
	<tr>
		<td>{{city}}</td><td>{{company}}</td><td>{{contact}}</td><td>{{phone}}</td>
	</tr>
	{{/cars}}
</table>'
