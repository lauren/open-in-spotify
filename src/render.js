;(function (exports) {

  var render = {
    // adds modal to DOM, lists tracks in the modal, and pauses music
    showTrackOptions: function (tracks) {
      var modal = addModal("large"),
          modalContent = modal.lastElementChild,
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
      musicController.pause();
      modal.className += " visible";
    },

    // adds modal to DOM, lists artists in the modal, and pauses music
    showArtistOptions: function (artists) {
      var modal = addModal("large"),
          modalContent = modal.lastElementChild,
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
      musicController.pause();
      modal.className += " visible";
    },

    showNotFoundMessage: function (track, artist) {
      var modal = addModal("small"),
          modalContent = modal.lastElementChild,
          modalHeader = document.createElement("h2"),
          modalExplanation = document.createElement("h3");

      modalHeader.innerHTML = "Not Found";
      modalContent.appendChild(modalHeader);

      modalExplanation.innerHTML = "<p>Sorry, I couldn't find the track '" + track
        + "' or the artist '" + artist
        + "' on Spotify.</p><p>Try again with the next song you like.</p>";
      modalContent.appendChild(modalExplanation);
      musicController.pause();
      modal.className += " visible";
    },

    showUnsupportedSiteMessage: function () {
      var modal = addModal("small"),
          modalContent = modal.lastElementChild,
          modalHeader = document.createElement("h2"),
          modalExplanation = document.createElement("h3");

      modalHeader.innerHTML = "Site Not Supported";
      modalContent.appendChild(modalHeader);

      modalExplanation.innerHTML = "<p>Sorry, I can't open songs from "
        + window.location.hostname + " in Spotify.</p>"
        + "<p>Try adding a song from <a href='http://songza.com'>Songza</a> or "
        + "<a href='http://last.fm'>Last.fm</a>.</p>";
      modalContent.appendChild(modalExplanation);
      modal.className += " visible";
    },

    // message informing user she's on a supported site but not
    // on a page with music. custom message depending on site
    // provides instructions to find music.
    showWrongPageMessage: function (site) {
      var modal = addModal("small"),
          modalContent = modal.lastElementChild,
          modalHeader = document.createElement("h2"),
          modalExplanation = document.createElement("h3");

      var findPlaylistsAt = function () {
        if (site === "Songza") {
          return "Go to the <a href='http://songza.com'>Music Concierge</a> and select a station. ";
        } else if (site === "Pandora") {
          return "Go to the <a href='http://pandora.com'>homepage</a> and search for "
            + "an artist to create a radio station. ";
        } else if (site === "turntable.fm") {
          return "Go to the <a href='http://turntable.fm'>homepage</a> and find a room to join. ";
        } else if (site === "last.fm") {
          return "Go to the <a href='http://last.fm'>homepage</a> and find a station to listen to. ";
        } else {
          return "Go ";
        }
      };

      modalHeader.innerHTML = "No Songs Detected";
      modalContent.appendChild(modalHeader);

      modalExplanation.innerHTML = "<p>You're almost there!</p>"
        + "<p>" + findPlaylistsAt() + "Then you'll be able to open songs from "
        + site + " in Spotify.";
      modalContent.appendChild(modalExplanation);
      modal.className += " visible";
    },

    showError: function (event) {
      var modal = addModal("small"),
          modalContent = modal.lastElementChild,
          modalHeader = document.createElement("h2"),
          modalExplanation = document.createElement("h3");

      modalHeader.innerHTML = "Can't connect to Spotify";
      modalContent.appendChild(modalHeader);

      modalExplanation.innerHTML = "<p>Sorry, I can't connect to Spotify right now.</p>"
        + "<p>Try again with the next song you like.</p>" + event.target.status;
      modalContent.appendChild(modalExplanation);
      modal.className += " visible";
    },

    // directly opens track when only one valid track result is found
    openInSpotify: function (track) {
      musicController.pause();
      window.location = track.href;
    }

  };

  // cleans overlay, modal, and stylesheet off DOM,
  // resets body and html overflow, resumes music
  var closeModal = function () {
    document.getElementById("add-to-spotify-modal").className
      = document.getElementById("add-to-spotify-modal").className.replace(" visible", "");
    setTimeout(function () {
      document.body.removeChild(document.getElementById("add-to-spotify-overlay"));
      document.body.removeChild(document.getElementById("add-to-spotify-modal"));
      document.head.removeChild(document.getElementById("add-to-spotify-stylesheet"));
      document.body.style.overflow = "auto";
      document.getElementsByTagName("html")[0].style.overflow = "auto";
      musicController.play();
    }, 500);
  };

  // adds stylesheet link, overlay, and modal to DOM. modal includes
  // close box and content div. returns the modal div so recipient
  // functions can add custom content to the modal and fade it in.
  var addModal = function (type, currentlyPlaying, playButton) {
    var styleSheetLink = document.createElement("link");
    styleSheetLink.type = "text/css";
    styleSheetLink.rel = "stylesheet";
    styleSheetLink.id = "add-to-spotify-stylesheet";
    // cloudfront url for production, s3 url for testing
    styleSheetLink.href = "http://d39ywk3d3wha95.cloudfront.net/save-to-spotify.css";
    // styleSheetLink.href = "http://save-to-spotify.s3.amazonaws.com/test/save-to-spotify.css";
    document.head.appendChild(styleSheetLink);

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

    bindEvent(closeBox, "click", function () {
      closeModal();
    });

    var overlay = document.createElement("div");
    overlay.id = "add-to-spotify-overlay";
    overlay.className = "add-to-spotify-overlay";
    overlay.style.height = parseInt(window.screen.height + 20, 10) + "px";
    document.body.style.overflow = "hidden";
    document.getElementsByTagName("html")[0].style.overflow = "hidden";

    document.body.insertBefore(overlay, modal);

    return modal;
  };

  // cross-browser event binder
  var bindEvent = function (element, event, thisFunction) {
    if (element.addEventListener) {
      element.addEventListener(event, thisFunction);
    } else {
      element.attachEvent(event, thisFunction);
    }
  };

  exports.render = render;

})(typeof exports === "undefined" ? this : exports);