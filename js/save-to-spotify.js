;(function (exports) {

  var SaveToSpotify = function (siteInfo) {
    this.siteInfo = siteInfo;
  };

  SaveToSpotify.prototype.displayResults = function () {
    var self = this;
    try {
      spotifyQuerier.getTracks(this.siteInfo.track, this.siteInfo.artist, function (tracks) {
        self.displayTracksOrArtists.call(self,tracks);
      });
    } catch (e) {
      render.showError(e, self.siteInfo.currentlyPlaying, self.siteInfo.pauseButton);
    }
  };

  SaveToSpotify.prototype.displayTracksOrArtists = function (tracks) {
    var self = this;
    if (tracks.length === 0) {
      spotifyQuerier.getArtists(this.siteInfo.artist, function (artists) {
        self.displayArtists.call(self, artists);
      });
    } else if (tracks.length === 1) {
      render.openInSpotify(tracks[0], this.siteInfo.currentlyPlaying, this.siteInfo.pauseButton);
    } else {
      render.showTrackOptions(tracks, this.siteInfo.currentlyPlaying, this.siteInfo.pauseButton);
    }
  };

  SaveToSpotify.prototype.displayArtists = function (artists) {
    if (artists.length === 0) {
      render.showNotFoundMessage(this.siteInfo.track, this.siteInfo.artist);
    } else {
      render.showArtistOptions(artists);
    }
  };

  switch (window.location.hostname) {
    case "songza.com":
      try {
        var siteInfo = new selectors.Songza();
      } catch (e) {
        render.showWrongPageMessage("Songza");
      }
      new SaveToSpotify(siteInfo).displayResults();
      break;
    default:
      render.showUnsupportedSiteMessage();
      break;
  }

})(typeof exports === "undefined" ? this : exports);