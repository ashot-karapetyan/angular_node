var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index-angular');
var users = require('./routes/users');
var http = require("http");
var fs = require("fs");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


var server = app.listen(8080, function() {
	console.log('Listening on port %d', server.address().port);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});





//var port = 8080;
//var server = http.createServer(function(req, res){
//
//	res.writeHead(200, { 'content-type': 'text/html' });
//	var model = JSON.parse(fs.readFileSync("dummyModel.json").toString());
//	res.end(createView(model));
//});
//server.listen(port);



/**
 * Modifies attribute's value in order to use in concateing of the markup strings
 */
escapeAttributeValue = function(value){
	var result = typeof value==="object" ? JSON.stringify(value) : (''+value);

	return result.replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
		.replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

},

/**
 * Converts camelCase to snake-case
 */
getSnakeCaseName = function(name, separator) {
	var SNAKE_CASE_REGEXP = /[A-Z]/g;
	separator = separator || '-';
	return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
		return (pos ? separator : '') + letter.toLowerCase();
	});
},

/**
 * Returns [key=value] items joined with space
 */
getPropertiesAsAttributes  = function( object ){
	var parts = [];
	for(var key in object){
		parts.push(getSnakeCaseName(key)+'="'+escapeAttributeValue(object[key])+'"');
	}
	return parts.join(' ');
},
/**
 * Builds view's markup from the model
 */
createView = function(model){
	var tpl = '';
	var self = this;
	var tagName = getSnakeCaseName(model.type);
	tpl += '<'+tagName+' '+getPropertiesAsAttributes(model.prop)+' >';
	if(model.items){
		tpl += model.items.map(function(item){
			return self.createView(item);
		}).join('');
	}
	tpl += '</'+tagName+'>';
	return tpl;
};

module.exports = app;
