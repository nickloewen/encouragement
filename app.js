require('dotenv').config()

var twilio = require('twilio')

var quotes = require('./resources/quotes.js')
var greetings = require('./resources/greetings.js')

var express = require('express')
var app = express()

// Functions

function time () {
  // http://stackoverflow.com/a/10211214
  var d = new Date()
  return ((d.getHours() < 10) ? '0' : '') + d.getHours() + ':' + ((d.getMinutes() < 10) ? '0' : '') + d.getMinutes() + ':' + ((d.getSeconds() < 10) ? '0' : '') + d.getSeconds()
}

function Voice () {
  this.randomQuote = function () {
    console.log('Voice quote at ' + time())

    var twiml = new twilio.TwimlResponse()
    var quote = quotes[Math.floor(Math.random() * quotes.length)]

    twiml.say('Thank you for calling. Here is an encouraging quote from:', {'voice': 'woman'})
    twiml.say(quote.author, {'voice': 'woman'})
    twiml.pause()
    twiml.say(quote.text, {'voice': 'woman'})
    twiml.pause(0.5)
    twiml.say('End of quote.', {'voice': 'woman'})
    twiml.pause()
    twiml.say('Goodbye!', {'voice': 'woman'})

    return twiml.toString()
  }
}

function SMS () {
  this.randomQuote = function () {
    console.log('SMS quote at ' + time())

    var twiml = new twilio.TwimlResponse()
    var quote = quotes[Math.floor(Math.random() * quotes.length)]
    var greeting = greetings[Math.floor(Math.random() * greetings.length)]

    var message = greeting + '! Here is an encouraging quote from ' + quote.author + ': \n\n' + quote.text
    twiml.message(message)

    return twiml.toString()
  }
}

// Routes

app.get('/voice', speakQuote)

function speakQuote (req, res) {
  var v = new Voice()
  res.set({'Content-type': 'text/xml'})
  res.send(v.randomQuote())
}

app.post('/sms', textQuote)

function textQuote (req, res) {
  var sms = new SMS()
  res.set({'Content-type': 'text/xml'})
  res.send(sms.randomQuote())
}

// Serve it

app.listen(3000, function () {
  console.log('Serving encouragement on port 3000.')
})
