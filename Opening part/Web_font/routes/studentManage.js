var express = require('express');
const {request} = require("../public/javascripts/request");
const {LocalStorage} = require("node-localstorage");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    getQuestionCollect(res)
});

async function getQuestionCollect(res){
    let result = await request('/question/collect/getCollection',{stuId:'1911060118'})
    console.log(result.data)
    res.render('studentManage', {
        collectList:result.data,
        index:0
    })
}

module.exports = router;