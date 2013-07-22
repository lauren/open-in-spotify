;(function (exports) {

  // strip punctuation from artist, track, and album so deduping ignores it
  var sanitizeTrackMetadata = function (tracks) {
    var newTracks = tracks.map(function (thisTrack) {
      thisTrack.name = thisTrack.name.replace(/[\.,-\/#!\$%\^&\*;:{}=\-_`~\(\)]/g,"");
      thisTrack.name = thisTrack.name.replace(/\s{2,}/g," ");
      thisTrack.album.name = thisTrack.album.name.replace(/[\.,-\/#!\$%\^&\*;:{}=\-_`~\(\)]/g,"");
      thisTrack.album.name = thisTrack.album.name.replace(/\s{2,}/g," ");
      thisTrack.artists = thisTrack.artists.map(function (artist) {
        artist.name = artist.name.replace(/[\.,-\/#!\$%\^&\*;:{}=\-_`~\(\)]/g,"");
        artist.name = artist.name.replace(/\s{2,}/g," ");
        return artist;
      });
      return thisTrack;
    });
    return newTracks;
  };

  // returns array of tracks filtered for those where the
  // artist name on the page is present in the array of artists
  var validateTrackArtist = function (tracks, artist) {
    artist = artist.replace(/[\.,-\/#!\$%\^&\*;:{}=\-_`~\(\)]/g,"");
    artist = artist.replace(/\s{2,}/g," ");
    return tracks.filter(function (thisTrack) {
      return (indexOfArtistName(thisTrack.artists, artist) > -1);
    });
  };

  // checks array of artist metadata to find which one has
  // a name property matching the artist on the page
  var indexOfArtistName = function (array, artistName) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].name.toLowerCase() === artistName.toLowerCase()) {
        return i;
      }
    }
    return -1;
  };

  // returns array of tracks deduped where the track name AND the
  // album name are the same
  var dedupeTracks = function (tracks) {
    tracks = tracks.reverse();
    var dedupedTracks = tracks.filter(function (thisTrack, index) {
      var otherTracks = tracks.slice(index+1, tracks.length);
      return !findTrackInArray(thisTrack, otherTracks);
    });
    return dedupedTracks.reverse();
  };

  // checks an array of tracks to see which one has a track name
  // and album name matching the provided track
  var findTrackInArray = function (track, otherTracks) {
    for (var i = 0; i < otherTracks.length; i++) {
      if ((track.name === otherTracks[i].name)
        && (track.album.name === otherTracks[i].album.name)) {
          return true;
      }
    }
    return false;
  };

  var errorCallback = function (error) {
    throw "Can't connect to Spotify.";
  };

  var spotifyQuerier = {
    ajaxRequest: function (url, successCallback, errorCallback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = successCallback;
      xhr.onerror = errorCallback;
      xhr.open("get", url);
      xhr.send();
    },
    // sanitizes, validates, and dedupes tracks before passing to
    // provided callback
    getTracks: function (track, artist, callback) {
      var spotifyUrl = "http://ws.spotify.com/search/1/track.json?q="
        + track.replace(/\s/g, "%20");
      this.ajaxRequest(spotifyUrl, function () {
        var response = JSON.parse(this.responseText),
            sanitizedTracks = sanitizeTrackMetadata(response.tracks),
            validTracks = validateTrackArtist(sanitizedTracks, artist),
            tracks = dedupeTracks(validTracks);
        callback(tracks);
      }, errorCallback);
    },
    // parses response and sends only artists to provided callback
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