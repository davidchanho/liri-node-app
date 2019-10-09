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
	// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
}
function spotify() {}
function movie() {
	var queryUrl =
		'http://www.omdbapi.com/?t=' + media + '&y=&plot=short&apikey=trilogy';

	console.log(queryUrl);

	axios
		.get(queryUrl)
		.then(function(response) {
			console.log('Release Year: ' + response.data.Year);
		})
		.catch(function(error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('---------------Data---------------');
				console.log(error.response.data);
				console.log('---------------Status---------------');
				console.log(error.response.status);
				console.log('---------------Status---------------');
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an object that comes back with details pertaining to the error that occurred.
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
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
		} else {
			console.log('Logged');
		}
	});
}
