/* eslint-disable func-names */
const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('mongoose').model('User');

const { TW_CONSUMER_KEY, TW_CONSUMER_SECRET } = process.env;

module.exports = function () {
  passport.use(new TwitterTokenStrategy({
    consumerKey: TW_CONSUMER_KEY,
    consumerSecret: TW_CONSUMER_SECRET,
    includeEmail: true,
  },
  ((token, tokenSecret, profile, done) => {
    User.upsertTwitterUser(token, tokenSecret, profile, (err, user) => done(err, user));
  })));
};
