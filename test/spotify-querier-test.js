var assert = require('assert');
var spotifyQuerier = require('../js/spotify-querier').spotifyQuerier;

describe('spotifyQuerier', function () {

  var stubXHR = function () {
    global.XMLHttpRequest = function () {
      this.send = function () {
        this.onload();
      };
      this.open = function () {};
    };
  };

  var unstubXHR = function () {
    global.XMLHttpRequest = undefined;
  };

  describe('#ajaxRequest()', function () {

    it('should call the success callback when it finishes', function (done) {
      stubXHR();
      spotifyQuerier.ajaxRequest(undefined, function () {done();});
      unstubXHR();
    });

    it('should call the failure callback when it finishes', function (done) {
      global.XMLHttpRequest = function () {
        this.send = function () {
          this.onerror();
        };
        this.open = function () {};
      };
      spotifyQuerier.ajaxRequest(undefined, undefined, function () {done();});
      unstubXHR();
    });
  });

  describe('#getTracks()', function () {
    var savedAjaxRequest;

    before(function () {

      savedAjaxRequest = spotifyQuerier.ajaxRequest;

      spotifyQuerier.ajaxRequest = function (_, callback) {
        var responseText = JSON.stringify({
          "tracks": [
            { "name": "No Scrubs",
              "album": { "name": "Fanmail" },
              "artists": [ { "name": "TLC" } ] },
            { "name": "No Scrubs",
              "album": { "name": "Fanmail" },
              "artists": [ { "name": "Doctor Lauren Sperber" } ] }
          ]
        });
        callback.apply({responseText: responseText});
      };
    });

    it('should have a validTracks variable that includes only the tracks with the correct artist', function (done) {
      spotifyQuerier.getTracks("whatevs", "TLC", function (tracks) {
        assert(tracks.length === 1);
        assert(tracks[0].artists[0].name === "TLC");
        spotifyQuerier.ajaxRequest = savedAjaxRequest;
        done();
      });

    });

  });

});