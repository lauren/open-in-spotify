var assert = require('assert');
var spotifyQuerier = require('../js/spotify-querier').spotifyQuerier;

describe('spotifyQuerier', function () {

  var stubXHR = function () {
    global.XMLHttpRequest = function () {
      this.send = function () {
        this.onload();
      };
      this.open = function () {};
    };
  };

  var unstubXHR = function () {
    global.XMLHttpRequest = undefined;
  };

  describe('#ajaxRequest()', function () {

    it('should call the success callback when it finishes', function (done) {
      stubXHR();
      spotifyQuerier.ajaxRequest(undefined, function () {done();});
      unstubXHR();
    });

    it('should call the failure callback when it finishes', function (done) {
      global.XMLHttpRequest = function () {
        this.send = function () {
          this.onerror();
        };
        this.open = function () {};
      };
      spotifyQuerier.ajaxRequest(undefined, undefined, function () {done();});
      unstubXHR();
    });
  });

  describe('#getTracks()', function () {
    var sampleResults = JSON.stringify({
      "info": {
        "num_results": 261,
        "limit": 100,
        "offset": 0,
        "query": "no scrubs",
        "type": "track",
        "page": 1
      },
      "tracks": [
        {
          "album": {
            "released": "1992",
            "href": "spotify:album:1CvjjpvqVMoyprsf74bpYW",
            "name": "Fanmail",
            "availability": {
              "territories": "AD AT AU BE CA CH DE DK EE ES FI FR GB IE IS IT LI LT LU LV MC MX MY NL NO NZ PL PT SE SG US"
            }
          },
          "name": "No Scrubs",
          "popularity": "0.69604",
          "external-ids": [
            {
              "type": "isrc",
              "id": "USLF29900479"
            }
          ],
          "length": 214.649,
          "href": "spotify:track:1KGi9sZVMeszgZOWivFpxs",
          "artists": [
            {
              "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
              "name": "TLC"
            }
          ],
          "track-number": "5"
        },
        {
          "album": {
            "released": "2007",
            "href": "spotify:album:6bTUTKQbRd293kWQoy44Bw",
            "name": "The Best Of TLC",
            "availability": {
              "territories": "AD AT BE CA CH DE DK EE ES FI FR GB IE IS IT LI LT LU LV MC MX NL NO PL PT SE"
            }
          },
          "name": "No Scrubs",
          "popularity": "0.61515",
          "external-ids": [
            {
              "type": "isrc",
              "id": "USLF20000006"
            }
          ],
          "length": 218.623,
          "href": "spotify:track:5iJUGd5boRXsCmW00B3Mtq",
          "artists": [
            {
              "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
              "name": "TLC"
            }
          ],
          "track-number": "1"
        },
        {
          "album": {
            "released": "2003",
            "href": "spotify:album:67HJQvqcIOgjrBgOJEKGln",
            "name": "Now & Forever: The Hits",
            "availability": {
              "territories": "AD AT AU BE CH DE DK EE ES FI FR GB HK IE IS IT LI LT LU LV MC MX MY NL NO PL PT SE SG US"
            }
          },
          "name": "No Scrubs",
          "popularity": "0.57715",
          "external-ids": [
            {
              "type": "isrc",
              "id": "USLF20000006"
            }
          ],
          "length": 218.283,
          "href": "spotify:track:413HT5NjXkaHrZzAy5EdoX",
          "artists": [
            {
              "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
              "name": "TLC"
            }
          ],
          "track-number": "12"
        },
        {
          "album": {
            "released": "2003",
            "href": "spotify:album:67HJQvqcIOgjrBgOJEKGln",
            "name": "Now & Forever: The Hits",
            "availability": {
              "territories": "AD AT AU BE CH DE DK EE ES FI FR GB HK IE IS IT LI LT LU LV MC MX MY NL NO PL PT SE SG US"
            }
          },
          "name": "No Scrubs",
          "popularity": "0.57715",
          "external-ids": [
            {
              "type": "isrc",
              "id": "USLF20000006"
            }
          ],
          "length": 218.283,
          "href": "spotify:track:413HT5NjXkaHrZzAy5EdoX",
          "artists": [
            {
              "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
              "name": "TLC"
            }
          ],
          "track-number": "12"
        },
        {
          "album": {
            "released": "2003",
            "href": "spotify:album:67HJQvqcIOgjrBgOJEKGln",
            "name": "Now & Forever: The Hits",
            "availability": {
              "territories": "AD AT AU BE CH DE DK EE ES FI FR GB HK IE IS IT LI LT LU LV MC MX MY NL NO PL PT SE SG US"
            }
          },
          "name": "No Scrubs",
          "popularity": "0.57715",
          "external-ids": [
            {
              "type": "isrc",
              "id": "USLF20000006"
            }
          ],
          "length": 218.283,
          "href": "spotify:track:413HT5NjXkaHrZzAy5EdoX",
          "artists": [
            {
              "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
              "name": "Lauren Sperber"
            }
          ],
          "track-number": "12"
        }
      ]
    });
    var validatedResults = [
      {
        "album": {
          "released": "1992",
          "href": "spotify:album:1CvjjpvqVMoyprsf74bpYW",
          "name": "Fanmail",
          "availability": {
            "territories": "AD AT AU BE CA CH DE DK EE ES FI FR GB IE IS IT LI LT LU LV MC MX MY NL NO NZ PL PT SE SG US"
          }
        },
        "name": "No Scrubs",
        "popularity": "0.69604",
        "external-ids": [
          {
            "type": "isrc",
            "id": "USLF29900479"
          }
        ],
        "length": 214.649,
        "href": "spotify:track:1KGi9sZVMeszgZOWivFpxs",
        "artists": [
          {
            "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
            "name": "TLC"
          }
        ],
        "track-number": "5"
      },
      {
        "album": {
          "released": "2007",
          "href": "spotify:album:6bTUTKQbRd293kWQoy44Bw",
          "name": "The Best Of TLC",
          "availability": {
            "territories": "AD AT BE CA CH DE DK EE ES FI FR GB IE IS IT LI LT LU LV MC MX NL NO PL PT SE"
          }
        },
        "name": "No Scrubs",
        "popularity": "0.61515",
        "external-ids": [
          {
            "type": "isrc",
            "id": "USLF20000006"
          }
        ],
        "length": 218.623,
        "href": "spotify:track:5iJUGd5boRXsCmW00B3Mtq",
        "artists": [
          {
            "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
            "name": "TLC"
          }
        ],
        "track-number": "1"
      },
      {
        "album": {
          "released": "2003",
          "href": "spotify:album:67HJQvqcIOgjrBgOJEKGln",
          "name": "Now & Forever: The Hits",
          "availability": {
            "territories": "AD AT AU BE CH DE DK EE ES FI FR GB HK IE IS IT LI LT LU LV MC MX MY NL NO PL PT SE SG US"
          }
        },
        "name": "No Scrubs",
        "popularity": "0.57715",
        "external-ids": [
          {
            "type": "isrc",
            "id": "USLF20000006"
          }
        ],
        "length": 218.283,
        "href": "spotify:track:413HT5NjXkaHrZzAy5EdoX",
        "artists": [
          {
            "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
            "name": "TLC"
          }
        ],
        "track-number": "12"
      },
      {
        "album": {
          "released": "2003",
          "href": "spotify:album:67HJQvqcIOgjrBgOJEKGln",
          "name": "Now & Forever: The Hits",
          "availability": {
            "territories": "AD AT AU BE CH DE DK EE ES FI FR GB HK IE IS IT LI LT LU LV MC MX MY NL NO PL PT SE SG US"
          }
        },
        "name": "No Scrubs",
        "popularity": "0.57715",
        "external-ids": [
          {
            "type": "isrc",
            "id": "USLF20000006"
          }
        ],
        "length": 218.283,
        "href": "spotify:track:413HT5NjXkaHrZzAy5EdoX",
        "artists": [
          {
            "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
            "name": "TLC"
          }
        ],
        "track-number": "12"
      }
    ];
    var dedupedResults = [
      {
        "album": {
          "released": "1992",
          "href": "spotify:album:1CvjjpvqVMoyprsf74bpYW",
          "name": "Fanmail",
          "availability": {
            "territories": "AD AT AU BE CA CH DE DK EE ES FI FR GB IE IS IT LI LT LU LV MC MX MY NL NO NZ PL PT SE SG US"
          }
        },
        "name": "No Scrubs",
        "popularity": "0.69604",
        "external-ids": [
          {
            "type": "isrc",
            "id": "USLF29900479"
          }
        ],
        "length": 214.649,
        "href": "spotify:track:1KGi9sZVMeszgZOWivFpxs",
        "artists": [
          {
            "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
            "name": "TLC"
          }
        ],
        "track-number": "5"
      },
      {
        "album": {
          "released": "2007",
          "href": "spotify:album:6bTUTKQbRd293kWQoy44Bw",
          "name": "The Best Of TLC",
          "availability": {
            "territories": "AD AT BE CA CH DE DK EE ES FI FR GB IE IS IT LI LT LU LV MC MX NL NO PL PT SE"
          }
        },
        "name": "No Scrubs",
        "popularity": "0.61515",
        "external-ids": [
          {
            "type": "isrc",
            "id": "USLF20000006"
          }
        ],
        "length": 218.623,
        "href": "spotify:track:5iJUGd5boRXsCmW00B3Mtq",
        "artists": [
          {
            "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
            "name": "TLC"
          }
        ],
        "track-number": "1"
      },
      {
        "album": {
          "released": "2003",
          "href": "spotify:album:67HJQvqcIOgjrBgOJEKGln",
          "name": "Now & Forever: The Hits",
          "availability": {
            "territories": "AD AT AU BE CH DE DK EE ES FI FR GB HK IE IS IT LI LT LU LV MC MX MY NL NO PL PT SE SG US"
          }
        },
        "name": "No Scrubs",
        "popularity": "0.57715",
        "external-ids": [
          {
            "type": "isrc",
            "id": "USLF20000006"
          }
        ],
        "length": 218.283,
        "href": "spotify:track:413HT5NjXkaHrZzAy5EdoX",
        "artists": [
          {
            "href": "spotify:artist:0TImkz4nPqjegtVSMZnMRq",
            "name": "TLC"
          }
        ],
        "track-number": "12"
      }
    ];

    var ajaxRequest = function () {
      this.responseText = sampleResults;
    };

    it('should have a validTracks variable that includes only the tracks with the correct artist', function () {
      stubXHR();
      spotifyQuerier.getTracks("lauren sperber", "lauren sperber", function () {});
      assert.deepEqual(validTracks, validatedResults);
    });

  });

});