var service;
var service2;

function initialize() {
  service = new google.maps.DistanceMatrixService();
  alert("Service: " + service);
}

function initialize2() {
		  service2 = new google.maps.DistanceMatrixService();
		    alert("Service 2: " + service2);
}

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
document.body.appendChild(script);


var headID = document.getElementsByTagName("head")[0];
var newScript1 = document.createElement('script');
newScript1.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize2"
headID.appendChild(newScript1);
