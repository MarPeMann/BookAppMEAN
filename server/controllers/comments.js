var express = require('express');
var router = express.Router();

var qry = require('../models/queries');


router.post('/', function(req, res) {

	qry.addComment(req,res);

});

router.get('/:id', function(req, res){

	qry.getComments(req, res);
});

module.exports = router;