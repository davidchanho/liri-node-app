require('dotenv').config();

var fs = require('fs');

var axios = require('axios');

var moment = require('moment');

var spotify = require('spotify');

var inquirer = require('inquirer');

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

function spotify() {
	spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(
		err,
		data
	) {
		if (err) {
			console.log('err occurred: ' + err);
			return;
		}
		console.log(JSON.stringify(data, query));
	});
}

function movie() {
	var queryUrl = 'http://www.omdbapi.com/?t=' + media + '&apikey=trilogy';

	axios
		.get(queryUrl)
		.then(function (response) {
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

//hide api key

// Create a "Prompt" with a series of questions.
// inquirer
// 	.prompt([
// 		// Here we create a basic text prompt.
// 		{
// 			type: "input",
// 			message: "What is your name?",
// 			name: "username"
// 		},
// 		// Here we create a basic password-protected text prompt.
// 		{
// 			type: "password",
// 			message: "Set your password",
// 			name: "password"
// 		},
// 		// Here we give the user a list to choose from.
// 		{
// 			type: "list",
// 			message: "Which Pokemon do you choose?",
// 			choices: ["Bulbasaur", "Squirtle", "Charmander"],
// 			name: "pokemon"
// 		},
// 		// Here we ask the user to confirm.
// 		{
// 			type: "confirm",
// 			message: "Are you sure:",
// 			name: "confirm",
// 			default: true
// 		}
// 	])
// 	.then(function (inquirerResponse) {
// 		// If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
// 		if (inquirerResponse.confirm) {
// 			console.log("\nWelcome " + inquirerResponse.username);
// 			console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
// 		}
// 		else {
// 			console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
// 		}
// 	});
