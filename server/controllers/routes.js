var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var qry = require('../models/queries');
var User = require('../models/User');
var db = require('../models/db');

// Käytetäänkin passport-local-mongoosea? ei
router.get('/', function(req, res){
  //return users = qry.getUsers(res);
	res.render('index');
});

router.get('/profile', isLoggedIn, function(req, res){
	res.render('profile', {user:req.user});
})

router.get('/register', function(req, res){
	res.render('signup')
});

router.post('/register', function(req, res){
  //qry.createUser(req, res);
	var user = new User();
    user.username = req.body.username;
    user.password = user.generateHash(req.body.password);
    user.email = req.body.email;
	user.save(function(err){
		if(err){
			res.send("Ei");
		}else{
			//
			res.send("Joo");
		}
	});

});

// router.post('/register', passport.authenticate('local-signup', {
// 		successRedirect: '/',
// 		failureRedirect: '/register',
// 		failureFlash: true
// }));

router.get('/login', function(req, res){
	res.render('login');
})

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedicect: '/',
	failureFlash: true

}));

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

// router.get('/mybooks', function(req,res){
// 	console.log('Get book by id');
// 	//qry.findBookById(req,res);
//   qry.findBooksByUserId(req.user._id,function(err, book){
//     if(err) {
//       throw err;
//     }
//     res.render('mybooks', {book:book});
//   });
// });

// router.get('/mybooks', function(req, res){
//
// 	User.find({}).exec(function (err, users) {
//
// 	        users.forEach(function (u) {
//
// 	            db.Book.find({postedBy: u._id})
//
// 	                .populate('postedBy')
//
// 	                .exec(function (err, books) {
//
// 	                console.log(books);
//                   //res.send(books);
// 									//res.render('mybooks', {books:books});
//
// 	            });
//
// 	        });
//
// 	    });
//
// });


function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

passport.use('local-login', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, username, password, done) {
  //if (username)
  //username = username.toLowerCase();

  // asynchronous
  process.nextTick(function() {
    User.findOne({ 'username' :  username }, function(err, user) {
      // if there are any errors, return the error
      if (err)
      return done(err);

      // if no user is found, return the message
      if (!user)
      return done(null, false, req.flash('loginMessage', 'No user found.'));

      if (!user.validPassword(password))
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      // all is well, return user
      else
      return done(null, user);
    });
  });

}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
