var keys = require("./keys.js");

console.log('this is loaded');

var spotify = new Spotify(keys.spotify);
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};