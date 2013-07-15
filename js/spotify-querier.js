;(function (exports) {

	var spotifyQuerier = {
		ajaxRequest: function (successCallback, errorCallback, url) {
			var xhr = new XMLHttpRequest();
			xhr.onload = successCallback;
			xhr.onerror = errorCallback;
			xhr.open("get", url);
			xhr.send()
		},
		searchForArtist: function (successCallback, errorCallback, artistName) {
			var spotifyUrl = "http://ws.spotify.com/search/1/artist.json?q=" 
      			+ artistName.replace(/\s/g, "%20");
			this.ajaxRequest(successCallback, errorCallback, spotifyUrl);
		},
		searchForTrack: function (successCallback, errorCallback, trackName) {
			var spotifyUrl = "http://ws.spotify.com/search/1/track.json?q=" 
      			+ trackName.replace(/\s/g, "%20");
			this.ajaxRequest(successCallback, errorCallback, spotifyUrl);
		}
	};

	exports.spotifyQuerier = spotifyQuerier;

})(typeof exports === "undefined" ? this : exports);