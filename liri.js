require('dotenv').config();

var fs = require('fs');

var axios = require('axios');

var moment = require('moment');

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
		spotify();
		break;
	case 'movie-this':
		movie();
		break;
	case 'do-what-it-says':
		doIt();
		break;
	default:
		'what?';
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
				var datetimeArr = datetime.split('T');
				console.log(datetimeArr[0] + ' @ ' + datetimeArr[1]); //convert time using moment
			}
		})
		.catch(function(error) {
			error();
		});
}

function spotify() {
	var queryUrl =
		'https://rest.bandsintown.com/artists/' +
		media +
		'/events?app_id=codingbootcamp';
	axios
		.get(queryUrl)
		.then(function(response) {
			console.log(response.data[0].venue.name);
		})
		.catch(function(error) {
			error();
		});
}

function movie() {
	var queryUrl = 'http://www.omdbapi.com/?t=' + media + '&apikey=trilogy';

	axios
		.get(queryUrl)
		.then(function(response) {
			console.log('Title: ' + response.data.Title);
			console.log('Release Year: ' + response.data.Year);
			console.log('IMDB: ' + response.data.Ratings[0].Value);
			console.log('Rotten Tomato: ' + response.data.Ratings[1].Value);
			console.log('Country: ' + response.data.Country);
			console.log('Language: ' + response.data.Language);
			console.log('Plot: ' + response.data.Plot);
			console.log('Actors: ' + response.data.Actors);
		})
		.catch(function(error) {
			error(error);
		});
}

function doIt() {
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}

		var dataArr = data.split(','); // spaces

		console
			.log // remove quotation marks
			// 'node liri.js' + dataArr[2] + ' ' + dataArr[3].replace(/\W'|'\W/)
			();
	});
}

function log() {
	var text =
		'\n (' +
		moment().format('MM/DD/YY|HH:mm') +
		'): ' +
		process.argv[2] +
		' "' +
		media.replace(/%20/g, ' ') +
		'"';

	// add data from other functions too

	fs.appendFile('log.txt', text, function(err) {
		if (err) {
			console.log(err);
		}
	});
}

// function error(error) {
// 	if (error.response) {
// 		console.log('---------------Data---------------');
// 		console.log(error.response.data);
// 		console.log('---------------Status---------------');
// 		console.log(error.response.status);
// 		console.log('---------------Status---------------');
// 		console.log(error.response.headers);
// 	} else if (error.request) {
// 		console.log(error.request);
// 	} else {
// 		console.log('Error', error.message);
// 	}
// 	console.log(error.config);
// }

//hide api key
