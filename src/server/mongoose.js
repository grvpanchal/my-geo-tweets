/* eslint-disable new-cap */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = function () {
  const db = mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

  const UserSchema = new Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    twitterProvider: {
      type: {
        id: String,
        token: String,
      },
      select: false,
    },
  });

  UserSchema.set('toJSON', { getters: true, virtuals: true });

  UserSchema.statics.upsertTwitterUser = function (token, tokenSecret, profile, cb) {
    const that = this;
    return this.findOne({
      'twitterProvider.id': profile.id,
    }, (err, user) => {
      // no user was found, lets create a new one
      if (!user) {
        const newUser = new that({
          email: profile.emails[0].value,
          twitterProvider: {
            id: profile.id,
            token,
            tokenSecret,
          },
        });

        newUser.save((error, savedUser) => {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
  };

  mongoose.model('User', UserSchema);

  return db;
};
