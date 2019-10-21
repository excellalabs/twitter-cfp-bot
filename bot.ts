var twit = require('twit')
var config = require('./config.ts')
var Twitter = new twit(config)

var retweetList = 'alexhoffman617/test'

var hourInterval = 1
var minuteInterval = 0

var tweet = function(text) {
  Twitter.post('statuses/update', { status: text }, function(err, data, response) {
    if (err) {
      console.log('There was a problem tweeting the message.', err)
    }
  })
}

async function searchTweets(): Promise<any> {
  return new Promise(function(resolve) {
    const date = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split('T')[0]
      .replace('/', '-')
    Twitter.get(
      'search/tweets',
      {
        q: `list:${retweetList} since:${date} -filter:retweets cfp OR cfs OR "call for speakers" OR "call for proposals"`,
        // result_type: 'recent',
        lang: 'en',
        // count: 1,
        include_entities: false
      },
      function(err, data, response) {
        // console.log(new Date().toISOString())
        data.statuses.forEach(status => {
          //   console.log(
          //     '[' +
          //       status.user.name +
          //       '] - ' +
          //       status.text +
          //       ' **' +
          //       status.id_str +
          //       '**' +
          //       new Date(status.created_at).toISOString()
          //   )
        })
        resolve(data)
      }
    )
  })
}

var retweet = function(id) {
  Twitter.post('statuses/retweet', { id: id }, function(err, data, response) {
    console.log(data)
  })
}

async function continuousRetweet() {
  console.log('run')
  var foundTweets = await searchTweets()
  foundTweets.statuses.filter(status => {
    if (
      new Date(status.created_at) >=
      new Date(
        new Date(new Date().setMinutes(new Date().getMinutes() - minuteInterval)).setHours(
          new Date().getHours() - hourInterval
        )
      )
    ) {
      retweet(status.id_str)
      console.log(
        'retweet!!! -- [' +
          status.user.name +
          '] - ' +
          status.text +
          ' **' +
          status.id_str +
          '**' +
          '--' +
          status.created_at
      )
    }
  })
}
setInterval(continuousRetweet, 1000 * 60 * minuteInterval + 1000 * 60 * 60 * hourInterval)
