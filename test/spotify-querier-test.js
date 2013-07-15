var assert = require('assert');
var spotifyQuerier = require('../spotify-querier').spotifyQuerier;

describe('spotifyQuerier', function () {

	var stubXHR = function () {
		global.XMLHttpRequest = function () {
			this.send = function () {
				this.onload();
			};
			this.open = function () {};
		}
	};

	var unstubXHR = function () {
		global.XMLHttpRequest = undefined;
	};

	describe('#ajaxRequest()', function () {

		it('should call the success callback when it finishes', function (done) {
			stubXHR();
			spotifyQuerier.ajaxRequest(function () {done();});
			unstubXHR();
		});

		it('should call the failure callback when it finishes', function (done) {
			global.XMLHttpRequest = function () {
				this.send = function () {
					this.onerror();
				};
				this.open = function () {};
			}
			spotifyQuerier.ajaxRequest(undefined, function () {done();});
			unstubXHR();
		});
	});

	describe('#searchforTrack()', function () {

		it('should call ajaxRequest with the correct url', function () {
			var correctUrl = "http://ws.spotify.com/search/1/track.json?q=lauren%20sperber";
			var realAjaxRequest = spotifyQuerier.ajaxRequest;
			spotifyQuerier.ajaxRequest = function (undefined, undefined, url) {
				assert.equal(url, correctUrl);
			}
			spotifyQuerier.searchForTrack(undefined, undefined, "lauren sperber");
			spotifyQuerier.ajaxRequest = realAjaxRequest;
		});

	});

	describe('#searchforArtist()', function () {

		it('should call ajaxRequest with the correct url', function () {
			var correctUrl = "http://ws.spotify.com/search/1/artist.json?q=lauren%20sperber";
			var realAjaxRequest = spotifyQuerier.ajaxRequest;
			spotifyQuerier.ajaxRequest = function (undefined, undefined, url) {
				assert.equal(url, correctUrl);
			}
			spotifyQuerier.searchForArtist(undefined, undefined, "lauren sperber");
			spotifyQuerier.ajaxRequest = realAjaxRequest;
		});

	});

});