require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var media = process.argv[3];

switch (command) {
    case "my-tweets":
        console.log("Here are your 20 most recent tweets:");
        var params = { screen_name: 'mesobotamia' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log(i + 1 + ") " + tweets[i].text);
                    console.log(moment(tweets[i].created_at, "ddd MMM DD HH:mm:ss Z YYYY").format('LLLL'));
                }
            }
        });
        break;
    case "spotify-this-song":
        console.log("Sing it out loud:");
        spotify.search({ type: 'track', query: media }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items;
            console.log(
                "\nArtist: " + info[0].artists[0].name +
                "\nSong: " + info[0].name + 
                "\nAlbum: " + info[0].album.name + 
                // ATTN: Some songs preview url returns null
                "\nPreview: " + info[0].preview_url
            )
        });
        break;
    case "movie-this":
        console.log("Fetching that movie:");
        break;
    case "do-what-it-says":
        console.log("Just do it!");
        break;
    default:
        console.log("I'm sorry Dave, I'm afraid I can't do that.");
}