;(function (exports) {

  var trackSearch = function (spotifyJson) {
    var response = JSON.parse(spotifyJson),
        validTracks = validateTrackArtist(response.tracks),
        tracks = dedupeTracks(validTracks);
    if (tracks.length === 0) {
      spotifyQuerier.searchForArtist(artistSearch, render.showError, sourceSiteData.artist);
    } else if (tracks.length === 1) {
      render.openInSpotify(tracks[0].href);
    } else {
      render.showTrackOptions(tracks);
    }
  };

  var artistSearch = function (spotifyJson) {
    var response = JSON.parse(this.responseText),
        numResults = response.info.num_results;
    if (numResults === 0) {
      render.showNotFoundMessage();
    } else {
      render.showArtistOptions(response.artists);
    }
  };

  var openInSpotify = function (spotifyHref) {
    window.location = spotifyHref;
  };

  var validateTrackArtist = function (tracks) {
    return tracks.filter(function (thisTrack) {
      return (indexOfArtistName(thisTrack.artists, sourceSiteData.artist) > -1);
    });
  };

  var dedupeTracks = function (tracks) {
    var tracks = sanitizeTrackAndAlbumNames(tracks.reverse());
    var dedupedTracks = tracks.filter(function (thisTrack, index) {
      var otherTracks = tracks.slice(index+1, tracks.length);
      return !findTrackInArray(thisTrack, otherTracks);
    });
    return dedupedTracks.reverse();
  };

  var sanitizeTrackAndAlbumNames = function (tracks) {
    return tracks.map(function (thisTrack) {
      thisTrack.name = thisTrack.name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      thisTrack.name = thisTrack.name.replace(/\s{2,}/g," ");
      thisTrack.album.name = thisTrack.album.name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      thisTrack.album.name = thisTrack.album.name.replace(/\s{2,}/g," ");
      return thisTrack;
    });
  };

  var findTrackInArray = function (track, otherTracks) {
    for (var i = 0; i < otherTracks.length; i++) {
      if ((track.name === otherTracks[i].name) 
        && (track.album.name === otherTracks[i].album.name)) {
          return true;
      }
    }
    return false;
  };

  var indexOfArtistName = function (array, artistName) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].name.toLowerCase() === artistName.toLowerCase()) {
        return i;
      }
    }
    return -1;
  };

  exports.router = {
  	trackSearch: trackSearch,
  	artistSearch: artistSearch
  };

})(typeof exports === "undefined" ? this : exports);