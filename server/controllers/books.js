

var express = require('express');
var router = express.Router();

var qry = require('../models/queries');
var User = require('../models/User');
var db = require('../models/db');

router.get('/',function(req,res){
    console.log("kaikki kirjat");
    qry.findAllBooks(function(err, books){
      if(err) {
        throw err;
      }
      res.render('booklist', {books:books});
    });
});

/*router.get('/:title', function(req,res){
	console.log('books: Get book by title');
	qry.findBookByTitle(req,res);
});
*/

router.get('/add', function(req, res){
  res.render('add');
});

router.post('/add',function(req,res){
  //console.log(req.body);
  var book = req.body;
  book.postedBy = req.user;
  console.log(book);
	qry.saveBookData(book, function(err, book){
    if(err) {
      throw err;
    }
    //res.render('booklist');
    res.redirect('/profile');
  });
});


router.get('/:id', function(req,res){
	console.log('Get book by id');
	//qry.findBookById(req,res);
  qry.findBookById(req.params.id,function(err, book){
    if(err) {
      throw err;
    }
    res.render('bookdetails', {book:book});
  });
});

module.exports = router;
