;(function (exports) {

  // map and filter are defined outside of Array.prototype so they can
  // be tested.
  var customMap = function (thisFunction) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      result.push(thisFunction(this[i]));
    }
    return result;
  };

  var customFilter = function (thisFunction) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      if (thisFunction(this[i], i, this)) {
        result.push(this);
      }
    }
    return result;
  };

  if (Array.prototype.map === undefined) {
    Array.prototype.map = customMap;
  }

  if (Array.prototype.filter === undefined) {
    Array.prototype.filter = customFilter;
  }

  exports.shims = {
    customFilter: customFilter,
    customMap: customMap
  };

})(typeof exports === "undefined" ? this : exports);