;(function () {

  var artist = document.getElementsByClassName("szi-artist")[0].innerHTML,
      track = document.getElementsByClassName("szi-song")[0].innerHTML;

  var parseTrackSearch = function () {
    var response = JSON.parse(this.responseText),
        tracks = validateTrackArtist(response.tracks);
    if (tracks.length === 0) {
      searchForArtist();
    } else {
      window.location = tracks[0].href;
    }
  };

  (function () {
    var spotifyTrackSearch = new XMLHttpRequest();
    spotifyTrackSearch.onload = parseTrackSearch;
    spotifyTrackSearch.open("get", 
      "http://ws.spotify.com/search/1/track.json?q=" + track.replace(/\s/g, "%20"));
    spotifyTrackSearch.send();
  })();

  // TO DO: dedupe exact matches
  var validateTrackArtist = function (tracks) {
    return tracksWithArtist = tracks.filter(function (thisTrack) {
      return (indexOfArtistName(thisTrack.artists, artist) > -1);
    });
  };

  var indexOfArtistName = function (array, artistName) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].name.toLowerCase() === artistName.toLowerCase()) {
        return i;
      }
    }
    return -1;
  };

  var searchForArtist = function () {
    var spotifyArtistSearch = new XMLHttpRequest();
    spotifyArtistSearch.onload = parseArtistSearch;
    spotifyArtistSearch.open("get", 
      "http://ws.spotify.com/search/1/artist.json?q=" + artist.replace(/\s/g, "%20"));
    spotifyArtistSearch.send();
  };

  var parseArtistSearch = function () {
    var response = JSON.parse(this.responseText),
        numResults = response.info.num_results;
    if (numResults === 0) {
      showNotFoundMessage();
    } else {
      showArtistOptions(response.artists);
    }
  };

  var showNotFoundMessage = function () {
    var modalContent = addModal("small"),
        modalHeader = document.createElement("h2"),
        modalExplanation = document.createElement("h3");

    modalHeader.innerHTML = "Not Found";
    modalContent.appendChild(modalHeader);

    modalExplanation.innerHTML = "<p>Sorry, I couldn't find the track '" + track 
      + "' or the artist " + artist + " on Spotify.</p><p>Try again with the next song you like.</p>";
    modalContent.appendChild(modalExplanation); 
  };

  var showArtistOptions = function (artists) {
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

  };

  var showTrackOptions = function (tracks) {
    var modalContent = addModal("large"),
        modalHeader = document.createElement("h2"),
        trackList = listEl();

    modalHeader.innerHTML = "Matching Tracks on Spotify";
    modalContent.appendChild(modalHeader);

    console.log(tracks);
    console.log(trackList);

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

  };

  var listEl = function () {
    var listContainer = document.createElement("ul");
    listContainer.style.fontSize = "20px";
    return listContainer;
  };

  var addModal = function (type) {
    var htmlEl = document.getElementsByTagName("html")[0],
        firstBodyEl = document.body.firstChild;

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
    modalContent.style.padding = "10px 15px";
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
    htmlEl.style.overflow = "hidden";
  
    document.body.insertBefore(overlay, modal);
    
    return modalContent;
  };

  var closeModal = function () {
    document.body.removeChild(document.getElementById("add-to-spotify-overlay"));
    document.body.removeChild(document.getElementById("add-to-spotify-modal"));
  };

  // cross-browser event binder
  var bindEvent = function (element, event, thisFunction) {
    if (element.addEventListener) {
      element.addEventListener(event, thisFunction);
    } else {
      element.attachEvent(event, thisFunction);
    }
  };

  // shims

  if (Array.prototype.map === undefined) {
    Array.prototype.map = function (thisFunction) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        result.push(thisFunction(this[i]));
      }
      return result;
    }
  }

  if (Array.prototype.filter === undefined) {
    Array.prototype.filter = function (thisFunction) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        if (thisFunction(this[i])) {
          result.push(this);
        }
      }
      return result;
    }
  }

})();