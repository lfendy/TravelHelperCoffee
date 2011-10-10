var headID = document.getElementsByTagName("head")[0];
var newScript1 = document.createElement('script');
newScript1.src = "http://maps.googleapis.com/maps/api/js?sensor=false"
headID.appendChild(newScript1);
