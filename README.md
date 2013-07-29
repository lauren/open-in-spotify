[Open in Spotify](http://lauren.github.io/open-in-spotify/) [![Build Status](https://travis-ci.org/lauren/open-in-spotify.png?branch=master)](https://travis-ci.org/lauren/open-in-spotify)
===============

Discover songs on Songza or last.fm. Open them in Spotify. Play them on repeat. Rejoyce.

1. Add the bookmarklet to your Bookmarks bar from http://lauren.github.io/open-in-spotify/.

2. Go to your favorite Songza or last.fm station.

3. Click + Open in Spotify to open the song you're listening to in Spotify.

4. Play it over and over or add it to a playlist. Whatever your Spotify thing is.

Contributing
------------

I ♥ pull requests. Here's how to contribute:

1. Fork and pull repo.
2. If you don't have node, [install it](http://howtonode.org/how-to-install-nodejs).
3. From the repo directory, `npm install --save-dev`
4. `grunt watch`: This will automatically JSHint, concatenate, and minify the JavaScript and automatically compile and minify the LESS every time you save. Watch for JSHint errors and correct them.
5. Code!
6. Run tests with `node node_modules/mocha/bin/mocha` and fix any failures.