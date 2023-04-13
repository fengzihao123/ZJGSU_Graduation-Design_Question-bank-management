var express = require('express');
const {post} = require("axios");
const {request} = require("../public/javascripts/request");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('AddExam');
});

router.post('/', function(req, res, next) {
    let postData = req.body;
    getQuestionCollect(res, postData)
});
async function getQuestionCollect(res, postData){
    let result = await request('/question/collect/getCollection',{stuId:'1911060118'})
    console.log(result.data)
    res.render('studentManage', {
        collectList:result.data,
        index:postData.index-1
    })
}


module.exports = router;