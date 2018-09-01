const passport = require("passport");
const User = require("../models/User");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//set-up options for JWT 
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.secretOrKey || '12345';

passport.use(
  new JWTStrategy(options, (payload, done) => {
    User.findById(payload.user.id, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser(function(user, cb) {
  return cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, ["-password"], cb);
});

module.exports = passport;
