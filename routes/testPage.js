var express = require('express');
var jade = require('jade');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {

    var options = {
        root: path.join(path.resolve("./"),'/public/html')
    };
    res.sendFile('/testPage.html', options);

});



module.exports = router;
