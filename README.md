# Spotify Hubot

This bot listens for all spotify links in Flowdock and adds them to a Spotify playlist.

You need:

* Heroku account
* NodeJS 'n stuff
* Spotify premium account


This bot uses [Flowdock adapter](https://github.com/flowdock/hubot-flowdock). First configure Hubot with its adapters and get it responding to something and then proceed with these instructions:

Copy your spotify appkey to the base of the repository named as `spotify_appkey.key`. Get application key from here: https://developer.spotify.com/technologies/libspotify/#application-keys (choose binary, not C-code).

Add following environment variables to heroku:

    heroku config:add HUBOT_SPOTIFY_APPKEY=`node appkey-to-base64.js`
    heroku config:add HUBOT_SPOTIFY_USERNAME=username
    heroku config:add HUBOT_SPOTIFY_PASSWORD=password
    heroku config:add HUBOT_SPOTIFY_PLAYLIST=spotify:user:myusername:playlist:7sXq7x8V17JIRzYJKw5v9o


Use this buildpack: https://github.com/ddollar/heroku-buildpack-multi
and it will use [.buildpacks](.buildpacks) file to use multiple buildpacks at the same time


## Spotify specific stuff

node-spotify uses libspotify underneath. Installing to OSX: `brew install libspotify`

# Hubot in general

This version is designed to be deployed on [Heroku][heroku]. This README was generated for you by hubot to help get you started. Definitely update and improve to talk about your own instance, how to use and deploy, what functionality he has, etc!

[heroku]: http://www.heroku.com

### Testing Hubot Locally

You can test your hubot by running the following.

    % bin/hubot

You'll see some start up output about where your scripts come from and a
prompt.

    [Sun, 04 Dec 2011 18:41:11 GMT] INFO Loading adapter shell
    [Sun, 04 Dec 2011 18:41:11 GMT] INFO Loading scripts from /home/tomb/Development/hubot/scripts
    [Sun, 04 Dec 2011 18:41:11 GMT] INFO Loading scripts from /home/tomb/Development/hubot/src/scripts
    Hubot>

Then you can interact with hubot by typing `hubot help`.

    Hubot> hubot help

    Hubot> animate me <query> - The same thing as `image me`, except adds a few
    convert me <expression> to <units> - Convert expression to given units.
    help - Displays all of the help commands that Hubot knows about.
    ...


### Scripting

Take a look at the scripts in the `./scripts` folder for examples.
Delete any scripts you think are useless or boring.  Add whatever functionality you
want hubot to have. Read up on what you can do with hubot in the [Scripting Guide](https://github.com/github/hubot/blob/master/docs/scripting.md).

### Redis Persistence

If you are going to use the `redis-brain.coffee` script from `hubot-scripts`
(strongly suggested), you will need to add the Redis to Go addon on Heroku which requires a verified
account or you can create an account at [Redis to Go][redistogo] and manually
set the `REDISTOGO_URL` variable.

    % heroku config:set REDISTOGO_URL="..."

If you don't require any persistence feel free to remove the
`redis-brain.coffee` from `hubot-scripts.json` and you don't need to worry
about redis at all.

[redistogo]: https://redistogo.com/

## Adapters

Adapters are the interface to the service you want your hubot to run on. This
can be something like Campfire or IRC. There are a number of third party
adapters that the community have contributed. Check
[Hubot Adapters][hubot-adapters] for the available ones.

If you would like to run a non-Campfire or shell adapter you will need to add
the adapter package as a dependency to the `package.json` file in the
`dependencies` section.

Once you've added the dependency and run `npm install` to install it you can
then run hubot with the adapter.

    % bin/hubot -a <adapter>

Where `<adapter>` is the name of your adapter without the `hubot-` prefix.

[hubot-adapters]: https://github.com/github/hubot/blob/master/docs/adapters.md

## hubot-scripts

There will inevitably be functionality that everyone will want. Instead
of adding it to hubot itself, you can submit pull requests to
[hubot-scripts][hubot-scripts].

To enable scripts from the hubot-scripts package, add the script name with
extension as a double quoted string to the `hubot-scripts.json` file in this
repo.

[hubot-scripts]: https://github.com/github/hubot-scripts

## external-scripts

Tired of waiting for your script to be merged into `hubot-scripts`? Want to
maintain the repository and package yourself? Then this added functionality
maybe for you!

Hubot is now able to load scripts from third-party `npm` packages! To enable
this functionality you can follow the following steps.

1. Add the packages as dependencies into your `package.json`
2. `npm install` to make sure those packages are installed

To enable third-party scripts that you've added you will need to add the package
name as a double quoted string to the `external-scripts.json` file in this repo.

## Deployment

    % heroku create --stack cedar
    % git push heroku master
    % heroku ps:scale app=1

If your Heroku account has been verified you can run the following to enable
and add the Redis to Go addon to your app.

    % heroku addons:add redistogo:nano

If you run into any problems, checkout Heroku's [docs][heroku-node-docs].

You'll need to edit the `Procfile` to set the name of your hubot.

More detailed documentation can be found on the
[deploying hubot onto Heroku][deploy-heroku] wiki page.

### Deploying to UNIX or Windows

If you would like to deploy to either a UNIX operating system or Windows.
Please check out the [deploying hubot onto UNIX][deploy-unix] and
[deploying hubot onto Windows][deploy-windows] wiki pages.

[heroku-node-docs]: http://devcenter.heroku.com/articles/node-js
[deploy-heroku]: https://github.com/github/hubot/blob/master/docs/deploying/heroku.md
[deploy-unix]: https://github.com/github/hubot/blob/master/docs/deploying/unix.md
[deploy-windows]: https://github.com/github/hubot/blob/master/docs/deploying/unix.md

## Restart the bot

You may want to get comfortable with `heroku logs` and `heroku restart`
if you're having issues.
