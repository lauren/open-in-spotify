;(function (exports) {

  // grabs artist, track, and album from each supported site. TODO: use album
  // to further refine results when available.
  exports.selectors = {
    Songza: function () {
      this.artist = document.getElementsByClassName("szi-artist")[0].innerHTML;
      this.track = document.getElementsByClassName("szi-song")[0].innerHTML;
    },
    Pandora: function () {
      this.track = document.getElementsByClassName("songTitle")[0].innerHTML;
      this.artist = document.getElementsByClassName("artistSummary")[0].innerHTML;
      this.album = document.getElementsByClassName("albumTitle")[0].innerHTML;
    },
    TurntableFM: function () {
      this.track = document.getElementsByClassName("songboard-title")[0].innerHTML;
      this.artist = document.getElementsByClassName("songboard-artist")[0].innerHTML;
    },
    LastFM: function () {
      this.track = document.getElementsByClassName("track")[0].children[0].innerHTML;
      this.artist = document.getElementsByClassName("artist")[0].children[0].innerHTML;
      this.album = document.getElementsByClassName("title")[0].children[0].innerHTML;
    }
  };

})(typeof exports === "undefined" ? this : exports);