var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/breadarook', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

/*var userSchema = new mongoose.Schema({
	username: 'string',
	password: 'string',
	email:'string'});*/



/*var bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	isbn: String,
	description: String,
	comments:[{Type:Schema.Types.ObjectId,ref:'Comments'}]

});*/
/*var User = mongoose.model('User',{
	username: String,
	password: String,
	email:String
});*/

var Books = mongoose.model('Book',{
	title: String,
	author: String,
	isbn: String,
	description: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    message: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
	//comments: [{type:mongoose.Schema.Types.ObjectId,ref:'Comments'}]
});

// var Comments = mongoose.model('Comments',{
// 	//title: String,
// 	user: String,
// 	body: String,
// 	bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
// });



//var User = mongoose.model('User', userSchema);

//var Books = mongoose.model('Books', bookSchema);

//var Comments = mongoose.model('Comments', commentSchema);

//exports.User = User;

//module.exports = mongoose.model('User', userSchema);

exports.Book = Books;

//exports.Comments = Comments;
