var express = require('express');
const {upload} = require("../public/javascripts/upload");
const {request} = require("../public/javascripts/request");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('AddExam');
});

router.post('/', function(req, res, next) {
    let postData = req.body

    let curName    = postData.curName || ''
    let stem       = postData.stem || ''
    let choiceA    = postData.choiceA || ''
    let choiceB    = postData.choiceB || ''
    let choiceC    = postData.choiceC || ''
    let choiceD    = postData.choiceD || ''
    let chaName    = postData.chaName || ''
    let queType    = postData.queType || ''
    let difficulty = postData.difficulty || ''
    let answer     = postData.answer || ''
    let analysis     = postData.analysis || ''
    newQuestion(curName, stem, choiceA, choiceB, choiceC, choiceD, chaName, queType, difficulty, answer, analysis)
    getQuestionList(res, req)
});

async function newQuestion(curName, stem, choiceA, choiceB, choiceC, choiceD, chaName, queType, difficulty, answer, analysis){
    await upload('/question/insert/question',{curName, stem, choiceA, choiceB, choiceC, choiceD, chaName, queType, difficulty, answer, analysis})
}

async function getQuestionList(res, req){
    let result = await request('/question/question/getQuestion')

    var pageNum = req.query.page;


    var pager = {};
    // todo 当前第几页
    pager.pageCurrent = pageNum || 1;
    // todo 总的记录数
    pager.maxNum = result.data.length;
    pager.pageSize = 6;
    // todo 一共多少页
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    var dataList = result.data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize )
    res.render('questionQuery', {
        questionList:dataList,
        pager:pager,
        curName:'',
        queType:'',
        chaName:'',
        difficulty:'',
        stem:''
    });
}

module.exports = router;