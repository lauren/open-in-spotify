;(function () {

  var render = {
    showTrackOptions: function (tracks) {
      var modalContent = addModal("large"),
          modalHeader = document.createElement("h2"),
          trackList = listEl();

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

      pauseSourceSiteMusic();

    },

    showArtistOptions: function (artists) {
      var modalContent = addModal("large"),
          modalHeader = document.createElement("h2"),
          modalCaveat = document.createElement("h3"),
          artistList = listEl();

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

      pauseSourceSiteMusic();

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
    }

  };

  var listEl = function () {
    var listContainer = document.createElement("ul");
    listContainer.style.fontSize = "20px";
    return listContainer;
  };

  var closeModal = function () {
    document.body.removeChild(document.getElementById("add-to-spotify-overlay"));
    document.body.removeChild(document.getElementById("add-to-spotify-modal"));
    document.body.style.overflow = "auto";
    sourceSiteData.htmlEl.style.overflow = "auto";
    resumeSourceSiteMusic();
  };

  var addModal = function (type) {
    var firstBodyEl = document.body.firstChild;

    var modal = document.createElement("div");
    modal.id = "add-to-spotify-modal";
    modal.style.margin = "auto auto";
    modal.style.background = "#fff";
    modal.style.zIndex = 1450;
    modal.style.position = "fixed";
    modal.style.left = "0";
    modal.style.right = "0";
    modal.style.top = "0";
    modal.style.bottom = "0";
    modal.style.overflow = "auto";
    modal.style.width = type === "small" ? "400px" : "70%";
    modal.style.height = type === "small" ? "200px" : "90%";
    modal.style.borderRadius = "5px";

    var closeBox = document.createElement("div");
    closeBox.id = "close-spotify-modal";
    closeBox.style.position = "absolute";
    closeBox.style.height = "auto";
    closeBox.style.width = "auto";
    closeBox.style.right = "0";
    closeBox.style.top = "0";
    closeBox.style.fontSize = "40px";
    closeBox.style.lineHeight = "25px";
    closeBox.style.padding = "10px";
    closeBox.style.borderLeft = "1px solid #666";
    closeBox.style.borderBottom = "1px solid #666";
    closeBox.style.borderRight = "1px solid #666";
    closeBox.style.cursor = "pointer";
    closeBox.innerHTML = "&times;";
    modal.appendChild(closeBox);

    var modalContent = document.createElement("div");
    modalContent.id = "add-to-spotify-modal-content";
    modalContent.style.padding = "15px";
    modal.appendChild(modalContent);

    document.body.insertBefore(modal, firstBodyEl);

    bindEvent(closeBox, "click", closeModal);

    var overlay = document.createElement("div");
    overlay.id = "add-to-spotify-overlay";
    overlay.style.background = "#000";
    overlay.style.opacity = 0.7;
    overlay.style.zIndex = 1400;
    overlay.style.height = parseInt(window.screen.height + 20, 10) + "px";
    overlay.style.width = "100%";
    overlay.style.marginTop = "-15px";
    overlay.style.position = "absolute";
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

  var pauseSourceSiteMusic = function () {
    if (sourceSiteData.currentlyPlaying) {
      sourceSiteData.pauseButton.click();
    }
  };

  var resumeSourceSiteMusic = function () {
    if (sourceSiteData.currentlyPlaying) {
      sourceSiteData.pauseButton.click();
    }
  };

  exports.render = render;

})();