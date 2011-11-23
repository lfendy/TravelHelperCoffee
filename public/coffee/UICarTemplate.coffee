window.UICarTemplate = '

<style type="text/css">
table tr th {
    color: #000 !important;
    font-weight: bold !important;
    height: 2em !important;
    padding: 2px 4px !important;
    text-align: left !important;
    white-space: nowrap !important;
}
</style>

<table border="0" width="400px" cellpadding="5px" cellspacing="5px">
	<tr>
        <th>City</th><th>Company</th><th>Contact</th><th>Phone</th>
    </tr>
	{{#cars}}
	<tr>
		<td>{{city}}</td><td>{{company}}</td><td>{{contact}}</td><td>{{phone}}</td>
	</tr>
	{{/cars}}
</table>
'
