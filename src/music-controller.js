;(function (exports) {

  // grabs play and pause buttons from each supported site.
  // currentlyPlaying records whether music was playing at the time
  // the bookmarklet was invoked.
  var musicController = function (site) {
    if (site === "Songza") {
      this.pauseButton = document.getElementsByClassName("szi-pause")[0];
      this.playButton = document.getElementsByClassName("szi-play")[0];
      this.currentlyPlaying = document.getElementsByClassName("szi-player-state-play").length > 0;
    } else if (site === "Pandora") {
      this.pauseButton = document.getElementsByClassName("pauseButton")[0];
      this.playButton = this.pauseButton;
      this.currentlyPlaying = this.pauseButton.style.display === "block";
    } else if (site === "TurntableFM") {
      this.currentlyPlaying = false; // no pause button on turntable.fm, so skip pausing music
    } else if (site === "LastFM") {
      this.pauseButton = document.getElementById("radioControlPause").children[0];
      this.playButton = document.getElementById("radioControlPlay").children[0];
      this.currentlyPlaying = document.getElementsByClassName("playing").length > 1;
    }
  };

  musicController.prototype.pause = function () {
    if (this.currentlyPlaying) {
      this.pauseButton.click();
    }
  };

  musicController.prototype.play = function () {
    if (this.currentlyPlaying) {
      this.playButton.click();
    }
  };

  exports.musicController = musicController;

})(typeof exports === "undefined" ? this : exports);  