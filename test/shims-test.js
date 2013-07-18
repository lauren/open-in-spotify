var assert = require('assert'),
    shims = require('../src/shims').shims;

describe('shims', function () {

  describe('#customMap()', function () {
    it('should return an array that is the result of executing the provided function on the current array', function () {
      assert.deepEqual([2,4,6],[1,2,3].map(function (num) { return num * 2; }));
    });

    it('should return an empty aray when invoked on an empty array', function () {
      assert.deepEqual([],[].map(function (num) { return num * 2; }));
    });
  });

  describe('#customFilter()', function () {
    it('it should only return items for which the provided function evaluates to true', function () {
      assert.deepEqual([1,2,3,4,4,3,2,1], [1,2,3,4,5,6,7,8,4,3,2,1].filter(function (x) {return x < 5;}));
      assert.deepEqual([], [8,6,34,26,7,84].filter(function (x) {return x < 5;}));
    });

    it('it should return an empty array when invoked on an empty array', function () {
      assert.deepEqual([], [].filter(function (x) {return x < 5;}));
    });
  });
});