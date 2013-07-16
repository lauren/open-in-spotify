;(function (exports) {

  var searchForArtist = function (artistName, successCallback) {
    var spotifyUrl = "http://ws.spotify.com/search/1/artist.json?q="
      + artistName.replace(/\s/g, "%20");
    querySpotify(spotifyUrl, successCallback);
  };

  var searchForTrack = function (trackName, successCallback) {
    var spotifyUrl = "http://ws.spotify.com/search/1/track.json?q="
      + trackName.replace(/\s/g, "%20");
    querySpotify(spotifyUrl, successCallback);
  };

  var querySpotify = function (spotifyUrl, callback) {
    ajaxRequest(spotifyUrl, callback, function (error) {
      throw "Can't connect to Spotify.";
    });
  };

  var validateTrackArtist = function (tracks, artist) {
    return tracks.filter(function (thisTrack) {
      return (indexOfArtistName(thisTrack.artists, artist) > -1);
    });
  };

  var dedupeTracks = function (tracks) {
    tracks = sanitizeTrackAndAlbumNames(tracks.reverse());
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

  var spotifyQuerier = {
    ajaxRequest: function (url, successCallback, errorCallback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = successCallback;
      xhr.onerror = errorCallback;
      xhr.open("get", url);
      xhr.send();
    },
    getTracks: function (track, artist, callback) {
      searchForTrack(track, function () {
        var response = JSON.parse(this.responseText),
            validTracks = validateTrackArtist(response.tracks, artist),
            tracks = dedupeTracks(validTracks);
        callback(tracks);
      });
    },
    getArtists: function (artist, callback) {
      searchForArtist(artist, function () {
        var response = JSON.parse(this.responseText),
            artists = response.artists;
        callback(artists);
      });
    }
  };

  exports.spotifyQuerier = spotifyQuerier;

})(typeof exports === "undefined" ? this : exports);