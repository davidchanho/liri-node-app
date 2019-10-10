require('dotenv').config();

var keys = require('./keys.js');

var fs = require('fs');

var axios = require('axios');

var moment = require('moment');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var inquirer = require('inquirer');

// var BT = new BT(id.BT);

// var OMDB = new OMDB(keys.OMDB);

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

log();

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
					response.data[i].venue.city + ', ' + response.data[i].venue.country
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
			console.log("song ", track.name + " by " + track.artists[0].name);
			console.log("album ", track.album.name);
			console.log("preview_url: ", track.preview_url);
		})
		.catch(function (err) {
			console.log(err);
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

function log() {
	var text =
		'\n [' +
		moment().format('MM/DD/YY|HH:mm') +
		']: ' +
		process.argv[2] +
		' "' +
		media.replace(/%20/g, ' ') +
		'"';

	var log = '\n';
	// add data from other functions

	fs.appendFile('log.txt', text + log, function(err) {
		if (err) {
			console.log(err);
		}
	});
}

// function err(err) {
// 	if (err.response) {
// 		console.log('---------------Data---------------');
// 		console.log(err.response.data);
// 		console.log('---------------Status---------------');
// 		console.log(err.response.status);
// 		console.log('---------------Status---------------');
// 		console.log(err.response.headers);
// 	} else if (err.request) {
// 		console.log(err.request);
// 	} else {
// 		console.log('err', err.message);
// 	}
// 	console.log(err.config);
// }

