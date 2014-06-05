var fs = require('fs');
var data = fs.readFileSync('spotify_appkey.key');
console.log(new Buffer(data, 'binary').toString('base64'));