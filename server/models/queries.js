var db = require('./db');
var User = require('./User');
var jwt = require('jsonwebtoken');
var conf = require('../conf');
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');

module.exports.getUsers = function(req,res){
	User.find(function(err, data){
		if(err){
			res.send(err.message);
		}else{
			res.send(data);
		}
	});
}

module.exports.createUser = function(req, res){
	var user = new User();
    user.username = req.body.username;
    user.password = user.generateHash(req.body.password);
    user.email = req.body.email;
	user.save(function(err){
		if(err){
			res.send("Ei");
		}else{
			res.send("Joo");
		}
	});
}

module.exports.findAllBooks = function(callback, limit){
	db.Book.find(callback).limit(limit);
}


module.exports.findBookById = function(id,cb){
	console.log("queries:findBookById");
	db.Book.findById(id, cb);
}

module.exports.findBookByTitle = function(req,res){
	console.log("queries: findBookByTitle");
	console.log(req.params);
	db.Book.findOne({ title : req.params.title}, function(err, data){
    	if(err){
			res.send(err.message);
		}else{
			console.log(data,"Info from queries");
			res.json(data);
		}
  });
}

module.exports.saveBookData = function(book, cb){
	db.Book.create(book, cb);
}

module.exports.addComment = function(req, res){

	console.log("Book data for comments", req.body);

	var cmt = new db.Comments({
		user: 'testi',
		body: req.body.body,
		bookId: req.body._id
	});

	cmt.save(function(err){
		if(err){
			res.send(err);
			return
		}
		res.json({message:'comment added'});
	});
}

module.exports.getComments = function(req, res){
	console.log("queries: getComments", req.body);

	db.Book.comments.find({ bookId : ObjectId(req.body.id)},function(err, data){
		if(err){
			res.send(err.message);
		}else{
			res.send(data);
		}
	});
}
