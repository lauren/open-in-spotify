var assert = require('assert');
var spotifyQuerier = require('../src/spotify-querier').spotifyQuerier;

describe('spotifyQuerier', function () {
  console.log("hi");

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

  var stubAjaxRequst = function (json) {
    var savedAjaxRequest = spotifyQuerier.ajaxRequest;

    spotifyQuerier.ajaxRequest = function (_, callback) {
      var responseText = JSON.stringify(json);
      callback.apply({responseText: responseText});
    };
    return savedAjaxRequest;
  };

  var unstubAjaxRequest = function (originalAjaxRequest) {
    spotifyQuerier.ajaxRequest = originalAjaxRequest;
  };

  describe('#getTracks()', function () {

    it('should invoke callback with only the tracks that match the provided artist name', function (done) {
      var originalAjaxRequest = stubAjaxRequst({
        "tracks": [
          { "name": "No Scrubs",
            "album": { "name": "Fanmail" },
            "artists": [ { "name": "TLC" } ] },
          { "name": "No Scrubs",
            "album": { "name": "Fanmail" },
            "artists": [ { "name": "Doctor Lauren Sperber" } ] }
        ]
      });
      spotifyQuerier.getTracks("whatevs", "TLC", function (tracks) {
        assert(tracks.length === 1);
        assert(tracks[0].artists[0].name === "TLC");
        unstubAjaxRequest(originalAjaxRequest);
        done();
      });
    });

    it('should invoke the callback with tracks that match the provided artist name, sanitized for punctuation', function (done) {
      var originalAjaxRequest = stubAjaxRequst({
        "tracks": [
          { "name": "No Scrubs",
            "album": { "name": "Fanmail" },
            "artists": [ { "name": "(TLC-~)!." } ] }
        ]
      });
      spotifyQuerier.getTracks("whatevs", "TLC", function (tracks) {
        assert(tracks.length === 1);
        assert(tracks[0].artists[0].name === "TLC");
        unstubAjaxRequest(originalAjaxRequest);
        done();
      });
    });

    it('should invoke the callback with tracks deduped on album name and track name, sanitized for punctuation', function (done) {
      var originalAjaxRequest = stubAjaxRequst({
        "tracks": [
          { "name": "No Scrubs",
            "album": { "name": "Fanmail" },
            "artists": [ { "name": "TLC" } ] },
          { "name": "No Scrubs: Remix",
            "album": { "name": "Fanmail" },
            "artists": [ { "name": "TLC" } ] },
          { "name": "No Scrubs Remix",
            "album": { "name": "Fanmail" },
            "artists": [ { "name": "TLC" } ] },
          { "name": "No Scrubs",
            "album": { "name": "Fanmail: The Hits You Didn't Hear" },
            "artists": [ { "name": "TLC" } ] }
        ]
      });
      spotifyQuerier.getTracks("whatevs", "TLC", function (tracks) {
        assert(tracks.length === 3);
        assert(tracks[0].name === "No Scrubs");
        assert(tracks[0].album.name === "Fanmail");
        assert(tracks[1].name === "No Scrubs Remix");
        assert(tracks[1].album.name === "Fanmail");
        assert(tracks[2].name === "No Scrubs");
        assert(tracks[2].album.name === "Fanmail The Hits You Didn't Hear");
        unstubAjaxRequest(originalAjaxRequest);
        done();
      });
    });

  });

  describe('#getArtists()', function () {

    it('should invoke the callback with the artists array from the responseText', function (done) {
      var sampleArtistsResponse = {
        "info": {
          "num_results": 21,
          "limit": 100,
          "offset": 0,
          "query": "tlc",
          "type": "artist",
          "page": 1
        },
        "artists": [
          {
            "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
            "name": "TLC",
            "popularity": "0.62096"
          },
          {
            "href": "spotify:artist:1W5yUflierT5K2peFdbwEC",
            "name": "Goodie MoB featuring TLC",
            "popularity": "0.00419"
          }
        ]
      };
      var originalAjaxRequest = stubAjaxRequst(sampleArtistsResponse);
      spotifyQuerier.getArtists("TLC", function (artists) {
        assert.deepEqual(artists, sampleArtistsResponse.artists);
        unstubAjaxRequest(originalAjaxRequest);
        done();
      });
    });

  });

});