/* eslint-disable import/newline-after-import */
/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const mongoose = require('./mongoose');
const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const Twit = require('twit');

mongoose();

// eslint-disable-next-line import/order
const User = require('mongoose').model('User');
const passportConfig = require('./passport');

passportConfig();

const {
  HOST_DOMAIN,
  HOST_PORT,
  TW_HOSTNAME,
  TW_CONSUMER_KEY,
  TW_CONSUMER_SECRET,
  // TW_ACCESS_TOKEN,
  // TW_ACCESS_TOKEN_SECRET,
  MY_SECRET,
} = process.env;

const T = new Twit({
  consumer_key: TW_CONSUMER_KEY,
  consumer_secret: TW_CONSUMER_SECRET,
  // access_token: TW_ACCESS_TOKEN,
  // access_token_secret: TW_ACCESS_TOKEN_SECRET,
  app_only_auth: true,
});

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

const app = express();

app.use(cors(corsOption));

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('This is an API to fetch GEO Tweets');
});

const getTweets = (req, res) => {
  const { lat = '45.51', lng = '-122.67', query = 'hello' } = req.query;
  return T.get('search/tweets', {
    geocode: `${lat},${lng},100km`,
    q: query,
    count: 100,
  })
    .then((result) => res.send(result.data));
};

const createToken = (auth) => jwt.sign({
  id: auth.id,
}, MY_SECRET,
{
  expiresIn: 60 * 120,
});

const generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

router.route('/auth/twitter/reverse')
  .post((req, res) => {
    request.post({
      url: `${TW_HOSTNAME}/oauth/request_token`,
      oauth: {
        oauth_callback: `http%3A%2F%2F${HOST_DOMAIN}%3A${HOST_PORT}%2Ftwitter-callback`,
        consumer_key: TW_CONSUMER_KEY,
        consumer_secret: TW_CONSUMER_SECRET,
      },
    }, (err, r, body) => {
      if (err) {
        return res.send(500, { message: err.message });
      }

      const jsonStr = `{ "${body.replace(/&/g, '", "').replace(/=/g, '": "')}"}`;
      return res.send(JSON.parse(jsonStr));
    });
  });

router.route('/auth/twitter')
  .post((req, res, next) => {
    request.post({
      url: `${TW_HOSTNAME}/oauth/access_token?oauth_verifier`,
      oauth: {
        consumer_key: TW_CONSUMER_KEY,
        consumer_secret: TW_CONSUMER_SECRET,
        token: req.query.oauth_token,
      },
      form: { oauth_verifier: req.query.oauth_verifier },
    }, (err, r, body) => {
      if (err) {
        res.send(500, { message: err.message });
      }

      const bodyString = `{ "${body.replace(/&/g, '", "').replace(/=/g, '": "')}"}`;
      const parsedBody = JSON.parse(bodyString);

      req.body.oauth_token = parsedBody.oauth_token;
      req.body.oauth_token_secret = parsedBody.oauth_token_secret;
      req.body.user_id = parsedBody.user_id;

      next();
    });
  }, passport.authenticate('twitter-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
      id: req.user.id,
    };

    return next();
  }, generateToken, sendToken);

// token handling middleware
const authenticate = expressJwt({
  secret: MY_SECRET,
  requestProperty: 'auth',
  getToken(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  },
});

const getCurrentUser = (req, res, next) => {
  User.findById(req.auth.id, (err, user) => {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

const getOne = (req, res) => {
  const user = req.user.toObject();

  delete user.twitterProvider;
  delete user.__v;

  return res.json(user);
};

router.route('/auth/me')
  .get(authenticate, getCurrentUser, getOne);

router.get('/auth/tweets', authenticate, getTweets);

app.use('/api/v1', router);

app.listen(HOST_PORT, () => console.log(`Listening on port ${HOST_PORT}!`));

module.exports = app;
