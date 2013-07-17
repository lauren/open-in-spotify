;(function (exports) {

  var pauseButtonGetter = function () {
    sourceSiteData.pauseButton = document.getElementsByClassName("szi-pause")[0];

  }

  var render = {
    showTrackOptions: function (tracks) {
      var modalContent = addModal("large"),
          modalHeader = document.createElement("h2"),
          trackList = document.createElement("ul");

      modalHeader.innerHTML = "Matching Tracks on Spotify";
      modalContent.appendChild(modalHeader);

      tracks.map(function (track) {
        var trackItemEl = document.createElement("li"),
            firstArtist = track.artists[0];
        trackItemEl.innerHTML = "<a href='" + track.href + "'>"
          + track.name
          + "</a> by <a href='" + firstArtist.href + "'>"
          + firstArtist.name + "</a> from the album "
          + "<em><a href='" + track.album.href + "'></em>"
          + track.album.name + "</a>.";
        trackList.appendChild(trackItemEl);
      });

      modalContent.appendChild(trackList);

      this.pauseSourceSiteMusic();

    },

    showArtistOptions: function (artists) {
      var modalContent = addModal("large"),
          modalHeader = document.createElement("h2"),
          modalCaveat = document.createElement("h3"),
          artistList = document.createElement("ul");

      modalCaveat.innerHTML = "<p>Sorry! I couldn't find the exact track you're listening to on Spotify.</p>";
      modalContent.appendChild(modalCaveat);

      modalHeader.innerHTML = "Matching Artists on Spotify";
      modalContent.appendChild(modalHeader);

      artists.map(function (artist) {
        var artistItemEl = document.createElement("li");
        artistItemEl.innerHTML = "<a href='" + artist.href + "'>" + artist.name + "</a>";
        artistList.appendChild(artistItemEl);
      });

      modalContent.appendChild(artistList);

      this.pauseSourceSiteMusic();

    },

    showNotFoundMessage: function () {
      var modalContent = addModal("small"),
          modalHeader = document.createElement("h2"),
          modalExplanation = document.createElement("h3");

      modalHeader.innerHTML = "Not Found";
      modalContent.appendChild(modalHeader);

      modalExplanation.innerHTML = "<p>Sorry, I couldn't find the track '" + sourceSiteData.track
        + "' or the artist " + sourceSiteData.artist
        + " on Spotify.</p><p>Try again with the next song you like.</p>";
      modalContent.appendChild(modalExplanation);
    },

    showUnsupportedSiteMessage: function () {
      var modalContent = addModal("small"),
          modalHeader = document.createElement("h2"),
          modalExplanation = document.createElement("h3");

      modalHeader.innerHTML = "Site Not Supported";
      modalContent.appendChild(modalHeader);

      modalExplanation.innerHTML = "<p>Sorry, I can't save to spotify from "
        + window.location.hostname + ".</p>"
        + "<p>Try adding a song from Songza, Pandora, or Turntable.fm.</p>";
      modalContent.appendChild(modalExplanation);
    },

    showError: function (event) {
      var modalContent = addModal("small"),
          modalHeader = document.createElement("h2"),
          modalExplanation = document.createElement("h3");

      modalHeader.innerHTML = "Can't connect to Spotify";
      modalContent.appendChild(modalHeader);

      modalExplanation.innerHTML = "<p>Sorry, I can't connect to Spotify right now.</p>"
        + "<p>Try again with the next song you like.</p>" + event.target.status;
      modalContent.appendChild(modalExplanation);
    },

    pauseSourceSiteMusic: function () {
      if (sourceSiteData.currentlyPlaying) {
        sourceSiteData.pauseButton.click();
      }
    },

    openInSpotify: function (track) {
      this.pauseSourceSiteMusic();
      window.location = track.href;
    }

  };

  var closeModal = function () {
    document.body.removeChild(document.getElementById("add-to-spotify-overlay"));
    document.body.removeChild(document.getElementById("add-to-spotify-modal"));
    document.head.removeChild(document.getElementById("add-to-spotify-stylesheet"));
    document.body.style.overflow = "auto";
    sourceSiteData.htmlEl.style.overflow = "auto";
    resumeSourceSiteMusic();
  };

  var addModal = function (type) {
    var styleSheetLink = document.createElement("link");
    styleSheetLink.type = "text/css";
    styleSheetLink.rel = "stylesheet";
    styleSheetLink.id = "add-to-spotify-stylesheet";
    styleSheetLink.href = "http://d39ywk3d3wha95.cloudfront.net/save-to-spotify.css";
    sourceSiteData.headEl.appendChild(styleSheetLink);

    var firstBodyEl = document.body.firstChild;

    var modal = document.createElement("div");
    modal.id = "add-to-spotify-modal";
    modal.className = "add-to-spotify-modal " + type;

    var closeBox = document.createElement("div");
    closeBox.id = "close-spotify-modal";
    closeBox.className = "close-modal";
    closeBox.innerHTML = "&times;";
    modal.appendChild(closeBox);

    var modalContent = document.createElement("div");
    modalContent.id = "add-to-spotify-modal-content";
    modalContent.className = "modal-content";
    modal.appendChild(modalContent);

    document.body.insertBefore(modal, firstBodyEl);

    bindEvent(closeBox, "click", closeModal);

    var overlay = document.createElement("div");
    overlay.id = "add-to-spotify-overlay";
    overlay.className = "add-to-spotify-overlay";
    overlay.style.height = parseInt(window.screen.height + 20, 10) + "px";
    document.body.style.overflow = "hidden";
    sourceSiteData.htmlEl.style.overflow = "hidden";

    document.body.insertBefore(overlay, modal);

    return modalContent;
  };

  // cross-browser event binder
  var bindEvent = function (element, event, thisFunction) {
    if (element.addEventListener) {
      element.addEventListener(event, thisFunction);
    } else {
      element.attachEvent(event, thisFunction);
    }
  };

  var resumeSourceSiteMusic = function () {
    if (sourceSiteData.currentlyPlaying) {
      sourceSiteData.pauseButton.click();
    }
  };

  exports.render = render;

})(typeof exports === "undefined" ? this : modalExplanation);