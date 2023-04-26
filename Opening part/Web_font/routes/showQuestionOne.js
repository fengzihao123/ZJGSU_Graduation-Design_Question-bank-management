var express = require('express');
var router = express.Router();
const {request} = require('../public/javascripts/request')
var LocalStorage = require('node-localstorage').LocalStorage
const {storage} = require("debug");
/* GET home page. */
router.get('/', function(req, res, next) {
    let index = parseInt(req.query.index)
    localStorage = new LocalStorage('./scratch');
    let curName = localStorage.getItem('curName')
    getQuestionList(curName, index, res)
});



async function getQuestionList(curName, index, res){
    //todo  查询所有的该科目题目
    let resultList = await request('/question/question/getQuestion',{curName})
    console.log(resultList.data[index])
    res.render('showQuestion',{
        questionList:resultList.data,
        curName:curName,
        index:index,
        length:resultList.data.length
    })
}
module.exports = router;
