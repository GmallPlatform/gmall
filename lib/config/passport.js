'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
      done(err, user);
    });
  });

  // add other strategies for more authentication flexibility
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) return done(err);

          if (!user) {
              return done(null, false,{errors:{emailLogin:{
                  message: 'такой  e-mail не зарегистрирован'
              }}});
          }
          if (!user.authenticate(password)) {
              return done(null, false, {errors:{passwordLogin:{
                  message: 'неверный e-mail или пароль'
              }}});
          }
        //console.log(user);
        return done(null, user);
      });
    }
  ));
};