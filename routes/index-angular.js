var express = require('express');
var jade = require('jade');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	var model = JSON.parse(fs.readFileSync("dummyModel.json").toString());
    var jadeTemplate = createJadeTemplate([model], "");

    var htmlTemplateFn  = jade.compile(jadeTemplate);
    var htmlTemplate = htmlTemplateFn(options);
	var options = { title: 'Express', deControls:htmlTemplate};
    res.render('index-angular', options);

});


/**
 * Converts camelCase to snake-case
 */
function getSnakeCaseName(name, separator) {
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    separator = separator || '-';
    return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
    });
}
/**
 * Modifies attribute's value in order to use in concateing of the markup strings
 */
function escapeAttributeValue(value){
    var result = typeof value==="object" ? JSON.stringify(value) : (''+value);

    return result.replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
        .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

}


/**
 * Returns [key=value] items joined with space
 */
function getPropertiesAsAttributes( object ){
    var parts = [];
    for(var key in object){
        parts.push(getSnakeCaseName(key)+ "='" +object[key]+"'");
    }
    return parts.join(' ');
}

/**
 * Builds view's markup from the model
 */
function createJadeTemplate(controls, intend){
    var template = '';
    controls.forEach(function(control){
        var tagName = getSnakeCaseName(control.type);
        template += intend;
        template += convertTagToJadeFormat(tagName, getPropertiesAsAttributes(control.prop));
        template += '\n';
        if(control.items){
            template += createJadeTemplate(control.items, intend + "\t");
        }
    });
    return template;
}

function convertTagToJadeFormat(tagName, properties){
    //sis-ng-row(columns='12' class-prefix='col-xs')
    var result = tagName + '(';
    result += properties;
    result += ')';
    return  result;
}


module.exports = router;
