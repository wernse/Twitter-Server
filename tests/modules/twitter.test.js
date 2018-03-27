let assert = require("assert");
let chai = require("chai");
let expect = chai.expect;
let should = chai.should;
let twitter = require("../../src/modules/twitter");
let twitterData = require("../data/twitter.data");

describe("Get Twitter Data", () => {
  let session;
  before(() => {
    session = twitter.initSession();
  });
  it("will get the specified count", done => {
    let count = 2;
    twitter.search(session, "bitcoin", count, (err, data) => {
      expect(data).to.not.be.null;
      expect(data).to.be.length(count, `result is not specified ${count}`);
      done();
    });
  }).timeout(30000);
  it("will get the key value", done => {
    let count = 2;
    let search = "bitcoin";
    twitter.search(session, search, count, (err, data) => {
      expect(data).to.not.be.null;
      if (data.length) {
        expect(data[0].text.toLowerCase()).to.contain(search);
      }
      done();
    });
  }).timeout(30000);
});
describe("Map Twitter Data", () => {
  it("the data will map correctly", () => {
    let rawTweets = twitterData.tweetData;
    let search = "bitcoin";
    let tweets = twitter.mapTweetData(rawTweets);
    expect(tweets).to.be.length(4);
    let tweet = tweets[0];
    expect(tweet.text).to.be.equal(
      "Bitcoin falls below $8,000 https://t.co/nudt9Be5fF https://t.co/lfWEkNEYA6"
    );
    expect(tweet.id).to.be.equal("978322323521654790");
    expect(tweet.retweet_count).to.be.equal(161);
    expect(tweet.favorite_count).to.be.equal(107);
  });
});
