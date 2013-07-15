;(function () {

  if (Array.prototype.map === undefined) {
    Array.prototype.map = function (thisFunction) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        result.push(thisFunction(this[i]));
      }
      return result;
    }
  }

  if (Array.prototype.filter === undefined) {
    Array.prototype.filter = function (thisFunction) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        if (thisFunction(this[i], i, this)) {
          result.push(this);
        }
      }
      return result;
    }
  }

})();