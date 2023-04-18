var express = require('express');
var router = express.Router();
var multiparty = require('multiparty')
var LocalStorage = require('node-localstorage').LocalStorage
/* GET home page. */
router.post('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    var form = new multiparty.Form()
    form.uploadDir = './public/upload'
    form.parse(req,function (err, fields, files){
        var filePath = files.file[0].path
        console.log(filePath)
        localStorage.setItem('filePath',filePath)
    })
});

module.exports = router;
