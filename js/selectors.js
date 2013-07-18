;(function (exports) {

  exports.selectors = {
    Songza: function () {
      this.artist = document.getElementsByClassName("szi-artist")[0].innerHTML;
      this.track = document.getElementsByClassName("szi-song")[0].innerHTML;
      this.pauseButton = document.getElementsByClassName("szi-pause")[0];
      this.currentlyPlaying = document.getElementsByClassName("szi-player-state-play").length > 0;
    },
    Pandora: function () {
      this.track = document.getElementsByClassName("songTitle")[0].innerHTML;
      this.artist = document.getElementsByClassName("artistSummary")[0].innerHTML;
      this.album = document.getElementsByClassName("albumTitle")[0].innerHTML;
      this.pauseButton = document.getElementsByClassName("pauseButton")[0];
      this.currentlyPlaying = this.pauseButton.style.display === "block";
    }
  }

})(typeof exports === "undefined" ? this : exports)