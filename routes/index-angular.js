var express = require('express');
var jade = require('jade');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	var model = JSON.parse(fs.readFileSync("dummyModel.json").toString());
	var jadeTemplate = createJadeTemplate(model);
	var options = { title: 'Express', deControls:jadeTemplate};
	var fn = jade.compileFile(fs.realpathSync('views/index-angular.jade'));
	var html = fn(options);
    res.render('index-angular', options);


});

/**
 * Converts camelCase to snake-case
 */
getSnakeCaseName = function(name, separator) {
	var SNAKE_CASE_REGEXP = /[A-Z]/g;
	separator = separator || '-';
	return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
		return (pos ? separator : '') + letter.toLowerCase();
	});
};

/**
 * Returns [key=value] items joined with space
 */
getPropertiesAsAttributes  = function( object ){
	var parts = [];
	for(var key in object){
		parts.push(getSnakeCaseName(key)+'="'+escapeAttributeValue(object[key])+'"');
	}
	return parts.join(' ');
};

/**
 * Builds view's markup from the model
 */
createJadeTemplate = function(model){
	var controls = [model];
	var template = '';

	while(controls.length >0){
		var item = controls.pop();
		var tagName = getSnakeCaseName(item.type);
		template += convertTagToJadeFormat(tagName, getPropertiesAsAttributes(item.prop));
		if(item.items){
			controls.concat(item.items);
		}
	}
	return template;
};

convertTagToJadeFormat = function(tagName, properties){
	//sis-ng-row(columns='12' class-prefix='col-xs')
	var result = tagName + '(';
	for(var property in properties){
		result += property;
		result += ' ';
	}
	return  result+=')';
};

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

};


module.exports = router;
