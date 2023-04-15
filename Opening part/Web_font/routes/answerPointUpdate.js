var express = require('express');
const {request} = require("../public/javascripts/request");
const {upload} = require("../public/javascripts/upload");
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage

/* GET home page. */
router.get('/', function(req, res, next) {
    let point = parseInt(req.query.point)
    let id = parseInt(req.query.id)
    console.log(point, id)
    answerPointUpdate(id, point)
});
async function answerPointUpdate(id, point){
    await upload('/exam/answer/updateAnswerPoint?id=' + id,{point})
}


module.exports = router;