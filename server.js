var http = require('http'),
    twilio = require('twilio');
var quotesDB = require('./quotes.js');
var quotes = quotesDB.quotes;

http.createServer(function (req, res) {
    //Create TwiML response
    var twiml = new twilio.TwimlResponse();
		var quote = quotes[Math.floor(Math.random()*quotes.length)];
	console.log(quote);
    twiml.say("Thank you for calling. Here is an encouraging quote from:");
    twiml.say(quote.authorOrTitle);
    twiml.say(quote.text);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

}).listen(1337, '127.0.0.1');

console.log('TwiML servin\' server running at http://127.0.0.1:1337/');
