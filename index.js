var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var db = require('./server/models/db');
var queries = require('./server/models/queries');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var app = express();
//var routes = require('./server/controllers/routes');
//require('./server/controllers/passport')(passport);

var routes = require('./server/controllers/routes');
//var users = require('./server/controllers/users');
var books = require('./server/controllers/books');
var comment = require('./server/controllers/comments');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(session({secret:'123testi', resave:false, saveUninitialized:false}));


// app.use(function(req,res,next){
//
//     console.log(req.method);
//     console.log(req.path);
//     console.log(__dirname);
//     next();
// });

//app.set('views',__dirname + '/app/views');




//app.use('/', express.static(path.join(__dirname, 'app/views')));
app.use('/app/css', express.static(path.join(__dirname, 'app/css')));
app.use('/app/bootstrap', express.static(path.join(__dirname, 'app/bootstrap')));
//app.use('/app/controllers', express.static(path.join(__dirname, 'app/controllers')));
//app.use('/app/lib', express.static(path.join(__dirname, 'app/lib')));
//app.use('/app/module', express.static(path.join(__dirname, 'app/module')));
//app.use('/app/factories', express.static(path.join(__dirname, 'app/factories')));
app.set('view engine', 'ejs');


app.use(session({secret:'123testi', resave:true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
//app.use('/users', users);
app.use('/books', books);
app.use('/comments',comment);

app.get('/books/:id', function(req,res){});



/*app.get('/', function(req,res){

});*/


var server = app.listen(3000);

//module.exports = app;
