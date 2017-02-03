var request = require('request');
var cheerio = require('cheerio');

exports.get = function () {

	url = 'http://www.goodreads.com/quotes/tag/encouragement';

	return request(url, function(error, response, html) {

		if (error) throw error;

		var $ = cheerio.load(html);

		var json = [];

		$('.quoteDetails').each(function(i, obj) {

			let quote = {
				text: $('.quoteText', $(this)).contents().get(0).nodeValue,//.trim(),
				authorOrTitle: $('.authorOrTitle', $(this)).text()
			}
			json.push(quote);
		});

		return json[Math.floor(Math.random()*json.length)];
	});
};

console.log( exports.get() );
