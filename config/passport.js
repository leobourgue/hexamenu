var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
  // passport session setup
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      process.nextTick(function() {
        User.findOne({
          'user.username': username
        }, function(err, user) {
          if (err)
            return done(err);

          if (user) {
            return done(null, false, req.flash('signupMessage', 'Ce pseudo existe déjà.'));
          } else {
            User.findOne({
              'user.email': req.body.email
            }, function(err, email) {
              // return any error
              if (err)
                return done(err);

              if (email) {
                return done(null, false, req.flash('signupMessage', 'Cette email existe déjà.'));
              } else {
                var newUser = new User();

                newUser.user.username = username;
                newUser.user.email = req.body.email;
                newUser.user.password = newUser.generateHash(password);

                newUser.infos.hexa_pos = "[]";
                newUser.infos.hexa_colors = "[]";
                newUser.infos.hexa_links = "[]";
                newUser.infos.hexa_images = "[]";
                newUser.infos.hexa_img_sizes = "[]";
                newUser.infos.hexa_size = 1;
                newUser.infos.shadow_color = "#670000";
                newUser.infos.shadow_size = 300;
                newUser.infos.bg_color = "#e10000";
                newUser.infos.lang = "fr";

                newUser.save(function(err) {
                  if (err)
                    throw err;
                  return done(null, newUser);
                });
              }
            });
          }
        });
      });
    }));


  // LOCAL LOGIN
  passport.use('local-login', new LocalStrategy({
      pseudoField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      User.findOne({
        'user.username': username
      }, function(err, user) {
        if (err)
          return done(err);

        if (!user)
          return done(null, false, req.flash('loginMessage', 'Le pseudo n\'existe pas.'));

        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Mauvais mot de passe.'));

        return done(null, user);
      });

    }));
};