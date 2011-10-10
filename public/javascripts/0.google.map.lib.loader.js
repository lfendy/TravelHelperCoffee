var matrix;

function initialize() {
  matrix = new google.maps.DistanceMatrixService();
  if (matrix != null) {
  	console.log("DistanceMatrixService was succesfully initiliazed: " + matrix);
  }
}

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
var theBody = document.getElementsByTagName('body')[0];
if (theBody) {
	theBody.appendChild(script);
}


var theHead = document.getElementsByTagName("head")[0];
var newScript1 = document.createElement('script');
newScript1.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize"
if (theHead) {
	theHead.appendChild(newScript1);
}
