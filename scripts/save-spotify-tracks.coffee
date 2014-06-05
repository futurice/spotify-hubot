# Description:
#   Add spotify links to playlist
#
# Dependencies:
#   spotify-web
#
# Configuration:
#   HUBOT_SPOTIFY_USERNAME, HUBOT_SPOTIFY_PASSWORD and HUBOT_SPOTIFY_PASSWORD
#
# Commands:
#   <spotify track link> - adds track to playlist
#
# Author:
#   kimmobrunfeldt


env =
  username: process.env.HUBOT_SPOTIFY_USERNAME
  password: process.env.HUBOT_SPOTIFY_PASSWORD
  playlist: process.env.HUBOT_SPOTIFY_PLAYLIST

module.exports = (robot) ->
  robot.hear spotify.link, (msg) ->
    unless env.username
      msg.send "Please set the HUBOT_SPOTIFY_USERNAME environment variable."
      return
    unless env.password
      msg.send "Please set the HUBOT_SPOTIFY_PASSWORD environment variable."
      return
    unless env.playlist
      msg.send "Please set the HUBOT_SPOTIFY_PLAYLIST environment variable."
      return

    msg.http(spotify.uri msg.match[0]).get() (err, res, body) ->
      if res.statusCode is 200
        data = JSON.parse(body)

        msg.send "Saved track #{data.track.href}"

spotify =
  link: /// (
    ?: (http|https)://(open|play).spotify.com/track/
     | spotify:track:
    ) \S+ ///

  uri: (link) -> "http://ws.spotify.com/lookup/1/.json?uri=#{link}"