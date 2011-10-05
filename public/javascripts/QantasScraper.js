(function() {
  var QantasScraper;
  window.QantasScraper = QantasScraper = (function() {
    function QantasScraper() {}
    QantasScraper.prototype.isReady = function() {
      var index;
      index = ($(document)).text().toLowerCase().indexOf("qantas");
      if (index !== -1) {
        console.log('QantasScraper:: QantasScraper is ready for action');
        return true;
      } else {
        console.log('QantasScraper:: Qantascraper is NOT ready for action, the target page is not Qantas');
        return false;
      }
    };
    QantasScraper.prototype.name = function() {
      return "QantasScraper";
    };
    QantasScraper.prototype.passengerName = function() {
      return ($('div#ContactDetails')).find('td').eq(0).text();
    };
    QantasScraper.prototype.mobileNumber = function() {
      return ($("div#ContactDetails")).find("table.pax-contact").find("tr").eq(5).find("td").eq(1).text();
    };
    QantasScraper.prototype.reservationNumber = function() {
      return ($("div#title")).find("h2").text().trim().split(/\s+/).filter(function(word, index) {
        return index === 2;
      }).join('');
    };
    return QantasScraper;
  })();
}).call(this);
