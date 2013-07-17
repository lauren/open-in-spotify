var assert = require('assert'),
    shims = require('../js/shims').shims;

describe('shims', function () {

  describe('#customMap()', function () {
    it('should return an array that is the result of executing the provided function on the current array', function () {
      [1,2,3].map(function (num) { return num * 2; });
    });
  });

  describe('#customFilter()', function () {
    it('it should only return items that are <5 in passed array', function () {
      assert.deepEqual([1,2,3,4], [1,2,3,4,5,6,7,8].filter(function (x) {return x < 5;}));
    });
  });
});