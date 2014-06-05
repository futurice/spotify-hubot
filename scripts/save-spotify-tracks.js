// Description:
//   Add spotify links to playlist
//
// Dependencies:
//   http://www.node-spotify.com/index.html
//
// Configuration:
//   HUBOT_SPOTIFY_USERNAME, HUBOT_SPOTIFY_PASSWORD and HUBOT_SPOTIFY_PASSWORD
//
// Commands:
//   <spotify track link> - adds track to playlist
//
// Author:
//   kimmobrunfeldt


const platforms = {
    'linux': 'linux',
    'darwin': 'osx'
};

var _ = require('lodash');
var os = require('os');
var fs = require('fs');
var currentPlatform = os.platform();
if (!_.has(platforms, currentPlatform)) {
    throw new Error('Platform not supported: ' + currentPlatform);
}

// Write appkey to file.
var appKeyBase64 = process.env.HUBOT_SPOTIFY_APPKEY;
var appKey = new Buffer(appKeyBase64, 'base64');
fs.writeFileSync('spotify_appkey.key', appKey);

// Finally require the actual library
var requireDirectory = '../node-spotify-' + platforms[currentPlatform];
var spotify = require(requireDirectory + '/spotify')({ appkeyFile: 'spotify_appkey.key' });


var env = {
    username: process.env.HUBOT_SPOTIFY_USERNAME,
    password: process.env.HUBOT_SPOTIFY_PASSWORD,
    playlist: process.env.HUBOT_SPOTIFY_PLAYLIST
};

const spotify_link_regex = new RegExp('(https?://(open|play).spotify.com/track/|spotify:track:)\\S+');

var spotifyIsReady = false;

var ready = function()  {
    spotifyIsReady = true;
};

spotify.on({
    ready: ready
});

spotify.login(process.env.HUBOT_SPOTIFY_USERNAME, process.env.HUBOT_SPOTIFY_PASSWORD, false, false);


module.exports = function(robot) {
    robot.hear(spotify_link_regex, function(msg) {
        if (!env.username) {
            msg.send("Please set the HUBOT_SPOTIFY_USERNAME environment variable.");
            return;
        }

        if (!env.password) {
            msg.send("Please set the HUBOT_SPOTIFY_PASSWORD environment variable.");
            return;
        }

        if (!env.playlist) {
            msg.send("Please set the HUBOT_SPOTIFY_PLAYLIST environment variable.");
            return;
        }

        if (!spotifyIsReady) {
            msg.send("Spotify is not connected yet.");
            return;
        }

        var url = 'http://ws.spotify.com/lookup/1/.json?uri=' + msg.match[0];

        msg.http(url).get()(function(err, res, body) {
            if (res.statusCode === 200) {
                var data = JSON.parse(body);

                var playlist = spotify.createFromLink(env.playlist);
                var track = spotify.createFromLink(data.track.href);
                playlist.addTracks([track], 0);
                console.log('Saved track', data.track.href);
            }
        });
    });
};
