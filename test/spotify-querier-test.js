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

  });

});