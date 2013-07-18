;(function (exports) {

  exports.selectors = {
    Songza: function () {
      this.artist = document.getElementsByClassName("szi-artist")[0].innerHTML;
      this.track = document.getElementsByClassName("szi-song")[0].innerHTML;
      this.pauseButton = document.getElementsByClassName("szi-pause")[0];
      this.playButton = document.getElementsByClassName("szi-play")[0];
      this.currentlyPlaying = document.getElementsByClassName("szi-player-state-play").length > 0;
    },
    Pandora: function () {
      this.track = document.getElementsByClassName("songTitle")[0].innerHTML;
      this.artist = document.getElementsByClassName("artistSummary")[0].innerHTML;
      this.album = document.getElementsByClassName("albumTitle")[0].innerHTML;
      this.pauseButton = document.getElementsByClassName("pauseButton")[0];
      this.playButton = this.pauseButton;
      this.currentlyPlaying = this.pauseButton.style.display === "block";
    },
    TurntableFM: function () {
      this.track = document.getElementsByClassName("songboard-title")[0].innerHTML;
      this.artist = document.getElementsByClassName("songboard-artist")[0].innerHTML;
      this.currentlyPlaying = false; // now pause button on turntable.fm, so skip pausing music
    },
    LastFM: function () {
      this.track = document.getElementsByClassName("track")[0].children[0].innerHTML;
      this.artist = document.getElementsByClassName("artist")[0].children[0].innerHTML;
      this.album = document.getElementsByClassName("title")[0].children[0].innerHTML;
      this.pauseButton = document.getElementById("radioControlPause").children[0];
      this.playButton = document.getElementById("radioControlPlay").children[0];
      this.currentlyPlaying = document.getElementsByClassName("playing").length > 1;
    }
  }

})(typeof exports === "undefined" ? this : exports)