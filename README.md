# hey-LIRI
Hey LIRI (Language Interpretation and Recognition Interface) is command-line application that returns data on the important stuff in life: Twitter, Spotify, and movies.

# How to Use

Some things you can ask LIRI:

> $ node liri.js my-tweets

Displays the 20 most recent tweets from @mesobotamia, my Sumerian Twitter bot.

> $ node liri.js spotify-this-song "song name"

Returns information about a specific song from Spotify.

> $ node liri.js movie-this "movie name"

Returns information about a specific movie from OMDb.

> $ node liri.js surprise-me

Executes a random command from random.txt.

# What's in the Box?

Hey LIRI uses the following npm packages:
* [twitter](https://www.npmjs.com/package/twitter)
* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
* [moment](https://www.npmjs.com/package/moment)
* [request](https://www.npmjs.com/package/request)
* [dotenv](https://www.npmjs.com/package/dotenv)

To get Hey LIRI running in your own terminal/bash:
1. `git clone` this repository
2. run `npm install` to get all dependencies
3. create a `.env` and `.gitignore` file
4. add your own [Twitter](https://apps.twitter.com/app/new) and [Spotify](https://developer.spotify.com/my-applications/#!/) API keys to your `.env` file
5. add `node_modules/`, `.env`, and `.gitignore` to your `.gitignore` file

# Goodies

If you don't give LIRI a command or she doesn't understand you, she (sorta) becomes HAL 9000.

For the `surprise-me` command, LIRI executes a random command from `random.txt`. Add your own!

All commands are saved with a datestamp in the `log.txt` file.