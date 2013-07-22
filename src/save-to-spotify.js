;(function (exports) {

  var thisMusicController;

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
      render.showError(e);
    }
  };

  SaveToSpotify.prototype.displayTracksOrArtists = function (tracks) {
    var self = this;
    if (tracks.length === 0) {
      spotifyQuerier.getArtists(this.siteInfo.artist, function (artists) {
        self.displayArtists.call(self, artists);
      });
    } else if (tracks.length === 1) {
      render.openInSpotify(tracks[0]);
    } else {
      render.showTrackOptions(tracks);
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
    case "songza.com": case "www.songza.com":
      try {
        var siteInfo = new selectors.Songza();
        musicController = new musicController("Songza");
      } catch (e) {
        render.showWrongPageMessage("Songza");
      }
      new SaveToSpotify(siteInfo).displayResults();
      break;
    case "turntable.fm": case "www.turntable.fm":
      try {
        var siteInfo = new selectors.TurntableFM();
        musicController = new musicController("TurntableFM");
      } catch (e) {
        render.showWrongPageMessage("turntable.fm");
      }
      new SaveToSpotify(siteInfo).displayResults();
      break;
    case "last.fm": case "www.last.fm":
      try {
        var siteInfo = new selectors.LastFM();
        musicController = new musicController("LastFM");
      } catch (e) {
        render.showWrongPageMessage("last.fm");
      }
      new SaveToSpotify(siteInfo).displayResults();
      break;
    case "pandora.com": case "www.pandora.com":
      try {
        var siteInfo = new selectors.Pandora();
        musicController = new musicController("Pandora");
      } catch (e) {
        render.showWrongPageMessage("Pandora");
      }
      new SaveToSpotify(siteInfo).displayResults();
      break;
    default:
      render.showUnsupportedSiteMessage();
      break;
  }

  exports.thisMusicController = thisMusicController;

})(typeof exports === "undefined" ? this : exports);