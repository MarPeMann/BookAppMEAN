//var passport = require('passport');
var User = require('../models/User');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {


passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, username, password, done) {
  process.nextTick(function(){

  User.findOne({'local.username':username}, function(err, user){
    console.log("local signupissa ollaan erroriko?");
    if(err) {
// on errori?
      return done(err);
    }
    if(user) {
      return done(null, false, {message: 'Email already in use'});
    } else {
      var newUser = new User();
      newUser.username = username;
      newUser.password =  newUser.generateHash(password);
      newUser.save(function(err, result) {
        if(err){
          return done(err);
        }
        return done(null, newUser);
      });
    }


  });
});//nextick
}));

}
