var express = require('express');
const {request} = require("../public/javascripts/request");
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage

/* GET home page. */
router.get('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let examId = parseInt(localStorage.getItem('examId'))
    let classId = parseInt(localStorage.getItem('classId'))
    res.render('makeQuestionAuto',{
        examId:examId,
        classId:classId,
        repeatPercent:'',
        danxuan:'',
        duoxuan:'',
        tiankong:'',
        jisuan:'',
        wenda:'',
        biancheng:''
    })
});


module.exports = router;