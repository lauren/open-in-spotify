var assert = require('assert');
var router = require('../js/router').router;

describe('router', function () {

	var mockRender = function (done) {
		global.render = {
			showTrackOptions: function (done) {
				done();
			}
		}
	};

	describe('#trackSearch()', function (done) {
		it('should call render showTrackOptions when there is more than one track in the results', function () {
			mockRender(done);
			router.trackSearch('{"tracks": [1, 2]}');
		});
	});

});