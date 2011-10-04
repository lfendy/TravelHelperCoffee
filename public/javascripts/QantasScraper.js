(function() {
  var QantasScraper;
  window.QantasScraper = QantasScraper = (function() {
    function QantasScraper() {}
    QantasScraper.prototype.passengerName = function() {
      return ($('div#ContactDetails')).find('td').eq(0).text();
    };
    QantasScraper.prototype.mobileNumber = function() {
      return ($("div#ContactDetails")).find("table.pax-contact").find("tr").eq(5).find("td").eq(1).text();
    };
    return QantasScraper;
  })();
}).call(this);
