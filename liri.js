require('dotenv').config();

var axios = require('axios');

var cmd = process.argv[2];

var media = process.argv[3];

// var nodeArgs = process.argv;

// var media = "";

// for (let i = 2; i < nodeArgs.length; i++) {

//     if (i > 2 && i < nodeArgs.length) {
//         media = media + "+" + nodeArgs[i];
//     } else {
//         media += nodeArgs[i];
//     }
// }

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
			console.log(response.data[0].venue.name);
			console.log(
				response.data[0].venue.city + ', ' + response.data[0].venue.country
			);
			var datetime = response.data[0].datetime;
			var datetimeArr = datetime.split('T');
			console.log(datetimeArr[0] + ' @ ' + datetimeArr[1]); //convert time
		})
		.catch(function(error) {
			if (error.response) {
				console.log('---------------Data---------------');
				console.log(error.response.data);
				console.log('---------------Status---------------');
				console.log(error.response.status);
				console.log('---------------Status---------------');
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
}

function spotify() {}

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
			if (error.response) {
				console.log('---------------Data---------------');
				console.log(error.response.data);
				console.log('---------------Status---------------');
				console.log(error.response.status);
				console.log('---------------Status---------------');
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
}
function doIt() {}

function log() {
	var fs = require('fs');

	var text = process.argv[2] + ' ' + media + '\n'; //add date and time logged

	// add data from other functions too

	fs.appendFile('log.txt', text, function(err) {
		if (err) {
			console.log(err);
		}
	});
}
