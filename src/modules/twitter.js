"use strict";

let Twit = require("twit");
require("dotenv").config();

module.exports = {
  initSession,
  search,
  mapTweetData
};

/**
 * Init the session with the local env keys
 */
function initSession() {
  return new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
  });
}

/**
 * Search twitter for english
 * @param {*} keyword
 */
function search(session, keyword, count, callback) {
  session.get(
    "search/tweets",
    { q: keyword, result_type: "popular", lang: "en", count: count },
    (err, data, response) => {
      if (err) {
        console.error("err", err);
        callback(err);
        return;
      }
      let tweets = mapTweetData(data.statuses);
      callback(null, tweets);
    }
  );
}

/**
 * Transforms the raw data object into the required model
 * @param {*} tweetData
 */
function mapTweetData(tweetData) {
  return tweetData.map(tweet => {
    return {
      id: tweet.id_str,
      text: tweet.text,
      retweet_count: tweet.retweet_count,
      favorite_count: tweet.favorite_count,
      created_at: tweet.created_at
    };
  });
}
