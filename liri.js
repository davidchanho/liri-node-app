require('dotenv').config();

var keys = require('./keys.js');

var fs = require('fs');

var util = require('util');

var axios = require('axios');

var moment = require('moment');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var logFile = fs.createWriteStream('log.txt', { flags: 'a' });

var logStdout = process.stdout;

var nodeArgs = process.argv;

var cmd = process.argv[2];

var media = '';

for (let i = 3; i < nodeArgs.length; i++) {
	if (i > 3 && i < nodeArgs.length) {
		media = media + '%20' + nodeArgs[i];
	} else {
		media += nodeArgs[i];
	}
}

switch (cmd) {
	case 'concert-this':
		concert();
		break;
	case 'spotify-this-song':
		spotify2();
		break;
	case 'movie-this':
		movie();
		break;
	case 'do-what-it-says':
		doIt();
		break;
	default:
		console.log('what?');
		break;
}

function concert() {
	var queryUrl =
		'https://rest.bandsintown.com/artists/' +
		media +
		'/events?app_id=codingbootcamp';

	axios
		.get(queryUrl)
		.then(function(response) {
			for (let i = 0; i < 3; i++) {
				console.log('\n' + response.data[i].venue.name);
				console.log(
					response.data[i].venue.city + ', ' + response.data[i].venue.region + ' ' + response.data[i].venue.country
				);
				var datetime = response.data[i].datetime;
				var momentDate = moment(datetime);
				console.log(momentDate.format('MM/DD/YY hh:mm A'));
			}
		})
		.catch(function(err) {
			err();
		});
}

function spotify2 () {
	spotify
		.search({ type: 'track', query: media.replace('%20', '+'), limit:1 })
		.then(function (response) {
			let track = response.tracks.items[0];
			console.log("song: ", track.name + " by " + track.artists[0].name);
			console.log("album: ", track.album.name);
			console.log("preview_url: ", track.preview_url);
		})
		.catch(function (err) {//default to "The Sign" by Ace of Base
		spotify
			.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
			.then(function (data) {
	//   var songData = data.
	  console.log("song: ", data.name + " by " + data.artists[0].name);
	console.log("album: ", data.album.name);
	console.log("preview_url: ", data.preview_url);
  })
		});
}

function movie() {
	var queryUrl = 'http://www.omdbapi.com/?t=' + media + '&apikey=trilogy';

	axios
		.get(queryUrl)
		.then(function(response) {
			var result = response.data;
			console.log('Title: ', result.Title);
			console.log('Release Year: ', result.Year);
			console.log('IMDB: ', result.Ratings[0].Value);
			console.log('Rotten Tomato: ', result.Ratings[1].Value);
			console.log('Country: ', result.Country);
			console.log('Language: ', result.Language);
			console.log('Plot: ', result.Plot);
			console.log('Actors: ', result.Actors);
		})
		.catch(function(err) {
			err(err);
		});
}

function doIt() {
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}

		var dataArr = data.split(','); // spaces
		var rnd = Math.floor(Math.random() * (dataArr.length - 1));
		console.log(
			// remove quotation marks
			`node liri.js ${dataArr[rnd]} ${dataArr[rnd + 1]}`
		);
	});
}

log();

function log() {
	var text =
		'\n[' +
		moment().format('MM/DD/YY|HH:mm') +
		']: ' +
		process.argv[2] +
		' "' +
		media.replace(/%20/g, ' ') +
		'"\n\t';

	fs.appendFile('log.txt', text, function() {

	});
	console.log = function () {
		logFile.write(util.format.apply(null, arguments) + '\n\t');
		logStdout.write(util.format.apply(null, arguments) + '\n\t');
	}
	console.error = console.log;
}