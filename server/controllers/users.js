// var express = require('express');
// var router = express.Router();
// //var passport = require('../../index').passport;
// //var passport = require('../../index').passport;
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
//
// var qry = require('../models/queries');
// var User = require('../models/User');
//
// // Käytetäänkin passport-local-mongoosea?
// router.get('/', function(req, res){
//   qry.getUsers(req,res);
// });
//
// router.post('/register', function(req, res){
//   qry.createUser(req, res);
//
// });
//
// router.post('/login', passport.authenticate('local-login', {
// 	successRedirect: '/',
// 	failureRedicect: '/login',
// 	failureFlash: true
//
// }));
//
// passport.use('local-login', new LocalStrategy({
//   usernameField : 'username',
//   passwordField : 'password',
//   passReqToCallback : true
// },
// function(req, username, password, done) {
//   if (username)
//   username = username.toLowerCase();
//
//   // asynchronous
//   process.nextTick(function() {
//     User.findOne({ 'username' :  username }, function(err, user) {
//       // if there are any errors, return the error
//       if (err)
//       return done(err);
//
//       // if no user is found, return the message
//       if (!user)
//       return done(null, false, req.flash('loginMessage', 'No user found.'));
//
//       if (!user.validPassword(password))
//       return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
//
//       // all is well, return user
//       else
//       return done(null, user);
//     });
//   });
//
// }));
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
//
// module.exports = router;
