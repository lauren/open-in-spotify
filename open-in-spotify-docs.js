;(function () {
  window.onload = function () {
    var fadeIn = function (elements) {
      if (elements.length > 0) {
        var firstEl = elements[0],
            remainingEls = Array.prototype.slice.call(elements, 1, elements.length);
        firstEl.className += " visible";
        if (firstEl.children.length > 0) {
          setTimeout(function () {
            fadeIn(Array.prototype.slice.call(firstEl.children).concat(remainingEls));
          }, 50);
        } else {
          setTimeout(function () {
            fadeIn(remainingEls);
          }, 50);
        }
      }
    };
    fadeIn(document.body.children);
  };
})();