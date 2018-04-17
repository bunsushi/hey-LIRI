require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var moment = require('moment');
var request = require('request');
var fs = require('fs');
var exec = require('child_process').exec;

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var media = process.argv[3];

switch (command) {
    case "my-tweets":
        myTweets('mesobotamia');
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        justDoIt();
        break;
    default:
        console.log("I'm sorry Dave, I'm afraid I can't do that.");
}

function myTweets(username) {
    console.log("Here are your 20 most recent tweets:");
    var params = { screen_name: username };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            dateStamp();
            for (var i = 0; i < tweets.length; i++) {
                var tweetsText =
                    "\n" + (i + 1) + ") " + tweets[i].text +
                    "\n" + moment(tweets[i].created_at, "ddd MMM DD HH:mm:ss Z YYYY").format('LLLL');
                console.log(tweetsText);

                fs.appendFile("log.txt", tweetsText, function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                });
            };
        };
    });
};

function spotifyThisSong() {
    console.log("Searching for that song...");
    if (!media) {
        console.log("\nOops, you forgot to search for a song. May I recommend...");
        spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items;
            for (var i = 0; i < info.length; i++) {
                if (info[i].album.name === "The Sign (US Album) [Remastered]" && info[i].name === "The Sign") {
                    var theSign =
                        "\nArtist: " + info[i].artists[0].name +
                        "\nSong: " + info[i].name +
                        "\nAlbum: " + info[i].album.name +
                        // ATTN: Some songs preview url returns null
                        "\nPreview: " + info[i].preview_url
                    console.log(theSign);

                    dateStamp();
                    fs.appendFile("log.txt", theSign, function (err, data) {
                        if (err) {
                            return console.log(err);
                        }
                    })
                };
            };
        });
    }
    else if (media) {
        spotify.search({ type: 'track', query: media }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items;

            var songData =
                "\nArtist: " + info[0].artists[0].name +
                "\nSong: " + info[0].name +
                "\nAlbum: " + info[0].album.name +
                // ATTN: Some songs preview url returns null
                "\nPreview: " + info[0].preview_url

            console.log(songData);

            dateStamp();
            fs.appendFile("log.txt", songData, function (err, data) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    };
};

function movieThis() {
    console.log("Fetching that movie...");
    if (!media) {
        console.log("\nOops, you forgot to search for a movie. May I recommend...");
        var movieTitle = "Mr+Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
                var mrNobody =
                    "\nTitle: " + JSON.parse(body).Title +
                    "\nRelease Year: " + JSON.parse(body).Year +
                    "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value +
                    "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                    "\nCountry: " + JSON.parse(body).Country +
                    "\nStarring: " + JSON.parse(body).Actors
                console.log(mrNobody);
            }
            dateStamp();
            fs.appendFile("log.txt", mrNobody, function (err, data) {
                if (err) {
                    return console.log(err);
                };
            });
        });
    }
    else if (media) {
        var movieTitle = media.replace(" ", "+");
        var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
                var movieData =
                    "\nTitle: " + JSON.parse(body).Title +
                    "\nRelease Year: " + JSON.parse(body).Year +
                    "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value +
                    "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                    "\nCountry: " + JSON.parse(body).Country +
                    "\nStarring: " + JSON.parse(body).Actors
                console.log(movieData);
            };
            dateStamp();
            fs.appendFile("log.txt", movieData, function (err, data) {
                if (err) {
                    return console.log(err);
                };
            });
        });
    };
};

function justDoIt() {
    // Grab a random command from random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        var commandIndex = Math.floor(Math.random() * dataArr.length / 2) * 2;
        var mediaIndex = commandIndex + 1;

        var command = dataArr[commandIndex];
        var media = dataArr[mediaIndex];

        var cmd = 'node liri.js ' + command + media;
        console.log(cmd);

        exec(cmd, function (error, stdout, stderr) {
            // command output is in stdout
            console.log(stdout);
            dateStamp();
            fs.appendFile("log.txt", stdout, function (err, data) {
                if (err) {
                    return console.log(err);
                };
            });
        });
    });
};

function dateStamp() {
    var lineBreak = '\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%' + '\nDatestamp: ' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%';
    fs.appendFile("log.txt", lineBreak, function (err, data) {
        if (err) {
            return console.log(err);
        }
    });
}