var headID = document.getElementsByTagName("head")[0];         

var newScript1 = document.createElement('script');
newScript1.type = 'text/javascript';
newScript1.src = "http://maps.googleapis.com/maps/api/js?sensor=false";

//var newScript2 = document.createElement('script');                                                                                                                              //newScript2.type = 'text/javascript';
//newScript2.src = "http://maps.gstatic.com/intl/en_us/mapfiles/api-3/6/7/main.js";
   
headID.appendChild(newScript1);
//headID.appendChild(newScript2);
