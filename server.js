var http = require('http'),
    twilio = require('twilio');
var quotes = require('./quotes.js');

http.createServer(function (req, res) {
    //Create TwiML response
    var twiml = new twilio.TwimlResponse();
		var quote = quotes[Math.floor(Math.random()*quotes.length)];
	console.log(quote);
    twiml.say("Thank you for calling. Here is an encouraging quote from:", {'voice': 'woman'});
		//twiml.pause();
    twiml.say(quote.authorOrTitle, {'voice': 'woman'});
		twiml.pause();
    twiml.say(quote.text, {'voice': 'woman'});
		twiml.pause(0.5);
    twiml.say("End of quote.", {'voice': 'woman'});
		twiml.pause();
    twiml.say("Goodbye!", {'voice': 'woman'});

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

}).listen(1337, '127.0.0.1');

console.log('TwiML servin\' server running at http://127.0.0.1:1337/');
