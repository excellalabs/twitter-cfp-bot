var twit = require('twit')
var config = require('./config.ts')
var Twitter = new twit(config)

var tweet = function(text) {
  Twitter.post('statuses/update', { status: text }, function(err, data, response) {
    if (err) {
      console.log('There was a problem tweeting the message.', err)
    }
  })
}

var searchTweets = function() {
  Twitter.get(
    'search/tweets',
    {
      q: 'list:alexhoffman617/test cfp OR cfs OR "call for speakers" OR "call for proposals"',
      result_type: 'recent',
      lang: 'en',
      count: 10,
      include_entities: false
    },
    function(err, data, response) {
      data.statuses.forEach(status => {
        console.log('[' + status.user.name + '] - ' + status.text + ' **' + status.id + '**')
      })
    }
  )
}

var getTimelineTweets = function() {
  Twitter.get(
    'statuses/home_timeline',
    { include_entities: false, exclude_replies: true, count: 2, include_rts: 1 },
    function(err, data, response) {
      console.log(data)
    }
  )
}

// tweet('Im posting a tweet from a bot!')
searchTweets()
