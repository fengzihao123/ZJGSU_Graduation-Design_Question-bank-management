var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('AddExam');
});

router.post('/examQuery', function(req, res, next) {
    res.render('examQuery');
});


module.exports = router;