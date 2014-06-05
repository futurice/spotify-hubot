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


var env = {
    username: process.env.HUBOT_SPOTIFY_USERNAME,
    password: process.env.HUBOT_SPOTIFY_PASSWORD,
    playlist: process.env.HUBOT_SPOTIFY_PLAYLIST
};

const spotify_link_regex = new RegExp('(https?://(open|play).spotify.com/track/|spotify:track:)\\S+');

module.exports = function(robot) {
    robot.hear(spotify_link_regex, function(msg) {
        console.log('test')
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

        var url = 'http://ws.spotify.com/lookup/1/.json?uri=' + msg.match[0];

        msg.http(url).get(function(err, res, body) {
            if (res.statusCode === 200) {
                var data = JSON.parse(body);
                msg.send('Saved track ' + data.track.href);
            }
        });
    });
};
