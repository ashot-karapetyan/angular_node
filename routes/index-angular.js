var express = require('express');
var jade = require('jade');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var fn = jade.compileFile(fs.realpathSync('views/index-angular.jade'));
	var html = fn({});
    res.render('index-angular', { title: 'Express' });


});

module.exports = router;
