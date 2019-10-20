var twit = require('twit')
var config = require('./config.ts')
var Twitter = new twit(config)

var retweet = function() {
  console.log('retweet')
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }
}

var tweet = function(text) {
  Twitter.post('statuses/update', { status: text }, function(err, data, response) {
    if (err) {
      console.log('There was a problem tweeting the message.', err)
    }
  })
}

tweet('Im posting a tweet from a bot!')
