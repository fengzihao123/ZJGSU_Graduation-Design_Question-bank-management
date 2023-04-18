
var express = require('express');
const {LocalStorage} = require("node-localstorage");
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
const {isProxy} = require("vue");
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    let examId = parseInt(localStorage.getItem('examId'))
    deleteRepeat(examId)
});

async function deleteRepeat(examId){
    await upload(`/exam/student/deleteRepeat?examId=${examId}`)
}



module.exports = router;