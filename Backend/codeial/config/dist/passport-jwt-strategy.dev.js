"use strict";

var passport = require('passport');

var JWTStrategy = require('passport-jwt').Strategy;

var ExtractJWT = require('passport-jwt').ExtractJwt;

var User = require('../models/users');

var opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'codeial'
};
passport.use(new JWTStrategy(opts, function (jwtPayload, done) {
  User.findById(jwtPayload._id, function (err, user) {
    if (err) {
      console.log('Error in finding user in JWT', err);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));