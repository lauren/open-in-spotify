;(function (exports) {

  exports.selectors = {
    Songza: function () {
      this.artist = document.getElementsByClassName("szi-artist")[0].innerHTML;
      this.track = document.getElementsByClassName("szi-song")[0].innerHTML;
      this.pauseButton = document.getElementsByClassName("szi-pause")[0];
      this.currentlyPlaying = document.getElementsByClassName("szi-player-state-play").length > 0;
    }
  }

})(typeof exports === "undefined" ? this : exports)