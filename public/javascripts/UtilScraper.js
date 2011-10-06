(function() {
  var UtilScraper;
  window.UtilScraper = UtilScraper = (function() {
    var instance;
    function UtilScraper() {}
    instance = null;
    UtilScraper.get = function() {
      if (!(instance != null)) {
        instance = new this;
        instance.init('UtilScraper');
      }
      return instance;
    };
    UtilScraper.prototype.init = function(name) {
      if (name == null) {
        name = "unknown";
      }
      return console.log("" + name + " initialized");
    };
    UtilScraper.prototype.getGoogleSpreadsheetAsJson = function(spreadsheetId, gridId, target, callback) {
      var url;
      url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script';
      return $.get(url, function(res) {
        var json, jsonString;
        jsonString = res.responseText.substring(res.responseText.indexOf("{"), res.responseText.lastIndexOf("}") + 1);
        jsonString;
        json = jQuery.parseJSON(jsonString);
        return callback.call(target, json.feed.entry);
      });
    };
    return UtilScraper;
  })();
}).call(this);
