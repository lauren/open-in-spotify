;(function (exports) {

  var sourceSiteData = {
      htmlEl: document.getElementsByTagName("html")[0],
      headEl: document.getElementsByTagName("head")[0]
    };

  switch (window.location.hostname) {
    case "songza.com":
      var artist = document.getElementsByClassName("szi-artist")[0].innerHTML,
          track = document.getElementsByClassName("szi-song")[0].innerHTML;
      sourceSiteData.pauseButton = document.getElementsByClassName("szi-pause")[0];
      sourceSiteData.currentlyPlaying = document.getElementsByClassName("szi-player-state-play").length > 0;
      displayResults(track, artist);
      break;
    default:
      render.showUnsupportedSiteMessage();
      break;
  }

  var displayResults = function (track, artist) {
    try {
      spotifyQuerier.getTracks(track, artist, function (tracks) { displayTracksOrArtists(tracks, artist); });
    } catch (e) {
      render.showError(e);
    }
  };

  var displayTracksOrArtists = function (tracks, artist) {
    if (tracks.length === 0) {
      spotifyQuerier.getArtists(artist, displayArtists);
    } else if (tracks.length === 1) {
      render.openInSpotify(tracks[0]);
    } else {
      render.showTrackOptions(tracks);
    } 
  };

  var displayArtists = function (artists) {
    if (artists.length === 0) {
      render.showNotFoundMessage();
    } else {
      render.showArtistOptions(artists);
    }
  };

  exports.sourceSiteData = sourceSiteData;

})(typeof exports === "undefined" ? this : exports);