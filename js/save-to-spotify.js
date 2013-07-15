;(function (exports) {

	var sourceSiteData = {
    htmlEl: document.getElementsByTagName("html")[0]
  };

	switch (window.location.hostname) {
	  case "songza.com":
	    sourceSiteData.artist = document.getElementsByClassName("szi-artist")[0].innerHTML;
	    sourceSiteData.track = document.getElementsByClassName("szi-song")[0].innerHTML;
	    sourceSiteData.pauseButton = document.getElementsByClassName("szi-pause")[0];
	    sourceSiteData.currentlyPlaying = document.getElementsByClassName("szi-player-state-play").length > 0;
	    spotifyQuerier.searchForTrack(function () {
	      router.trackSearch(this.responseText);
	    }, render.showError, sourceSiteData.track);
	    break;
	  default:
	    render.showUnsupportedSiteMessage();
	    break;
	}

	exports.sourceSiteData = sourceSiteData;

})(typeof exports === "undefined" ? this : exports);