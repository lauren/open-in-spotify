;(function (exports) {

  var errorCallback = function (error) {
    throw "Can't connect to Spotify.";
  };

  var sanitizeTrackAndAlbumNames = function (tracks) {
    var newTracks = tracks.map(function (thisTrack) {
      thisTrack.name = thisTrack.name.replace(/[\.,-\/#!\$%\^&\*;:{}=\-_`~\(\)]/g,"");
      thisTrack.name = thisTrack.name.replace(/\s{2,}/g," ");
      thisTrack.album.name = thisTrack.album.name.replace(/[\.,-\/#!\$%\^&\*;:{}=\-_`~\(\)]/g,"");
      thisTrack.album.name = thisTrack.album.name.replace(/\s{2,}/g," ");
      thisTrack.artists[0].name = thisTrack.artists[0].name.replace(/[\.,-\/#!\$%\^&\*;:{}=\-_`~\(\)]/g,"");
      thisTrack.artists[0].name = thisTrack.artists[0].name.replace(/\s{2,}/g," ");
      return thisTrack;
    });
    return newTracks;
  };

  var validateTrackArtist = function (tracks, artist) {
    artist = artist.replace(/[\.,-\/#!\$%\^&\*;:{}=\-_`~\(\)]/g,"");
    artist = artist.replace(/\s{2,}/g," ");
    return tracks.filter(function (thisTrack) {
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

  var dedupeTracks = function (tracks) {
    tracks = tracks.reverse();
    var dedupedTracks = tracks.filter(function (thisTrack, index) {
      var otherTracks = tracks.slice(index+1, tracks.length);
      return !findTrackInArray(thisTrack, otherTracks);
    });
    return dedupedTracks.reverse();
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

  var spotifyQuerier = {
    ajaxRequest: function (url, successCallback, errorCallback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = successCallback;
      xhr.onerror = errorCallback;
      xhr.open("get", url);
      xhr.send();
    },
    getTracks: function (track, artist, callback) {
      var spotifyUrl = "http://ws.spotify.com/search/1/track.json?q="
        + track.replace(/\s/g, "%20");
      this.ajaxRequest(spotifyUrl, function () {
        var response = JSON.parse(this.responseText),
            sanitizedTracks = sanitizeTrackAndAlbumNames(response.tracks),
            validTracks = validateTrackArtist(sanitizedTracks, artist),
            tracks = dedupeTracks(validTracks);
        callback(tracks);
      }, errorCallback);
    },
    getArtists: function (artist, callback) {
      var spotifyUrl = "http://ws.spotify.com/search/1/artist.json?q="
        + artist.replace(/\s/g, "%20");
      this.ajaxRequest(spotifyUrl, function () {
        var response = JSON.parse(this.responseText),
            artists = response.artists;
        callback(artists);
      }, errorCallback);
    }
  };

  exports.spotifyQuerier = spotifyQuerier;

})(typeof exports === "undefined" ? this : exports);