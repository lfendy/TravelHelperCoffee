(function() {
  var QantasScraper;
  window.QantasScraper = QantasScraper = (function() {
    function QantasScraper() {}
    QantasScraper.prototype.passengerName = function() {
      return ($('div#ContactDetails')).find('td').eq(0).text();
    };
    return QantasScraper;
  })();
}).call(this);
