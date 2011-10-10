var matrix;

function initialize() {
  matrix = new google.maps.DistanceMatrixService();
  console.log("Got DistanceMatrixService: " + matrix);
}

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
document.body.appendChild(script);


//var headID = document.getElementsByTagName("head")[0];
//var newScript1 = document.createElement('script');
//newScript1.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize2"
//headID.appendChild(newScript1);
